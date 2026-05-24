"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import GeometryOfTruth from "./GeometryOfTruth";

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
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Intelligence ≠ Wisdom — The Solomon Architecture",
    url: site.url,
    author: {
      "@type": "Person",
      name: site.author.name,
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
          text: "The brain holds the world model, written only through constrained pathways. The nerves carry signal from email, transcripts, calendar, files, signed third-party data, and direct conversation. The body acts only within laws the brain enforces. Each claim is anchored to evidence outside the system.",
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
            <p className="figure-caption reveal reveal-delay-4">
              Fig. 1 &mdash; Anchored to reality, Solomon climbs in a straight line. AI, generating from its own outputs, drifts further from truth with every step &mdash; each hallucination becoming the ground for the next.
            </p>
          </div>

          <div className="hero-rule reveal reveal-delay-4"></div>
        </div>
      </section>

      <section className="content-section" id="thesis">
        <div className="container">
          <p className="section-label reveal">I. Fundamental Flaw.</p>
          <h2 className="section-headline inequality reveal reveal-delay-1">
            intelligence <span className="gt">&ne;</span> wisdom
          </h2>
          <div className="thesis-list reveal reveal-delay-2">
            <div className="thesis-item">
              <p><strong>Frozen &amp; Stateless</strong> &mdash; A stateless model trained and optimized on old data, acting inside a bounded context window with no concept of truth. It does not auto-progress toward goals or move beyond what it is prompted to do.</p>
            </div>
            <div className="thesis-item">
              <p><strong>Plausible &amp; Regressive</strong> &mdash; Auto-regressively maximizing for plausible continuation. Generating near-truth statistical averages with no understanding of correctness.</p>
            </div>
            <div className="thesis-item">
              <p><strong>Unwise Intelligence</strong> &mdash; Treating partial truth as complete. Distortions compound and errors feed back into the stateless machine. Mirror reflecting mirror, the warp grows with every pass.</p>
            </div>
            <div className="thesis-item thesis-item--aftermath">
              <p><strong>Synthetic Collapse</strong> &mdash; Near-truth propagates as convenience, settles into common knowledge through reuse, hardens into authority through citation, and embeds as infrastructure through integration. Institutions build on the distortion and the human future faces a world of mirage.</p>
            </div>
          </div>

        </div>
      </section>

      <section className="content-section content-section--accent" id="what-we-build">
        <div className="container">
          <p className="section-label reveal">II. Sustainable Foundation</p>
          <h2 className="section-headline reveal reveal-delay-1">
            AI removed from the driver&apos;s seat.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              AI is one component inside Solomon&apos;s brain, merely generating. Underneath
              sits the substrate &mdash; the structure that perceives the world, holds what is
              true, and governs every claim before it compounds.
            </p>
          </div>

        </div>
      </section>

      <section className="content-section" id="physics">
        <div className="container">
          <p className="section-label reveal">III. Physics</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Optimizing v.s. world models.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              AI lives on a sphere of learned meaning, stretched by tools and retrieval into
              an amorphous shape, but still reaching no farther than one unit from the
              center.
            </p>
            <p>
              Reality is not a sphere. It has corners where events, identities, and
              commitments live, all sitting farther from the center than any sphere or
              amorphous extension of it can reach, and an AI built on the sphere must
              hallucinate no matter how large it grows.
            </p>
            <p>
              Solomon operates on a different geometry situated beneath the AI, a world
              model &mdash; a structured map of reality that grows to a fuller reflection
              of reality with every cycle. Truth lives in this world model, the AI
              articulates it, and the result is an AI structurally incapable of confident
              fiction.
            </p>
          </div>

          <div className="section-figure section-figure--wide reveal reveal-delay-3">
            <GeometryOfTruth />
            <p className="figure-caption">
              Fig. 2 &mdash; The geometry of truth
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" id="reality">
        <div className="container">
          <p className="section-label reveal">IV. Reality</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Brain, nerves, and body.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Our brain is a structure that uses AI. Our system holds a world model and builds
              the physics under which it may act in reality.
            </p>
            <p>
              A structured foundation where generation can exist, because the nerves bridge it
              to the truth.
            </p>
            <p>
              Allowing it also to act in a governed way, executing with control.
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


      <section className="content-section" id="adaptive-loop">
        <div className="container">
          <p className="section-label reveal">V. Adaptive Loop</p>
          <h2 className="section-headline reveal reveal-delay-1">
            Recursive exponential compounding.
          </h2>
          <div className="section-body reveal reveal-delay-2">
            <p>
              Solomon adapts and recursively learns by closing the loop between itself and
              reality. Each cycle teaches the next, and each cycle inherits only what was
              true.
            </p>
            <p>
              Compounding of truth and verified information makes the system sustainable
              and incapable of the same collapses as other AIs.
            </p>
            <p>
              Truth accumulates in the substrate. Pattern richness deepens, routing
              precision sharpens, reasoning capacity grows, and contextual intelligence
              gets exponentially stronger with every cycle it runs.
            </p>
          </div>

          <div className="equation-aside reveal reveal-delay-3">
            <p className="equation">
              S(n+1) = S(n) + &Sigma;<sub>i</sub> G<sub>i</sub> &middot; &Delta;Bayes<sub>i</sub>(S(n), E<sub>i</sub>)
            </p>
            <p className="equation-caption">
              Fig. 4 &mdash; Every piece of evidence that enters Solomon must pass governance. What passes, compounds. The system at any point in time is the sum of everything that has ever been verified &mdash; and it only grows.
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
          <div className="cta-refs reveal reveal-delay-2">
            <a href="/references" target="_blank" rel="noopener">
              References
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
        >
          <span className="footer-left">Solomon &middot; 2026 &middot; Helsinki, Finland</span>
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
          </span>
        </div>
      </footer>
    </>
  );
}
