// Research register — single source of truth for everything the lab publishes.
// Consumed by /research, the sitemap, and the RSS feed. To publish a new piece,
// add one entry here; every surface picks it up.
//
// Status is a first-class field on purpose. The architecture claims that
// generation must be bounded by verification, so the lab's own output carries
// its verification state in public rather than asserting finality.

export type ResearchStatus =
  | "published"    // released, and the argument is one we stand behind as it stands
  | "preprint"     // public, timestamped, citable, not yet externally refereed
  | "under-review" // submitted to, or circulating with, outside reviewers
  | "draft";       // released early and knowingly incomplete

// Subjects are the site's front door for readers who arrive by topic. Each one
// is a route (/research/<key>) and a sidebar entry, whether or not it has papers
// yet. Keys are URL slugs; do not rename one once it has been linked to.
export type Subject =
  | "architecture"
  | "philosophy"
  | "mathematics"
  | "physics"
  | "biology"
  | "chemistry"
  | "esotericism";

export type ResearchEntry = {
  /** Stable citation handle. Never reassigned, never reused. */
  id: string;
  /** URL slug for the post page, once one exists. */
  slug: string;
  title: string;
  /** Two or three sentences. What the paper argues, not what it gestures at. */
  abstract: string;
  authors: string[];
  /** ISO date of first public release. */
  date: string;
  /** ISO date of the most recent revision, when it differs from `date`. */
  updated?: string;
  version: string;
  status: ResearchStatus;
  subject: Subject;
  /** Canonical artifact. A path is served from this domain. */
  href: string;
  /** External timestamped record. Where priority actually lives. */
  doi?: string;
  arxiv?: string;
  /** What has been checked, and by what. Empty is an answer too. */
  verification?: string;
  tags?: string[];
  /** The founding paper sits at the top of the register, on its own. */
  pinned?: boolean;
};

export const STATUS_LABEL: Record<ResearchStatus, string> = {
  published: "Published",
  preprint: "Preprint",
  "under-review": "Under review",
  draft: "Draft",
};

export const SUBJECTS: { key: Subject; title: string; blurb: string }[] = [
  {
    key: "architecture",
    title: "Architecture",
    blurb:
      "The governed system itself — brain, nerves, body, and the loop that binds them to reality.",
  },
  {
    key: "philosophy",
    title: "Philosophy",
    blurb:
      "What it means for a system to know, and what separates a claim that was verified from one that was merely generated.",
  },
  {
    key: "mathematics",
    title: "Mathematics",
    blurb:
      "Results pursued with the architecture, held to the standard of the field they belong to.",
  },
  {
    key: "physics",
    title: "Physics",
    blurb:
      "Where the model has to answer to measurement rather than to its own coherence.",
  },
  {
    key: "biology",
    title: "Biology",
    blurb:
      "The anatomy the architecture borrows — cortex, brainstem, nerve, synapse — and what living systems already know about verification.",
  },
  {
    key: "chemistry",
    title: "Chemistry",
    blurb:
      "Reaction, bond, and equilibrium as models of how evidence enters a substrate and what it costs to keep it there.",
  },
  {
    key: "esotericism",
    title: "Esotericism",
    blurb:
      "The older traditions that asked which way the spirit collapses, read for what they got structurally right.",
  },
];

export const SUBJECT_BY_KEY = Object.fromEntries(
  SUBJECTS.map((s) => [s.key, s]),
) as Record<Subject, (typeof SUBJECTS)[number]>;

export function isSubject(value: string): value is Subject {
  return value in SUBJECT_BY_KEY;
}

export const research: ResearchEntry[] = [
  {
    id: "SRL-001",
    slug: "which-way-does-the-spirit-collapse",
    title: "Which Way Does the Spirit Collapse?",
    abstract:
      "The founding paper. Intelligence that generates without verifying drifts toward internal coherence and away from the world, and no amount of scale reverses the direction. The argument for a separate architecture in which every claim entering the substrate is anchored to evidence outside the system.",
    authors: ["Harald Ikonen"],
    date: "2026-09-09",
    version: "v1.0",
    status: "published",
    subject: "architecture",
    pinned: true,
    href: "/which-way-does-the-spirit-collapse.pdf",
    verification:
      "Argument rests on published results; the literature it stands on is listed in full under References.",
    tags: ["governed intelligence", "synthetic collapse", "verification"],
  },
];

/** Open problems the lab is working on. Questions, not results. */
export const openLines: { subject: Subject; title: string; note: string }[] = [
  {
    subject: "mathematics",
    title: "The Riemann Hypothesis",
    note:
      "An approach to the distribution of the non-trivial zeros. Nothing is claimed until it is formalized and checkable by someone who did not write it.",
  },
  {
    subject: "physics",
    title: "Quantum gravity",
    note:
      "Whether a model bound to measurement can carry a consistent account of gravitation and quantum field theory at once.",
  },
  {
    subject: "architecture",
    title: "Bounds on the compounding substrate",
    note:
      "A formal treatment of the governance gate: what the accumulation of verified evidence can and cannot guarantee over unbounded cycles.",
  },
];

export const researchSorted = [...research].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function bySubject(subject: Subject) {
  return researchSorted.filter((entry) => entry.subject === subject);
}

export function openLinesBySubject(subject: Subject) {
  return openLines.filter((line) => line.subject === subject);
}
