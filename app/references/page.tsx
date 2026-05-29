import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "References — Solomon",
  description:
    "Primary literature grounding the Solomon architecture: hallucination lower bounds, calibrated language models, the geometry of superposition, and empirical evidence of synthetic collapse.",
  robots: { index: true, follow: true },
};

export default function References() {
  return (
    <section className="content-section" id="references-page">
      <div className="container">
        <p className="section-label">References</p>
        <h1 className="section-headline" style={{ marginBottom: "2.5rem" }}>
          Primary literature.
        </h1>

        <div className="section-body">
          <p style={{ marginBottom: "2.5rem" }}>
            The Solomon architecture is built on the following findings. The hallucination
            lower bound is not a bug to be engineered away &mdash; it is a theorem about
            calibrated generation. The geometry of superposition explains why internal
            representations overlap by design. The empirical record shows what happens when
            ungoverned generation is released at scale.
          </p>

          <h2 className="ref-group">Theoretical foundation</h2>
          <ol className="references-page-list">
            <li>
              <p>
                <strong>Kalai, A. T. &amp; Vempala, S. S.</strong> (2024).{" "}
                <em>Calibrated Language Models Must Hallucinate.</em> STOC 2024.
              </p>
              <p className="ref-note">
                Proves that any language model satisfying basic statistical calibration
                must hallucinate at a minimum rate &mdash; independent of architecture or
                data quality. If the maximum probability of any fact is bounded, the
                probability of generating a hallucination is close to the fraction of
                facts that occur exactly once in training. The lower bound holds no matter
                how large the model.
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2311.14648" target="_blank" rel="noopener">
                  arxiv.org/abs/2311.14648
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Kalai, A. T., Nachum, O., Vempala, S. S. &amp; Zhang, E.</strong>{" "}
                (2025). <em>Why Language Models Hallucinate.</em> OpenAI.
              </p>
              <p className="ref-note">
                Extends the 2024 result. Calibrated language models must hallucinate at a
                rate tied to the prevalence of rare facts in training data, with a
                statistical lower bound. Same core finding: structural, not incidental.
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2509.04664" target="_blank" rel="noopener">
                  arxiv.org/abs/2509.04664
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Elhage, N. et al.</strong> (2022).{" "}
                <em>Toy Models of Superposition.</em> Anthropic &amp; Harvard.
              </p>
              <p className="ref-note">
                Investigates how and when models represent more features than they have
                dimensions &mdash; the phenomenon of superposition &mdash; and demonstrates a
                connection to the geometry of uniform polytopes. The geometric argument
                for why AI representations are continuous and overlapping by design.
              </p>
              <p className="ref-link">
                <a
                  href="https://transformer-circuits.pub/2022/toy_model/index.html"
                  target="_blank"
                  rel="noopener"
                >
                  transformer-circuits.pub/2022/toy_model
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Shumailov, I. et al.</strong> (2024).{" "}
                <em>The Curse of Recursion: Training on Generated Data Makes Models Forget.</em>{" "}
                Nature.
              </p>
              <p className="ref-note">
                Demonstrates model collapse: when generative models train on outputs from
                prior generations, distributions degenerate and tails of the original
                distribution disappear. The mathematical basis for why synthetic data
                propagation hollows the substrate.
              </p>
              <p className="ref-link">
                <a href="https://www.nature.com/articles/s41586-024-07566-y" target="_blank" rel="noopener">
                  nature.com/articles/s41586-024-07566-y
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Architectural foundation</h2>
          <ol className="references-page-list" start={5}>
            <li>
              <p>
                <strong>Hawkins, J. &amp; Numenta</strong>.{" "}
                <em>The Thousand Brains Project.</em>
              </p>
              <p className="ref-note">
                An open-source effort implementing the Thousand Brains Theory of
                Intelligence: the neocortex learns through thousands of cortical columns,
                each building structured models of the world in reference frames and voting
                toward consensus. A neuroscience-grounded case that intelligence rests on
                many sensorimotor models of the world rather than a single monolithic
                predictor &mdash; an antecedent for situating generation beneath a
                structured world model.
              </p>
              <p className="ref-link">
                <a href="https://thousandbrains.org/" target="_blank" rel="noopener">
                  thousandbrains.org
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Hallucination rates in practice</h2>
          <ol className="references-page-list" start={6}>
            <li>
              <p>
                <strong>Vectara HHEM Leaderboard</strong> (2022&ndash;2026).{" "}
                <em>Hughes Hallucination Evaluation Model.</em>
              </p>
              <p className="ref-note">
                Ongoing benchmark of hallucination rates on grounded summarization across
                frontier and open-weight models. Even the best models hallucinate on a
                non-trivial fraction of summaries of source documents they were given.
              </p>
              <p className="ref-link">
                <a
                  href="https://github.com/vectara/hallucination-leaderboard"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/vectara/hallucination-leaderboard
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Stanford RegLab and Stanford HAI</strong>. Hallucination rates on
                legal queries, 69&ndash;88% range across major LLMs.
              </p>
              <p className="ref-link">
                <a
                  href="https://hai.stanford.edu/news/hallucinating-law-legal-mistakes-large-language-models-are-pervasive"
                  target="_blank"
                  rel="noopener"
                >
                  hai.stanford.edu &mdash; Hallucinating Law
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Mount Sinai Icahn School of Medicine</strong> (2025).
                Hallucination rates across six LLMs on clinical case summaries, 53&ndash;83% range.
                Nature.
              </p>
              <p className="ref-link">
                <a
                  href="https://www.mountsinai.org/about/newsroom/2025"
                  target="_blank"
                  rel="noopener"
                >
                  mountsinai.org/about/newsroom
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Synthetic content on the web</h2>
          <ol className="references-page-list" start={9}>
            <li>
              <p>
                <strong>Graphite</strong>. <em>AI Content Study.</em> Analysis of 65,000
                URLs from Common Crawl, 2020&ndash;2025. 50.3% AI-generated as of November
                2024.
              </p>
              <p className="ref-link">
                <a href="https://graphite.io/five-percent/ai-content-study" target="_blank" rel="noopener">
                  graphite.io &mdash; AI Content Study
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Ahrefs</strong> (April 2025). Analysis of approximately one
                million new web pages. 74.2% contain detectable AI-generated content.
              </p>
              <p className="ref-link">
                <a href="https://ahrefs.com/blog/" target="_blank" rel="noopener">
                  ahrefs.com/blog
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Spennemann, D. H. R.</strong> (2025).{" "}
                <em>Delving into: The Quantification of AI-Generated Content on the
                Internet (Synthetic Data).</em>
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2504.08755" target="_blank" rel="noopener">
                  arxiv.org/abs/2504.08755
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Liang, W. et al.</strong> (2025).{" "}
                <em>Mapping the Increasing Use of LLMs in Scientific Papers.</em> Nature
                Human Behaviour.
              </p>
            </li>

            <li>
              <p>
                <strong>Kobak, D. et al.</strong> (2025).{" "}
                <em>Estimated Frequency of AI-Modified Abstracts in Biomedical Research.</em>{" "}
                Science Advances. Range: 13.5&ndash;40%.
              </p>
            </li>

            <li>
              <p>
                <strong>Kusumegi, K. et al.</strong> (2025).{" "}
                <em>Scientific Production in the Era of Large Language Models.</em>{" "}
                Science.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1126/science.adw3000" target="_blank" rel="noopener">
                  doi.org/10.1126/science.adw3000
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Scale of generation</h2>
          <ol className="references-page-list" start={15}>
            <li>
              <p>
                <strong>Microsoft Q3 2025 Earnings</strong> (Satya Nadella). Azure AI
                processed over 100 trillion tokens, up 5&times; year-over-year.
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Cultural antecedents</h2>
          <ol className="references-page-list" start={16}>
            <li>
              <p>
                <strong>Borges, J. L.</strong> (1940).{" "}
                <em>Tl&ouml;n, Uqbar, Orbis Tertius.</em>
              </p>
              <p className="ref-note">
                The fictional encyclopedia whose invented world overwrites the real one as
                its descriptions propagate. A literary precedent for substrate capture.
              </p>
            </li>

            <li>
              <p>
                <strong>Chiang, T.</strong> (2023).{" "}
                <em>ChatGPT Is a Blurry JPEG of the Web.</em> The New Yorker.
              </p>
              <p className="ref-link">
                <a
                  href="https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web"
                  target="_blank"
                  rel="noopener"
                >
                  newyorker.com &mdash; Blurry JPEG of the Web
                </a>
              </p>
            </li>
          </ol>

          <p style={{ marginTop: "3rem" }}>
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
