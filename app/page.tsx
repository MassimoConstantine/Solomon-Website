"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

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
      name: site.author.name,
      jobTitle: site.author.role,
    },
    sameAs: [],
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
];

export default function Home() {
  const fractalRef = useRef<HTMLImageElement>(null);

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

    let targetRotY = 0;
    let currentRotY = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      targetRotY = ((e.clientX - cx) / cx) * 6;
    };

    const onMouseLeave = () => {
      targetRotY = 0;
    };

    const tick = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (nav) {
        if (y > vh * 0.7) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;

      const img = fractalRef.current;
      if (img) {
        const progress = Math.min(y / vh, 1);
        const translateY = y * 0.25;
        const scale = 1 - progress * 0.15;
        const opacity = Math.max(0, 1 - progress * 0.85);
        img.style.transform =
          `translate3d(0, ${translateY}px, 0) ` +
          `scale(${scale}) ` +
          `rotateY(${currentRotY}deg)`;
        img.style.opacity = String(opacity);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav id="nav">
        <span className="nav-mark">Solomon</span>
        <span className="nav-label">Research Preview</span>
      </nav>

      <section className="hero-fractal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={fractalRef} src="/solomon-fractal.png" alt="Solomon" />
      </section>

      <section className="hero">
        <div className="container">
          <h1 className="hero-headline reveal reveal-delay-1">
            You can&apos;t reach ASI<br />through optimization.
          </h1>
          <p className="hero-subline reveal reveal-delay-2">
            <span className="truth">Truth</span> is the opposite.
          </p>

          <div className="hero-figure reveal reveal-delay-3">
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
          </div>

          <div className="hero-rule reveal reveal-delay-4"></div>
        </div>
      </section>

      <section className="content-section" id="thesis">
        <div className="container">
          <p className="section-label reveal">I. The Thesis</p>
          <h2 className="section-headline inequality reveal reveal-delay-1">
            wisdom <span className="gt">&gt;</span> intelligence
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              The field scales compute, parameters, and data. More of the same, faster.
              But a system that cannot distinguish what it knows from what it generates
              is not intelligent. It is interpolation with confidence.
            </p>
            <p>
              The breakthrough is not in scale. It is in a system that knows what it knows.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="why-now">
        <div className="container">
          <p className="section-label reveal">II. Why Now</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Scaling has an epistemic ceiling.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Hallucination is not a bug to be patched. It is the fundamental behavior of
              architectures that generate without verifying. Peaked probability distributions
              fire with equal confidence whether the source is knowledge or interpolation.
            </p>
            <p>
              As these systems assume consequential decisions, the absence of epistemic
              integrity becomes existential. The window to build the verification layer is now,
              before capability permanently outpaces accountability.
            </p>
          </div>

          <div className="equation-aside reveal reveal-delay-3">
            <p className="equation">I(t) = V(t) &middot; C(t) &nbsp;|&nbsp; P(t) &gt; &theta;</p>
            <p className="equation-caption">Fig. 2 &mdash; Intelligence as a function of verification, confidence, and provenance threshold</p>
          </div>
        </div>
      </section>

      <section className="content-section" id="what-we-build">
        <div className="container">
          <p className="section-label reveal">III. What We Build</p>
          <h2 className="section-headline reveal reveal-delay-1">
            A system where governance and intelligence are the same tissue.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Solomon is a verification-first architecture. Every claim carries provenance.
              Confidence is earned through evidence, not declared by probability. Capability
              does not precede accountability. It emerges from it.
            </p>
            <p>
              We do not bolt safety onto intelligence after the fact. We derive intelligence
              from the constraints that make it trustworthy. The architecture is not a product
              with guardrails. It is the guardrail that became the product.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section" id="cta">
        <div className="container">
          <h2 className="cta-headline reveal">Read the Research</h2>
          <a
            href="/which-way-does-the-spirit-collapse.pdf#toolbar=0"
            target="_blank"
            rel="noopener"
            className="cta-button reveal reveal-delay-1"
          >
            View the Whitepaper
          </a>
        </div>
      </section>

      <footer>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <span className="footer-left">Solomon &middot; 2026</span>
          <span className="footer-right">Helsinki, Finland</span>
        </div>
      </footer>
    </>
  );
}
