"use client";

import { useEffect, useRef, useState } from "react";

// Ambient sound with a mute toggle in the nav.
//
// If /ambient.mp3 exists in public/, it is looped with a fade. Otherwise a warm
// pad is synthesized: detuned sawtooths through a dark lowpass (a string pad,
// not a sine), an A chord in the low-mid register, each note breathing on its
// own slow LFO, and the third drifting between C# and B so the chord moves
// between A major and Asus2 without ever resolving. Large reverb.
//
// Plays on load where the browser allows it. Where autoplay is blocked, the
// first click, tap or keypress anywhere on the page starts it.

const FILE = "/ambient.mp3";

// Binaural beat: a carrier in each ear, offset by BINAURAL_HZ, so the brain
// hears a beat at that rate. 6 Hz sits in theta (the meditation band); 10 Hz
// would be alpha (relaxed but alert). Headphones only — on speakers it
// degrades to a faint flutter. Set the level to 0 to remove it.
const BINAURAL_HZ = 6;
const BINAURAL_LEVEL = 0.05;
const LEVEL = 0.2;
const FADE_IN = 0.35;

// The pad's whole-mix swell: six cycles a minute, the resonance-breathing
// rate. One bar of the sand's metre is one breath.
const BREATH_HZ = 0.1;

// The sand keeps time in 4, and only the downbeat is played: 1 - 2 - 3 - 4,
// with the pull landing on every 1. One bar = one breath = 10 s, so a beat is
// 2.5 s and the downbeat arrives once per swell, at the top of it.
const BEATS_PER_BAR = 4;
// Two bars to a breath: a bar is 5 s, a beat 1.25 s (48 BPM). Slow, but a
// tempo you can feel — at one bar per breath the beat was too rare to read
// as a pulse at all.
const BARS_PER_BREATH = 2;
const BAR_SECONDS = 1 / BREATH_HZ / BARS_PER_BREATH;
const BEAT_ATTACK = 0.07; // seconds into each strike
const BEAT_DECAY = 0.26; // seconds to fall away — short, so the second strike shows
const DUB_DELAY = 0.34; // the second, softer strike
const DUB_LEVEL = 0.62;

/** One strike: a fast rise and an exponential fall. */
function strike(x: number) {
  if (x < 0) return 0;
  if (x < BEAT_ATTACK) return x / BEAT_ATTACK;
  return Math.exp(-(x - BEAT_ATTACK) / BEAT_DECAY);
}

/**
 * 0..1 — the downbeat, as a heartbeat: a strong strike on every 1 of the bar
 * and a softer one just after it. Phased to the peak of the pad's swell.
 */
function downbeat(t: number) {
  // the swell peaks a quarter of a bar in; put the beat there
  const x = (t - BAR_SECONDS / BEATS_PER_BAR + BAR_SECONDS) % BAR_SECONDS;
  return Math.min(1, Math.max(strike(x), DUB_LEVEL * strike(x - DUB_DELAY)));
}
const FADE_OUT = 0.3;

// Sound belongs to the hero. Once it leaves the viewport the pad fades out
// over ZONE_OUT seconds; scrolling back brings it in over ZONE_IN.
const ZONE_SELECTOR = ".hero-sand, .hero";
const ZONE_OUT = 5;
const ZONE_IN = 3;

// Concert pitch. 432 Hz is the customary "meditation" tuning; there is no
// evidence it does anything, but it costs nothing. 440 is standard.
const A4 = 432;
const A2 = A4 / 4;

// AudioContext lifecycle calls return promises that reject in perfectly
// ordinary situations — closing a context while a resume() is still in
// flight, resuming one the browser has decided not to start. They are
// awaited nowhere, so an unhandled rejection would surface as a runtime
// error; this is the one place that discards them.
function settle(p: Promise<void> | undefined) {
  void p?.catch(() => undefined);
}

type Graph = { ctx: AudioContext; master: GainNode; zone: GainNode };

// Every context this module has ever built. Closing by reference on unmount
// is right in the normal case; this is the backstop for any path that loses
// the reference — a rebuild mid-gesture, a hot reload, a navigation that
// races the file check — so leaving the page always silences everything.
const liveContexts = new Set<AudioContext>();

function closeEverything() {
  for (const ctx of liveContexts) {
    ctx.onstatechange = null;
    if (ctx.state !== "closed") settle(ctx.close());
  }
  liveContexts.clear();
}

function makeReverb(ctx: AudioContext, seconds: number) {
  const ir = ctx.createBuffer(2, ctx.sampleRate * seconds, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3.2);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  return conv;
}

function lfo(ctx: AudioContext, rate: number, depth: number, target: AudioParam, phase = 0) {
  const osc = ctx.createOscillator();
  osc.frequency.value = rate;
  const g = ctx.createGain();
  g.gain.value = depth;
  osc.connect(g).connect(target);
  osc.start(ctx.currentTime + phase);
}

function buildSynth(ctx: AudioContext, out: AudioNode) {
  const reverb = makeReverb(ctx, 2.5);
  const wet = ctx.createGain();
  wet.gain.value = 0.25;
  const dry = ctx.createGain();
  dry.gain.value = 0.75;

  // one dark filter for the whole pad, cutoff drifting slowly
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 480;
  filter.Q.value = 0.4;
  lfo(ctx, 0.017, 140, filter.frequency);

  // whole-pad swell at 0.1 Hz — six cycles a minute, the resonance-breathing
  // rate. The one oscillation a listener will entrain to.
  const breath = ctx.createGain();
  breath.gain.value = 0.72;
  lfo(ctx, BREATH_HZ, 0.26, breath.gain);

  filter.connect(dry).connect(breath);
  filter.connect(reverb).connect(wet).connect(breath);
  breath.connect(out);

  if (BINAURAL_LEVEL > 0) {
    // carrier on A3, bypassing the filter, swelling with the rest
    const carrier = A2 * 2;
    [[carrier, -1], [carrier + BINAURAL_HZ, 1]].forEach(([freq, side]) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = BINAURAL_LEVEL;
      const p = ctx.createStereoPanner();
      p.pan.value = side;
      osc.connect(g).connect(p).connect(breath);
      osc.start();
    });
  }

  // [ratio off A2, level, breath rate, pan]
  const notes: [number, number, number, number][] = [
    [1, 0.5, 0.023, 0],        // A2
    [3 / 2, 0.32, 0.031, -0.3], // E3
    [2, 0.3, 0.027, 0.3],      // A3
    [3, 0.16, 0.041, -0.15],   // E4
  ];

  const addNote = (freq: number, level: number, breath: number, pan: number) => {
    const g = ctx.createGain();
    g.gain.value = level;
    lfo(ctx, breath, level * 0.5, g.gain, Math.random() * 20);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    // two sawtooths a few cents apart, plus a triangle for body
    for (const [type, cents, amp] of [
      ["sawtooth", -5, 0.18],
      ["sawtooth", 5, 0.18],
      ["triangle", 0, 0.5],
    ] as [OscillatorType, number, number][]) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = cents;
      const og = ctx.createGain();
      og.gain.value = amp;
      osc.connect(og).connect(g);
      osc.start();
    }
    g.connect(p).connect(filter);
    return g;
  };

  notes.forEach(([r, level, breath, pan]) => addNote(A2 * r, level, breath, pan));

  // the moving voice: C#4 (major third) and B3 (second) crossfade on one very
  // slow LFO, so the chord breathes between A major and Asus2
  const third = addNote(A2 * (5 / 2), 0.0001, 0.05, 0.2);   // C#4
  const second = addNote(A2 * (9 / 4), 0.0001, 0.05, -0.2); // B3
  const drift = ctx.createOscillator();
  drift.frequency.value = 0.011; // ~90 s per cycle
  const up = ctx.createGain();
  up.gain.value = 0.11;
  const down = ctx.createGain();
  down.gain.value = -0.11;
  third.gain.value = 0.11;
  second.gain.value = 0.11;
  drift.connect(up).connect(third.gain);
  drift.connect(down).connect(second.gain);
  drift.start();
}

// Built synchronously so it can be created inside a click handler — Safari and
// Firefox only honour an AudioContext created or resumed during a gesture.
function buildGraph(useFile: boolean): Graph {
  const ctx = new AudioContext();
  liveContexts.add(ctx);
  ctx.addEventListener("statechange", () => {
    if (ctx.state === "closed") liveContexts.delete(ctx);
  });
  const master = ctx.createGain(); // mute button
  master.gain.value = 0;
  const zone = ctx.createGain(); // hero in view
  zone.gain.value = 1;
  zone.connect(master).connect(ctx.destination);

  if (useFile) {
    const audio = new Audio(FILE);
    audio.loop = true;
    ctx.createMediaElementSource(audio).connect(zone);
    void audio.play().catch(() => undefined);
  } else {
    buildSynth(ctx, zone);
  }
  return { ctx, master, zone };
}

// Is there a recording in public/? Checked once, ahead of any gesture.
async function hasFile(): Promise<boolean> {
  try {
    const res = await fetch(FILE, { method: "HEAD" });
    return res.ok && (res.headers.get("content-type") ?? "").startsWith("audio");
  } catch {
    return false;
  }
}

function rampParam(ctx: AudioContext, param: AudioParam, to: number, seconds: number) {
  const now = ctx.currentTime;
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(to, now + seconds);
}

function ramp(g: Graph, to: number, seconds: number) {
  rampParam(g.ctx, g.master.gain, to, seconds);
}

export default function AmbientSound() {
  // `on` is intent. If the browser blocks autoplay, intent stays true and the
  // first gesture on the page starts the audio.
  const [on, setOn] = useState(true);
  // true once the context is actually running; until then the icon is dimmed
  const [live, setLive] = useState(false);
  const liveRef = useRef(false);
  const wantOn = useRef(true);
  const graph = useRef<Graph | null>(null);
  const suspendTimer = useRef<number | null>(null);

  const fileReady = useRef<boolean | null>(null);
  const inHero = useRef(true);
  const breathRaf = useRef(0);

  // Publish the sand's downbeat so its pull toward the critical line lands on
  // every 1 of the bar.
  //
  // This runs whether or not anything is audible. The beat is the hero's
  // heartbeat first and the pad's metre second — tying it to playback meant
  // that a visitor whose browser had not yet allowed audio saw no pulse at
  // all. When the pad is running we take its clock so the two are locked;
  // otherwise we keep time ourselves at the same rate.
  const publishBreath = (g: Graph | null) => {
    window.cancelAnimationFrame(breathRaf.current);
    const tick = () => {
      const live = g && g.ctx.state === "running" && wantOn.current;
      const t = live ? g.ctx.currentTime : performance.now() / 1000;
      window.__solomonBreath = downbeat(t);
      breathRaf.current = window.requestAnimationFrame(tick);
    };
    tick();
  };

  const applyZone = (g: Graph, immediate = false) => {
    const to = inHero.current ? 1 : 0;
    rampParam(g.ctx, g.zone.gain, to, immediate ? 0.01 : to ? ZONE_IN : ZONE_OUT);
  };

  const attach = (g: Graph) => {
    g.ctx.onstatechange = () => {
      const running = g.ctx.state === "running";
      liveRef.current = running;
      setLive(running);
      if (running && wantOn.current) ramp(g, LEVEL, FADE_IN);
      publishBreath(running ? g : null);
    };
    graph.current = g;
    applyZone(g, true);
  };

  // Create (or resume) the context. Called at mount, and again from inside
  // the first gesture if the browser blocked autoplay.
  //
  // `fromGesture` matters: Chrome will start a context that was built earlier
  // as long as resume() happens inside a gesture, but Firefox wants the
  // context *constructed* during one. So on a real gesture we throw away a
  // context that is still suspended and build a fresh one synchronously,
  // which satisfies both.
  const ensure = (fromGesture = false) => {
    if (!graph.current) {
      attach(buildGraph(fileReady.current === true));
    } else if (fromGesture && graph.current.ctx.state !== "running") {
      const stale = graph.current;
      stale.ctx.onstatechange = null;
      graph.current = null;
      if (stale.ctx.state !== "closed") settle(stale.ctx.close());
      attach(buildGraph(fileReady.current === true));
    }

    const g = graph.current;
    if (!g) return;
    if (g.ctx.state === "running") {
      liveRef.current = true;
      setLive(true);
      if (wantOn.current) {
        ramp(g, LEVEL, FADE_IN);
        publishBreath(g);
      }
    } else {
      settle(g.ctx.resume());
    }
  };

  useEffect(() => {
    let disposed = false;
    // Every gesture a browser will accept as consent, plus the ones that
    // merely signal presence. Firefox counts pointer, key and touch events;
    // scroll and wheel are harmless retries that cost nothing when blocked.
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointerup",
      "mouseup",
      "click",
      "keydown",
      "touchend",
      "wheel",
      "scroll",
    ];
    // Events a browser accepts as consent. Scroll and wheel are not among
    // them, so they only retry; they never rebuild.
    const gestures = new Set([
      "pointerdown",
      "pointerup",
      "mouseup",
      "click",
      "keydown",
      "touchend",
    ]);

    const wake = (e?: Event) => {
      if (!wantOn.current) return;
      // the icon runs its own handler; letting this one fire too would start
      // the audio on pointerdown and mute it again on click
      if ((e?.target as Element | null)?.closest?.(".nav-sound")) return;
      if (!graph.current || graph.current.ctx.state !== "running") {
        ensure(!!e && gestures.has(e.type));
      }
    };
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));

    // A tab you are not looking at makes no sound. Hiding suspends the
    // context outright — a background tab that keeps playing is the most
    // common way ambient audio becomes a nuisance, and it is also how an
    // orphaned tab ends up humming behind everything else. Coming back is
    // another chance to start.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        wake();
        return;
      }
      const g = graph.current;
      if (!g || g.ctx.state !== "running") return;
      ramp(g, 0, 0.25);
      window.setTimeout(() => {
        if (document.visibilityState === "hidden" && g.ctx.state === "running") {
          settle(g.ctx.suspend());
        }
      }, 300);
    };
    document.addEventListener("visibilitychange", onVisible);

    publishBreath(null); // the heartbeat runs from load, audible or not
    window.addEventListener("pagehide", closeEverything);

    hasFile().then((ok) => {
      if (disposed) return;
      fileReady.current = ok;
      ensure(); // plays now where autoplay is allowed; otherwise waits for wake
    });

    // Fade with the hero. Any hero element partly on screen counts.
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        const next = visible.size > 0;
        if (next === inHero.current) return;
        inHero.current = next;
        if (graph.current) applyZone(graph.current);
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(ZONE_SELECTOR).forEach((el) => observer.observe(el));

    return () => {
      disposed = true;
      window.cancelAnimationFrame(breathRaf.current);
      breathRaf.current = 0;
      window.__solomonBreath = null;
      observer.disconnect();
      events.forEach((e) => window.removeEventListener(e, wake));
      document.removeEventListener("visibilitychange", onVisible);
      if (suspendTimer.current) window.clearTimeout(suspendTimer.current);
      window.removeEventListener("pagehide", closeEverything);
      graph.current = null;
      closeEverything();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once; `ensure` reads refs only
  }, []);

  const toggle = () => {
    // Intent is on but the browser hasn't let it start: this click is the
    // gesture that starts it, not a mute.
    if (on && !liveRef.current) {
      ensure(true);
      return;
    }
    if (suspendTimer.current) {
      window.clearTimeout(suspendTimer.current);
      suspendTimer.current = null;
    }
    if (on) {
      wantOn.current = false;
      publishBreath(null);
      const g = graph.current;
      if (g) {
        ramp(g, 0, FADE_OUT);
        suspendTimer.current = window.setTimeout(() => {
          if (g.ctx.state === "running") settle(g.ctx.suspend());
        }, FADE_OUT * 1000 + 50);
      }
      setOn(false);
    } else {
      wantOn.current = true;
      ensure(true);
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      className={`nav-sound${on ? " is-on" : ""}${on && !live ? " is-pending" : ""}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      title={on ? (live ? "Mute" : "Sound is on — click to start it") : "Sound"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {on ? (
          <>
            <path className="nav-sound-wave" d="M15 9.2a4 4 0 0 1 0 5.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path className="nav-sound-wave nav-sound-wave--2" d="M17.6 6.8a7.5 7.5 0 0 1 0 10.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </>
        ) : (
          <path d="M15.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
