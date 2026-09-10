// Fig. 4 — the cognition loop, with the check.
//
// Geometry is Harald's, verbatim from solomon-cognition-loop-with-check.svg
// (2026-09-09): the loop through sensory, gating, executive and motor; the
// check running back from motor to executive; value, memory and drives held
// on the bar inside. The hairline is the boundary — Solomon above it, the
// world below.
//
// Two things differ from the source file, both to obey HANDOFF §5: the white
// backing rectangle is dropped so the figure sits on the page's own paper,
// and the labels take the site's label voice instead of a mono.
export default function BrainFigure() {
  return (
    <svg
      viewBox="60 190 1080 560"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="fig4-title"
      className="brain-svg"
    >
      <title id="fig4-title">
        A closed loop: sensory feeds gating, gating feeds the executive, the executive
        drives motor, and motor returns to the world and back to sensory. A second line
        runs from motor back to the executive — the check. Value, memory and drives sit
        on a bar inside the loop. A hairline separates Solomon, above, from the world,
        below.
      </title>

      {/* the boundary: Solomon above, the world below */}
      <line x1="60" y1="470" x2="1140" y2="470" className="f-boundary" />

      {/* the loop */}
      <circle cx="700" cy="470" r="232" className="f-loop" />

      <g className="f-loop f-caps">
        <path d="M-5,-4.5 L0,0 L-5,4.5" transform="translate(486,381) rotate(-67.5)" />
        <path d="M-5,-4.5 L0,0 L-5,4.5" transform="translate(611,256) rotate(-22.5)" />
        <path d="M-5,-4.5 L0,0 L-5,4.5" transform="translate(864,306) rotate(45)" />
        <path d="M-5,-4.5 L0,0 L-5,4.5" transform="translate(700,702) rotate(180)" />
      </g>

      {/* the check: motor back to the executive */}
      <g className="f-inner f-caps">
        <line x1="925" y1="463" x2="711" y2="249" />
        <path d="M-5,-4.5 L0,0 L-5,4.5" transform="translate(710,248) rotate(-135)" />
      </g>

      {/* what the executive holds */}
      <g className="f-inner">
        <line x1="700" y1="244" x2="700" y2="400" />
        <line x1="570" y1="400" x2="830" y2="400" />
        <line x1="474" y1="464" x2="564" y2="404" />
      </g>

      <g className="f-node">
        <circle cx="468" cy="470" r="6" />
        <circle cx="536" cy="306" r="6" />
        <circle cx="700" cy="238" r="6" />
        <circle cx="932" cy="470" r="6" />
      </g>
      <g className="f-node">
        <rect x="564" y="394" width="12" height="12" />
        <rect x="694" y="394" width="12" height="12" />
        <rect x="824" y="394" width="12" height="12" />
      </g>

      <g className="f-label">
        <text x="448" y="458" textAnchor="end">Sensory</text>
        <text x="514" y="302" textAnchor="end">Gating</text>
        <text x="700" y="214" textAnchor="middle">Executive</text>
        <text x="952" y="458">Motor</text>
        <text x="570" y="430" textAnchor="middle">Value</text>
        <text x="700" y="430" textAnchor="middle">Memory</text>
        <text x="830" y="430" textAnchor="middle">Drives</text>
      </g>

      <g className="f-label f-label--faint">
        <text x="90" y="456">Solomon</text>
        <text x="90" y="492">World</text>
      </g>
    </svg>
  );
}
