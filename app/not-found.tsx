import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "The requested page does not exist on this site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-headline">The page is not here.</h1>
        <p className="hero-subline">What was sought is not here.</p>

        <div className="section-body" style={{ marginTop: "2rem" }}>
          <p>
            <Link
              href="/"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text)",
                textDecoration: "underline",
              }}
            >
              Return to the manifesto
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
