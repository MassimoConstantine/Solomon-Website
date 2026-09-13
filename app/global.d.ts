// The ambient pad publishes its breath here so the hero sand can pull toward
// the critical line in step with the sound. Null whenever nothing is playing,
// which makes the hero fall back to its own cycle.
declare global {
  interface Window {
    __solomonBreath: number | null;
  }

  // Safari's Audio Session API (not yet in TypeScript's DOM types). Absent in
  // other browsers.
  interface Navigator {
    audioSession?: { type: string };
  }
}

export {};
