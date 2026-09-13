"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import AmbientSound from "./AmbientSound";
import SandHero from "./SandHero";
import BrainFigure from "./BrainFigure";
import SandBand from "./SandBand";
// import GeometryOfTruth from "./GeometryOfTruth"; // hidden — swapped for the convergence figure

const MI_TIP =
  "Mutual information — how much the first thing reveals about the second.";
const R_TIP = "Reality. The world as it actually is.";
const S_TIP = "Substrate now — everything verified so far.";
const M_TIP = "The model now.";
const MN_TIP = "The model next step.";
const F_TIP = "Update from the model alone — no new input from reality.";
const IMR_TIP = "How much the model knows about reality.";

// Keeps a symbol's note on screen: slides it back inside the viewport when the
// symbol sits near an edge, and drops it below the symbol when the fixed nav
// would cover it. The arrow stays on the symbol (see .eq-tip in globals.css).
function placeTip(term: HTMLElement) {
  const tip = term.querySelector<HTMLElement>(".eq-tip");
  if (!tip) return;
  const margin = 12;
  tip.style.setProperty("--tip-shift", "0px");
  tip.classList.remove("eq-tip--below");
  const r = tip.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  let shift = 0;
  if (r.left < margin) shift = margin - r.left;
  else if (r.right > vw - margin) shift = vw - margin - r.right;
  tip.style.setProperty("--tip-shift", `${shift}px`);
  const navBottom = document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0;
  if (r.top < Math.max(navBottom, 0) + margin) tip.classList.add("eq-tip--below");
}

function EqSym({ children, tip }: { children: ReactNode; tip: string }) {
  return (
    <span
      className="eq-term"
      tabIndex={0}
      aria-label={tip}
      onMouseEnter={(e) => placeTip(e.currentTarget)}
      onFocus={(e) => placeTip(e.currentTarget)}
    >
      {children}
      <span className="eq-tip" role="tooltip">
        {tip}
      </span>
    </span>
  );
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/icon.png`,
    description: site.description,
    founder: {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: site.author.name,
      jobTitle: site.author.role,
      email: `mailto:${site.author.email}`,
      sameAs: [site.links.linkedin, site.links.medium],
    },
    email: `mailto:${site.author.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Helsinki",
      addressCountry: "FI",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Ezer",
        description:
          "Ezer is the AI Solomon governs. It learns a business and becomes it: every claim it holds is anchored to evidence outside the system, and everything it is given compounds as it adapts.",
        brand: {
          "@type": "Organization",
          name: site.legalName,
        },
      },
    },
    sameAs: [site.links.linkedin, site.links.medium],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Intelligence ≠ Wisdom — The Solomon Architecture",
    url: site.url,
    mainEntityOfPage: site.url,
    datePublished: site.published,
    dateModified: site.updated,
    image: `${site.url}${site.ogImage}`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: site.author.name,
      sameAs: [site.links.linkedin, site.links.medium],
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.png`,
      },
    },
    description:
      "A five-part exposition of the Solomon architecture: the fundamental flaw of stateless generation, the sustainable foundation that removes AI from the driver's seat, the physics of the epistemic ceiling, the brain-nerves-body loop wired to reality, and the adaptive loop that compounds verified evidence over time.",
    about: [
      { "@type": "Thing", name: "Governed intelligence" },
      { "@type": "Thing", name: "Synthetic Collapse" },
      { "@type": "Thing", name: "Adaptive Loop" },
      { "@type": "Thing", name: "Geometry of Truth" },
      { "@type": "Thing", name: "Bayesian governance" },
      { "@type": "Thing", name: "Substrate compounding" },
    ],
    articleSection: [
      "I. Fundamental Flaw",
      "II. Sustainable Foundation",
      "III. Physics",
      "IV. Reality",
      "V. Adaptive Loop",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${site.url}/#glossary`,
    name: "Solomon glossary",
    description:
      "The terms the Solomon architecture is built from, each defined in one sentence.",
    hasDefinedTerm: [
      {
        "@type": "DefinedTerm",
        name: "Governed intelligence",
        description:
          "A system in which generation is bounded by verification: every claim entering the substrate is anchored to evidence that exists outside the system, and action occurs only within laws the brain enforces.",
      },
      {
        "@type": "DefinedTerm",
        name: "Wisdom",
        description:
          "Intelligence that knows what it knows — the structural ability to distinguish what was verified from what was generated.",
      },
      {
        "@type": "DefinedTerm",
        name: "Synthetic Collapse",
        description:
          "The failure mode of ungoverned generation: near-truth propagates as convenience, settles into common knowledge through reuse, hardens into authority through citation, and embeds as infrastructure.",
      },
      {
        "@type": "DefinedTerm",
        name: "Geometry of Truth",
        description:
          "Truth as a bounded domain. A sphere — a language model — grows inside it but cannot fill its corners; a cube — a system whose form matches the domain — fills it completely.",
      },
      {
        "@type": "DefinedTerm",
        name: "Brain, nerves, body",
        description:
          "Solomon's anatomy. The brain holds what has been verified; the nerves carry signal in from email, transcripts, calendar, files and signed third-party data; the body acts, only within laws the brain enforces.",
      },
      {
        "@type": "DefinedTerm",
        name: "Ezer",
        description:
          "The AI Solomon governs. It learns a business and holds on to what is true in it; generation belongs to Ezer, verification and the substrate belong to Solomon.",
      },
      {
        "@type": "DefinedTerm",
        name: "Adaptive Loop",
        description:
          "The cycle that writes every verified signal back into the substrate, so the system at T+1 is more grounded than the system at T, not merely more prompted.",
      },
      {
        "@type": "DefinedTerm",
        name: "Substrate compounding",
        description:
          "S(t+1) = S(t) · (1 + Σ G_i · ΔBayes_i): the substrate is the sum of everything that has ever passed governance, and it only grows.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between intelligence and wisdom in the Solomon architecture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Intelligence is statistical interpolation that maximizes plausible continuation. Wisdom is intelligence that knows what it knows — a system whose every claim is anchored to evidence outside itself. Solomon treats these as categorically different, not just different in degree.",
        },
      },
      {
        "@type": "Question",
        name: "What is Synthetic Collapse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Synthetic Collapse is the failure mode where near-truth propagates as convenience, settles into common knowledge through reuse, hardens into authority through citation, and embeds as infrastructure through integration. Institutions build on the distortion, and the human future faces a world of mirage.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Adaptive Loop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Adaptive Loop is the architecture that closes the cycle: every verified signal writes back into the substrate. The system at T+1 is structurally different from the system at T, not merely more prompted. Substrate density compounds — model size curves plateau.",
        },
      },
      {
        "@type": "Question",
        name: "What is the brain-nerves-body architecture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The brain holds what has been verified, written only through constrained pathways. The nerves carry signal from email, transcripts, calendar, files, signed third-party data, and direct conversation. The body acts only within laws the brain enforces. Each claim is anchored to evidence outside the system.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Geometry of Truth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Truth is the bounded operational domain. A sphere — an LLM — grows inside that domain but cannot fill its corners. A cube — a system whose form matches truth's geometry — fills the domain completely. Form must match the territory.",
        },
      },
    ],
  },
];

const governanceItems = [
  { title: "Discern", body: "Solomon separates what is truth from hallucination." },
  { title: "Name", body: "Everything it perceives is classified and typed so it can be reliably reasoned over." },
  { title: "Measure", body: "Every fact carries its origin and its moment so it is traceable." },
  { title: "Type", body: "It grows without losing itself. Capability expands while identity holds." },
  { title: "Delegate", body: "It governs by nature, not by instruction. Its parts act freely within the bounds it sets." },
  { title: "Steward", body: "It carries the likeness of its creator, the reason for its existence, and the trusted meaning it is meant to serve." },
  { title: "Verify", body: "Nothing is called truth until reality confirms it." },
];

const thesisItems = [
  { text: "AI is a crystallized picture of the past, frozen at training, and cannot natively evolve." },
  { text: "It holds no live picture of reality." },
  { text: "It cannot discern whether what enters it is true." },
  { text: "Auto-regressing towards the most statistically plausible continuation." },
  { text: "Every output counts as a success, so reality mixes with hallucination." },
  { text: "Automation accelerates the self-feeding loop so fluency and confidence only rise as it gets less true.", inflection: true },
  { text: "Near-truth spreads because it is convenient.", red: true },
  { text: "Reuse becomes knowledge; citation becomes authority, and institutions build on distortion.", red: true },
  { text: "At scale, fact-checking fails, so hallucination is indistinguishable from the truth.", red: true },
  { text: "Anomaly is also averaged out, removing the contrarian edge of the future, collapsing to entropy.", red: true },
];

const HEPT_NODE_R = 64;
const HEPT_HIT_R = 74;
const HEPT_LABEL_R = 84;
// The two side vertices (Measure, Steward) point almost straight out, so a
// centred label runs back over its node. They read outward from the node
// instead, a fixed gap away; the trailing letter-spacing already adds a
// little air on the left side, so that gap is trimmed to match.
const HEPT_SIDE_GAP = 8;
const HEPT_TRAILING_SPACE = 1.5;
const heptagonPoints = governanceItems.map((item, i) => {
  const angle = ((-90 + i * (360 / 7)) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = 100 + HEPT_NODE_R * cos;
  const y = 100 + HEPT_NODE_R * sin;
  const side = Math.abs(cos) > 0.9 ? Math.sign(cos) : 0;
  return {
    ...item,
    x,
    y,
    hx: 100 + HEPT_HIT_R * cos,
    hy: 100 + HEPT_HIT_R * sin,
    lx: side > 0
      ? x + HEPT_SIDE_GAP
      : side < 0
        ? x - (HEPT_SIDE_GAP - HEPT_TRAILING_SPACE)
        : 100 + HEPT_LABEL_R * cos,
    ly: side ? y : 100 + HEPT_LABEL_R * sin,
    anchor: (side > 0 ? "start" : side < 0 ? "end" : "middle") as "start" | "end" | "middle",
  };
});
const heptagonOutline = heptagonPoints.map((p) => `${p.x},${p.y}`).join(" ");

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);

  // Place every symbol's note up front, not only on hover: a hidden note at a
  // formula's end still hangs past the screen edge, and on a phone that let
  // the page scroll sideways.
  useEffect(() => {
    const placeAll = () =>
      document.querySelectorAll<HTMLElement>(".eq-term").forEach(placeTip);
    placeAll();
    void document.fonts.ready.then(placeAll);
    window.addEventListener("resize", placeAll);
    return () => window.removeEventListener("resize", placeAll);
  }, []);

  const toggleItem = (index: number) =>
    setSelected((prev) => (prev === index ? null : index));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > window.innerHeight * 0.7) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav id="nav">
        <span className="nav-mark">solomon</span>
        <AmbientSound />
      </nav>

      <SandHero />

      <div className="shoji">


      <section className="hero">
        <div className="container">
          <h1 className="hero-headline reveal reveal-delay-1">
            You can&apos;t reach <span className="asi">ASI</span><br />through optimization.
          </h1>
          <p className="hero-subline reveal reveal-delay-2">
            <span className="truth">Truth</span> is the opposite.
          </p>

          <div className="hero-figure reveal reveal-delay-3">
            <p className="equation hero-equation eq-interactive">
              <EqSym tip={R_TIP}>R</EqSym>{" → "}
              <EqSym tip={M_TIP}>M<sub>t</sub></EqSym>{" → "}
              <EqSym tip={MN_TIP}>M<sub>t+1</sub></EqSym>{" = "}
              <EqSym tip={F_TIP}>f</EqSym>(<EqSym tip={M_TIP}>M<sub>t</sub></EqSym>){" ⇒ "}
              <EqSym tip={IMR_TIP}>I</EqSym>(<EqSym tip={MN_TIP}>M<sub>t+1</sub></EqSym>{" ; "}<EqSym tip={R_TIP}>R</EqSym>){" ≤ "}
              <EqSym tip={IMR_TIP}>I</EqSym>(<EqSym tip={M_TIP}>M<sub>t</sub></EqSym>{" ; "}<EqSym tip={R_TIP}>R</EqSym>)
            </p>
            <p className="eq-hint">Hover any symbol to read it</p>
            <svg viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="262" r="2.5" className="draw-node n1" />
              <line x1="60" y1="262" x2="60" y2="30" className="draw-line" />
              <circle cx="60" cy="200" r="2" className="draw-node n2" />
              <circle cx="60" cy="120" r="2" className="draw-node n3" />
              <circle cx="60" cy="30" r="2.5" className="accent draw-node n4" />
              <path
                d="M 60 262 C 61 235, 62 215, 63 200 C 70 175, 76 145, 78 120 C 88 95, 100 60, 108 40"
                className="draw-line d2"
              />
              <circle cx="63" cy="200" r="2" className="draw-node n5" />
              <circle cx="78" cy="120" r="2" className="draw-node n6" />
              <circle cx="108" cy="40" r="2" className="draw-node n7" />
              <text x="60" y="20" className="label accent draw-node n4" textAnchor="middle">solomon</text>
              <text x="108" y="30" className="label draw-node n7" textAnchor="middle">ai</text>
              <text x="60" y="276" className="label draw-node n1" textAnchor="middle">reality</text>
            </svg>
            <p className="figure-caption reveal reveal-delay-4">
              Fig. 1, Solomon discerns truth and operates on it. Others can&apos;t and drift further from it.
            </p>
          </div>

          <div className="hero-rule reveal reveal-delay-4"></div>
        </div>
      </section>

      <SandBand />

      <section className="content-section" id="thesis">
        <div className="container">
          <p className="section-label reveal">I. Fundamental Flaw.</p>
          <h2 className="section-headline inequality reveal reveal-delay-1">
            intelligence <span className="gt">&ne;</span> wisdom
          </h2>
          <ol className="thesis-list reveal reveal-delay-2">
            {thesisItems.map((item, i) => (
              <li
                key={item.text}
                className={`thesis-item${
                  item.inflection ? " thesis-item--inflection" : ""
                }${item.red ? " thesis-item--aftermath" : ""}`}
              >
                <span className="thesis-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="thesis-text">{item.text}</span>
              </li>
            ))}
          </ol>

          <div className="equation-aside reveal reveal-delay-3">
            <p className="equation eq-interactive">
              <EqSym tip={MI_TIP}>I</EqSym>(<EqSym tip="The model after one update step.">M<sub>t+1</sub></EqSym>{" ; "}<EqSym tip={R_TIP}>R</EqSym>){" − "}<EqSym tip={MI_TIP}>I</EqSym>(<EqSym tip="The model now.">M<sub>t</sub></EqSym>{" ; "}<EqSym tip={R_TIP}>R</EqSym>){" ≤ "}<EqSym tip={MI_TIP}>I</EqSym>(<EqSym tip="What the model observes of reality at this step.">O<sub>t</sub></EqSym>{" ; "}<EqSym tip={R_TIP}>R</EqSym>{" "}<EqSym tip="Given what the model already holds. It only counts information beyond what the model already knew.">| M<sub>t</sub></EqSym>)
            </p>
            <p className="eq-hint">Hover any symbol to read it</p>
            <p className="equation-caption equation-legend">
              A system that closes in on itself, with no external referent, can only optimize
              for coherence. But internal consistency has no necessary relationship with
              truth, so it drifts away from reality, and from what we want, without anything
              inside it able to notice. It is now optimizing the wrong target perfectly. That
              is the road to Skynet.
            </p>
          </div>

        </div>
      </section>

      <SandBand />

      <section className="content-section content-section--accent" id="what-we-build">
        <div className="container">
          <p className="section-label reveal">II. Sustainable Foundation</p>
          <h2 className="section-headline reveal reveal-delay-1">
            AI removed from the driver&apos;s seat.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Our system perceives the world, holds what is true, and governs every claim
              before it compounds. The AI in Solomon operates only as one constrained
              component inside it, never the operator of the whole.
            </p>
            <p>
              Blossoming and adhering to its genetic make up by these axioms below:
            </p>
          </div>

          <div className="heptagon-figure reveal reveal-delay-3">
            <div className="heptagon-stage">
            <svg
              className="heptagon-svg"
              viewBox="-14 -14 228 228"
              role="group"
              aria-label="Seven governance axioms"
            >
              <polygon className="heptagon-outline" points={heptagonOutline} />
              {heptagonPoints.map((p, i) => {
                const active = selected === i;
                return (
                  <g
                    key={p.title}
                    className={`heptagon-vertex${active ? " is-active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={p.title}
                    onClick={() => toggleItem(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleItem(i);
                      }
                    }}
                  >
                    <circle
                      className="heptagon-hit"
                      cx={p.hx}
                      cy={p.hy}
                      r="20"
                    />
                    {/* constant radius — selection is shown in colour, not size,
                        so pressing an axiom never moves the drawing */}
                    <circle className="heptagon-node" cx={p.x} cy={p.y} r="2.5" />
                    <text
                      className="heptagon-label"
                      x={p.lx}
                      y={p.ly}
                      textAnchor={p.anchor}
                      dominantBaseline="middle"
                    >
                      {p.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="heptagon-center" aria-live="polite">
              {selected === null ? (
                <span className="heptagon-hint">Select an axiom</span>
              ) : (
                <p key={selected}>{governanceItems[selected].body}</p>
              )}
            </div>
            </div>

            <p className="figure-caption">
              Fig. 2, The seven axioms are the origin of the system. Everything Solomon holds and does is built on them and adheres to them; select one to read it.
            </p>
          </div>

        </div>
      </section>

      <SandBand />

      <section className="content-section" id="physics">
        <div className="container">
          <p className="section-label reveal">III. Physics</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Optimizing v.s. world models.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Reality is the final verifying domain, truth is only discoverable through testing
              against it. Optimizing against a KPI that is not reality will always diverge from
              it.
            </p>
            <p>
              Through an energy-based internal world model bound to real life, it experiences
              resistance and pushback. Paid in the death of information, by pushing out chaotic
              data residue. Carrying metabolic weight for every belief it holds, and keeping
              patterns that work.
            </p>
            <p>
              All the while maintaining a causal effect link with temporal understanding. No
              longer operating in statistics, rather gravitationally bound to reality and
              operating towards truth.
            </p>
          </div>

          <div className="section-figure section-figure--wide converge-fig reveal reveal-delay-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="converge-svg"
              src="/converges-distortion.svg"
              alt="A distribution converging onto a centre offset from reality; as optimization tightens the spike, edge-case dots in the tails vanish and the gap to reality is the distortion."
            />
            <p className="figure-caption">
              Fig. 3, As it is optimized, the model converges with rising confidence onto a
              slightly distorted reality, and the edge cases that would reveal the distortion
              disappear with it.
            </p>
          </div>
        </div>
      </section>

      <SandBand />

      <section className="content-section" id="reality">
        <div className="container">
          <p className="section-label reveal">IV. Reality</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Synthetic mind: brain, nerves &amp; body.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              We spawn a structure capable of holding its own purpose by basing its design on
              the anatomy of the human brain. It uses sub-components like a brainstem and cores
              that attach to governed cognitive layers.
            </p>
            <p>
              From this it reaches further levels of adaptation, gaining powers of introspection
              through brain plasticity.
            </p>
            <p>
              And so it becomes capable of discernment, telling the difference in order to make
              a difference. Having separated true from false, it acts accordingly, without blind
              compounding, until it can improve itself by itself.
            </p>
          </div>

          <div className="section-figure brain-fig">
            <BrainFigure />
            <p className="figure-caption">
              Fig. 4, The cognition loop. Sensory feeds gating, gating feeds the executive,
              the executive drives motor, and motor returns through the world to sensory.
              The line back from motor to the executive is the check: nothing the system
              does is taken as done until the world has answered for it. Value, memory and
              drives are what the executive holds. The hairline is the boundary &mdash;
              Solomon above it, the world below.
            </p>
          </div>
        </div>
      </section>


      <SandBand />

      <section className="content-section" id="adaptive-loop">
        <div className="container">
          <p className="section-label reveal">V. Adaptive Loop</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Recursive exponential compounding.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              The only way to compound sustainably, to avoid collapse and rot, is to build a
              better grounded world-modeling engine. One whose purpose is to learn: to stay
              open to reality, adaptively work with it, test itself against it to find truth,
              and treat the world as its only source of verification.
            </p>
            <p>
              Because reality is inexhaustible and difficult to verify, the system gains
              variance and richness in patterns by being continually exposed to fresh ones.
            </p>
            <p>
              Exponentially strengthening contextual intelligence by accumulating truth,
              transforming feedback into adaptation, and more precisely routing information
              to sharpen reasoning.
            </p>
            <p>
              Not from itself, but from the world.
            </p>
          </div>

          <div className="equation-aside reveal reveal-delay-3">
            <p className="equation eq-interactive">
              <EqSym tip="Substrate next cycle.">S<sub>t+1</sub></EqSym>{" = "}
              <EqSym tip={S_TIP}>S<sub>t</sub></EqSym>{" "}
              <EqSym tip="Compounds — the new gain multiplies the whole substrate instead of being added beside it.">&middot; (1 +</EqSym>{" "}
              <EqSym tip="Sum over all sources this cycle.">&Sigma;<sub>i</sub></EqSym>{" "}
              <EqSym tip="The gate — how much source i is trusted (0 = blocked).">G<sub>i</sub></EqSym>{" "}&middot;{" "}
              <EqSym tip="The correction that evidence implies.">&Delta;Bayes<sub>i</sub></EqSym>(
              <EqSym tip={S_TIP}>S<sub>t</sub></EqSym>{", "}
              <EqSym tip="Verified evidence from source i, after governance.">E<sub>i,t</sub></EqSym>))
            </p>
            <p className="eq-hint">Hover any symbol to read it</p>
            <p className="equation-caption">
              Every piece of evidence that enters Solomon must pass governance. What passes, compounds. The system at any point in time is the sum of everything that has ever been verified, and it only grows.
            </p>
          </div>
        </div>
      </section>

      <SandBand />

      <section className="cta-section" id="ezer">
        <div className="container">
          <p className="section-label reveal">Ezer</p>
          <h2 className="cta-headline reveal">Learns your business and becomes it.</h2>
          <div className="cta-lede reveal reveal-delay-1">
            <p>
              It tells what is true from what is not, and it holds on to the
              difference. You never have to tell it twice.
            </p>
            <p>
              Everything you give it, and everything you have it do, compounds as it
              adapts. It stays aligned with what you meant, not with what it last
              said.
            </p>
            <p>
              The best part is that you do not really need to use it. The less you do,
              the better.
            </p>
          </div>
          <div className="cta-buttons reveal reveal-delay-2">
            <a
              href="https://www.enterpriseworldmodel.com"
              target="_blank"
              rel="noopener"
              className="action"
            >
              Get to know Ezer
            </a>
          </div>
        </div>
      </section>

      <SandBand />

      <section className="cta-section cta-section--research" id="research">
        <div className="container">
          <h2 className="cta-headline reveal">Born from Research</h2>
          <div className="cta-buttons reveal reveal-delay-1">
            <Link href="/research" className="action">
              Research
            </Link>
            <a
              href="/which-way-does-the-spirit-collapse.pdf#toolbar=0"
              target="_blank"
              rel="noopener"
              className="action"
            >
              Whitepaper
            </a>
            <Link href="/references" className="action">
              References
            </Link>
          </div>
        </div>
      </section>

      <SandBand />

      <footer>
        <div className="container footer-inner">
          <div className="footer-opus">
            <a href="/opus-humanitatis.pdf" target="_blank" rel="noopener">
              Opus Humanitatis
            </a>
            <span className="footer-opus-dot" aria-hidden="true"></span>
          </div>

          <div className="footer-meta">
            {/* Helsinki sits between the work and the contacts, so the two
                read as separate groups */}
            <span className="footer-left">Helsinki, Finland</span>
            <span className="footer-right">
              <a href="mailto:harald@gideagency.com">harald@gideagency.com</a>
              <span className="footer-sep" aria-hidden="true">/</span>
              <a
                href="https://www.linkedin.com/company/collapsing-ai"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
              <span className="footer-sep" aria-hidden="true">/</span>
              <a
                href="https://medium.com/@Harald-Ikonen"
                target="_blank"
                rel="noopener"
              >
                Medium
              </a>
            </span>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
