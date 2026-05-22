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
            We take the AI out of the driver&apos;s seat.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Solomon closes the loop around raw intelligence. The <em>brain</em> is a governed
              world model, physically enforced rather than prompt-suggested. Every claim carries
              its provenance. Every state transition runs under law. The <em>nerves</em> bind
              that world to reality so internal coherence cannot drift away from external truth.
              The <em>body</em> carries reasoning into controlled, contextual action.
            </p>
          </div>

          <div className="section-figure reveal reveal-delay-3">
            <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
              <circle cx="180" cy="180" r="140" fill="none" stroke="#111" strokeWidth="1.2" className="draw-node n1" />

              <polyline points="237,167 270,160 305,170 340,160" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="221,148 245,120 275,95 295,65" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="205,128 220,100 240,75 250,40" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="180,128 175,95 185,65 175,30" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="155,128 140,100 120,75 110,40" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="139,148 115,125 90,105 70,75" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="123,167 95,160 70,170 40,160" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="129,192 100,210 75,225 50,220" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="135,216 115,240 95,265 75,295" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="158,227 145,260 155,290 145,325" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="180,238 175,265 185,295 175,335" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="203,227 215,260 200,295 215,330" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="225,216 250,240 270,270 290,300" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />
              <polyline points="231,192 260,205 290,215 320,205" fill="none" stroke="#111" strokeWidth="1" className="draw-node n2" />

              <line x1="237" y1="167" x2="205" y2="128" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="205" y1="128" x2="155" y2="128" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="155" y1="128" x2="123" y2="167" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="123" y1="167" x2="135" y2="216" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="135" y1="216" x2="180" y2="238" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="180" y1="238" x2="225" y2="216" stroke="#111" strokeWidth="1.2" className="draw-node n3" />
              <line x1="225" y1="216" x2="237" y2="167" stroke="#111" strokeWidth="1.2" className="draw-node n3" />

              <line x1="207" y1="158" x2="180" y2="145" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="180" y1="145" x2="153" y2="158" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="153" y1="158" x2="146" y2="188" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="146" y1="188" x2="165" y2="212" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="165" y1="212" x2="195" y2="212" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="195" y1="212" x2="214" y2="188" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="214" y1="188" x2="207" y2="158" stroke="#111" strokeWidth="0.6" className="draw-node n4" />

              <line x1="237" y1="167" x2="207" y2="158" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="205" y1="128" x2="180" y2="145" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="155" y1="128" x2="153" y2="158" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="123" y1="167" x2="146" y2="188" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="135" y1="216" x2="165" y2="212" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="180" y1="238" x2="195" y2="212" stroke="#111" strokeWidth="0.6" className="draw-node n4" />
              <line x1="225" y1="216" x2="214" y2="188" stroke="#111" strokeWidth="0.6" className="draw-node n4" />

              <line x1="180" y1="145" x2="180" y2="180" stroke="#111" strokeWidth="0.5" className="draw-node n4" />
              <line x1="146" y1="188" x2="180" y2="180" stroke="#111" strokeWidth="0.5" className="draw-node n4" />
              <line x1="195" y1="212" x2="180" y2="180" stroke="#111" strokeWidth="0.5" className="draw-node n4" />
              <line x1="214" y1="188" x2="180" y2="180" stroke="#111" strokeWidth="0.5" className="draw-node n4" />

              <circle cx="237" cy="167" r="2" fill="#111" className="draw-node n3" />
              <circle cx="205" cy="128" r="2" fill="#111" className="draw-node n3" />
              <circle cx="155" cy="128" r="2" fill="#111" className="draw-node n3" />
              <circle cx="123" cy="167" r="2" fill="#111" className="draw-node n3" />
              <circle cx="135" cy="216" r="2" fill="#111" className="draw-node n3" />
              <circle cx="180" cy="238" r="2" fill="#111" className="draw-node n3" />
              <circle cx="225" cy="216" r="2" fill="#111" className="draw-node n3" />

              <circle cx="207" cy="158" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="180" cy="145" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="153" cy="158" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="146" cy="188" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="165" cy="212" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="195" cy="212" r="1.5" fill="#111" className="draw-node n4" />
              <circle cx="214" cy="188" r="1.5" fill="#111" className="draw-node n4" />

              <circle cx="180" cy="180" r="2" fill="#111" className="draw-node n4" />

              <text x="180" y="20" className="label" textAnchor="middle">body</text>
              <text x="180" y="70" className="label" textAnchor="middle">nerves</text>
              <text x="180" y="115" className="label" textAnchor="middle">brain</text>
            </svg>
            <p className="figure-caption">
              Fig. 3 &mdash; A brain divided into compartments, with the LLM as one constrained operator inside the looping system; nerves reach outward; the body is the boundary.
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
