import Link from "next/link";
import { site } from "@/lib/site";
import {
  STATUS_LABEL,
  SUBJECTS,
  SUBJECT_BY_KEY,
  bySubject,
  openLines,
  openLinesBySubject,
  researchSorted,
  type ResearchEntry,
  type Subject,
} from "@/lib/research";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

function Entry({ entry }: { entry: ResearchEntry }) {
  const external = entry.href.startsWith("http");
  const href = external ? entry.href : `${entry.href}#toolbar=0`;
  return (
    <li className={`reg-card${entry.pinned ? " reg-card--pinned" : ""}`}>
      {entry.pinned ? <p className="reg-flag">Founding paper</p> : null}
      <p className="reg-meta">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        <span className="reg-meta-sep" aria-hidden="true">/</span>
        <Link href={`/research/${entry.subject}`} className="reg-subject-link">
          {SUBJECT_BY_KEY[entry.subject].title}
        </Link>
        <span className="reg-meta-sep" aria-hidden="true">/</span>
        {STATUS_LABEL[entry.status]}
      </p>

      <h2 className="reg-title">
        <a href={href} target="_blank" rel="noopener">
          {entry.title}
        </a>
      </h2>

      <p className="reg-abstract">{entry.abstract}</p>

      <p className="reg-links">
        <a href={href} target="_blank" rel="noopener">
          Read the paper
        </a>
        {entry.doi ? (
          <a href={`https://doi.org/${entry.doi}`} target="_blank" rel="noopener">
            doi:{entry.doi}
          </a>
        ) : null}
        {entry.arxiv ? (
          <a href={`https://arxiv.org/abs/${entry.arxiv}`} target="_blank" rel="noopener">
            arXiv:{entry.arxiv}
          </a>
        ) : null}
      </p>
    </li>
  );
}

export default function ResearchIndex({ subject }: { subject?: Subject }) {
  const current = subject ? SUBJECT_BY_KEY[subject] : undefined;
  const entries = subject ? bySubject(subject) : researchSorted;
  const lines = subject ? openLinesBySubject(subject) : openLines;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Solomon", item: site.url },
      { "@type": "ListItem", position: 2, name: "Research", item: `${site.url}/research` },
      ...(current
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: current.title,
              item: `${site.url}/research/${subject}`,
            },
          ]
        : []),
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/research${subject ? `/${subject}` : ""}`,
    inLanguage: "en",
    name: current
      ? `${current.title} — Research — Solomon Research Lab`
      : "Research — Solomon Research Lab",
    url: `${site.url}/research${subject ? `/${subject}` : ""}`,
    description: current ? current.blurb : "Everything the lab publishes, by subject.",
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    hasPart: entries.map((entry) => ({
      "@type": "ScholarlyArticle",
      headline: entry.title,
      abstract: entry.abstract,
      datePublished: entry.date,
      ...(entry.updated ? { dateModified: entry.updated } : {}),
      version: entry.version,
      url: entry.href.startsWith("http") ? entry.href : `${site.url}${entry.href}`,
      author: entry.authors.map((name) => ({ "@type": "Person", name })),
      publisher: { "@type": "Organization", name: site.legalName, url: site.url },
      ...(entry.doi ? { identifier: `https://doi.org/${entry.doi}` } : {}),
    })),
  };

  return (
    <div className="reg-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]) }}
      />

      <nav id="nav">
        <Link href="/" className="nav-mark">
          solomon
        </Link>
      </nav>

      <nav className="reg-nav" aria-label="Research subjects">
        <ul className="reg-nav-list">
          <li>
            <Link
              href="/research"
              className={`reg-nav-item${subject ? "" : " is-active"}`}
              aria-current={subject ? undefined : "page"}
            >
              <span>All</span>
              <span className="reg-nav-count">{researchSorted.length}</span>
            </Link>
          </li>
          {SUBJECTS.map((s) => {
            const count = bySubject(s.key).length;
            const active = s.key === subject;
            return (
              <li key={s.key}>
                <Link
                  href={`/research/${s.key}`}
                  className={`reg-nav-item${active ? " is-active" : ""}${
                    count === 0 ? " is-empty" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{s.title}</span>
                  <span className="reg-nav-count">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="reg-nav-foot">
          <Link href="/references">References</Link>
        </div>
      </nav>

      <main className="reg-main">
        <header className="reg-head">
          <h1 className="reg-headline">{current ? current.title : "Research"}</h1>
          <p className="reg-intro">
            {current
              ? current.blurb
              : "Everything the lab publishes, newest first. Each piece carries its date, its version, and what has been verified."}
          </p>
        </header>

        {entries.length ? (
          <ol className="reg-list">
            {[...entries]
              .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))
              .map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
          </ol>
        ) : (
          <p className="reg-empty">
            Nothing published under {current?.title.toLowerCase()} yet. What is being
            worked on is listed below.
          </p>
        )}

        {lines.length ? (
          <section className="reg-track">
            <h2 className="ref-group">Currently working on</h2>
            <p className="reg-track-blurb">
              Open questions, listed so the record shows what was being attempted and
              when. Nothing here is a result, and none of it is finished.
            </p>
            <ul className="reg-open">
              {lines.map((line) => (
                <li key={line.title} className="reg-card reg-card--wip">
                  <p className="reg-flag reg-flag--wip">In progress</p>
                  <h3 className="reg-open-title">{line.title}</h3>
                  <p className="reg-open-note">{line.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

      </main>
    </div>
  );
}
