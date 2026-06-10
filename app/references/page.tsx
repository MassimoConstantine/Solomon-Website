import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "References — Solomon",
  description:
    "Primary literature grounding the Solomon architecture: the data processing inequality, Landauer's principle, Goodhart's law, hallucination lower bounds, the geometry of superposition, and empirical evidence of synthetic collapse.",
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
            ungoverned generation is released at scale. Beneath all of it sit the named
            theorems the architecture borrows rather than asserts &mdash; Shannon&rsquo;s
            measure of information, the data processing inequality, Landauer&rsquo;s
            principle, Goodhart&rsquo;s law &mdash; results a reader can go check.
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

            <li>
              <p>
                <strong>Alemohammad, S. et al.</strong> (2024).{" "}
                <em>Self-Consuming Generative Models Go MAD.</em> ICLR 2024.
              </p>
              <p className="ref-note">
                Names the self-feeding loop <em>autophagy</em> and the resulting failure
                Model Autophagy Disorder (MAD): when generative models train on their own
                synthetic output across generations without enough fresh real data, both
                the quality and the diversity of what they produce progressively decay. The
                companion mechanism to model collapse &mdash; what happens when the
                substrate begins to consume itself.
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2307.01850" target="_blank" rel="noopener">
                  arxiv.org/abs/2307.01850
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Formal principles</h2>
          <ol className="references-page-list" start={6}>
            <li>
              <p>
                <strong>Shannon, C. E.</strong> (1948).{" "}
                <em>A Mathematical Theory of Communication.</em> Bell System
                Technical Journal, 27, 379&ndash;423, 623&ndash;656.
              </p>
              <p className="ref-note">
                Founds information theory and defines mutual information{" "}
                I(X;Y), the measure every equation on the manifesto is written
                in. What a model knows about reality is exactly the mutual
                information between them; growing truer means raising it.
                Information becomes a measurable, conserved quantity rather
                than a figure of speech.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1002/j.1538-7305.1948.tb01338.x" target="_blank" rel="noopener">
                  doi.org/10.1002/j.1538-7305.1948.tb01338.x
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Cover, T. M. &amp; Thomas, J. A.</strong> (2006).{" "}
                <em>Elements of Information Theory</em> (2nd ed.), &sect;2.8:
                the data processing inequality. Wiley.
              </p>
              <p className="ref-note">
                For any Markov chain X &rarr; Y &rarr; Z, I(X;Z) &le; I(X;Y):
                no function of the data can increase its information about the
                source. The manifesto&rsquo;s central equation is this theorem
                applied to a model that updates from itself &mdash;
                R &rarr; M<sub>t</sub> &rarr; M<sub>t+1</sub> ={" "}
                f(M<sub>t</sub>), so I(M<sub>t+1</sub>;R) &le;{" "}
                I(M<sub>t</sub>;R). Self-generation cannot add information about
                reality; only new observation can. The named result a skeptic
                has to go check.
              </p>
            </li>

            <li>
              <p>
                <strong>Landauer, R.</strong> (1961).{" "}
                <em>
                  Irreversibility and Heat Generation in the Computing Process.
                </em>{" "}
                IBM Journal of Research and Development, 5(3), 183&ndash;191.
              </p>
              <p className="ref-note">
                Erasing one bit of information has a hard thermodynamic floor:
                it must dissipate at least kT&nbsp;ln&nbsp;2 of energy as heat.
                Information is physical, and discarding it is never free. The
                formal basis for the claim that a world model pays in the death
                of information and carries metabolic weight for every belief it
                keeps.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1147/rd.53.0183" target="_blank" rel="noopener">
                  doi.org/10.1147/rd.53.0183
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Schr&ouml;dinger, E.</strong> (1944).{" "}
                <em>What is Life?</em> Cambridge University Press.
              </p>
              <p className="ref-note">
                A system holds off decay to equilibrium only by continually
                drawing order &mdash; negative entropy &mdash; from its
                environment. Sever that exchange and the second law carries it
                to heat death. The thermodynamic statement of why a model must
                feed on reality to stay ordered, and why a closed system
                feeding on its own output can only rot.
              </p>
            </li>

            <li>
              <p>
                <strong>Goodhart, C. A. E.</strong> (1975); popularized by{" "}
                <strong>Strathern, M.</strong> (1997).{" "}
                <em>
                  When a measure becomes a target, it ceases to be a good
                  measure.
                </em>
              </p>
              <p className="ref-note">
                Optimizing a proxy corrupts the proxy: pressure on a metric
                pulls it away from the thing it was meant to track. Optimizing
                against any KPI that is not reality itself therefore diverges
                from reality by construction &mdash; the measurement-theory
                statement of the manifesto&rsquo;s physics of optimization.
              </p>
            </li>

            <li>
              <p>
                <strong>Carter, B.</strong> (1974);{" "}
                <strong>Barrow, J. D. &amp; Tipler, F. J.</strong> (1986).{" "}
                <em>The Anthropic Cosmological Principle.</em> Oxford University
                Press.
              </p>
              <p className="ref-note">
                We observe a universe compatible with our existence because
                universes incompatible with it contain no observers to do the
                observing. The constants are not free parameters; the ones that
                permit observers are the only ones an observer can ever find.
              </p>
              <p className="ref-note">
                <em>The stronger reading.</em> The manifesto takes this past
                observer-selection: the structure of reality is precisely what
                it is because that exact structure is what lets the totality of
                existence unfold &mdash; not merely that if it were different we
                would not be here, but that the order is load-bearing for
                existence as such. A system aligned to that order persists; one
                that drifts from it is selected out.
              </p>
            </li>
          </ol>

          <h2 className="ref-group">What a language model is</h2>
          <ol className="references-page-list" start={12}>
            <li>
              <p>
                <strong>
                  Bender, E. M., Gebru, T., McMillan-Major, A. &amp; Shmitchell, S.
                </strong>{" "}
                (2021).{" "}
                <em>
                  On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?
                </em>{" "}
                FAccT &rsquo;21, 610&ndash;623.
              </p>
              <p className="ref-note">
                The original statement that a language model is a stochastic parrot: it
                stitches together statistically likely sequences of text without reference
                to meaning, and the human tendency to read meaning into that output is
                itself a hazard. The canonical academic source for mimicry without
                understanding.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1145/3442188.3445922" target="_blank" rel="noopener">
                  doi.org/10.1145/3442188.3445922
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">The single-neuron complexity gap</h2>
          <ol className="references-page-list" start={13}>
            <li>
              <p>
                <strong>
                  Gidon, A., Zolnik, T. A., Fidzinski, P., Bolduan, F., Papoutsi, A.,
                  Poirazi, P., Holtkamp, M., Vida, I. &amp; Larkum, M. E.
                </strong>{" "}
                (2020).{" "}
                <em>
                  Dendritic Action Potentials and Computation in Human Layer 2/3 Cortical
                  Neurons.
                </em>{" "}
                Science, 367(6473), 83&ndash;87.
              </p>
              <p className="ref-note">
                Patch-clamp recordings of human cortical neurons reveal a new class of
                dendritic calcium spikes that let a single neuron compute XOR, a linearly
                non-separable function long held to require a multilayer network. The
                biological unit is not the 1943 summator the perceptron models.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1126/science.aax6239" target="_blank" rel="noopener">
                  doi.org/10.1126/science.aax6239
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Beniaguev, D., Segev, I. &amp; London, M.</strong> (2021).{" "}
                <em>Single Cortical Neurons as Deep Artificial Neural Networks.</em> Neuron,
                109(17), 2727&ndash;2739.e3.
              </p>
              <p className="ref-note">
                Replicating the input-output behavior of one cortical pyramidal neuron
                required a deep network of five to eight layers. A single biological neuron
                is already a deep network. The &ldquo;AI is basically a brain&rdquo; analogy
                fails at the level of the single cell, before any question of scale.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1016/j.neuron.2021.07.002" target="_blank" rel="noopener">
                  doi.org/10.1016/j.neuron.2021.07.002
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Architectural foundation</h2>
          <ol className="references-page-list" start={15}>
            <li>
              <p>
                <strong>LeCun, Y.</strong> (2022).{" "}
                <em>A Path Towards Autonomous Machine Intelligence.</em> OpenReview.
              </p>
              <p className="ref-note">
                A position paper by a Turing-award laureate arguing that the autoregressive
                generator should not be the controller. Proposes a configurable predictive
                world model with planning and intrinsic motivation, sitting around
                generation rather than beneath it. The centerpiece architecture, JEPA, is
                explicitly non-generative: it captures dependencies without emitting
                predictions. The frontier-credentialed version of the same move &mdash; take
                the predictor out of the driver&rsquo;s seat.
              </p>
              <p className="ref-link">
                <a href="https://openreview.net/pdf?id=BZ5a1r-kVsf" target="_blank" rel="noopener">
                  openreview.net/pdf?id=BZ5a1r-kVsf
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Friston, K.</strong> (2010).{" "}
                <em>The Free-Energy Principle: A Unified Brain Theory?</em> Nature Reviews
                Neuroscience. With{" "}
                <strong>Parr, T., Pezzulo, G. &amp; Friston, K.</strong> (2022).{" "}
                <em>Active Inference.</em> MIT Press.
              </p>
              <p className="ref-note">
                A perception-action system maintains itself by minimizing prediction error
                against a generative model of the world, and it does so by acting on the
                world, not by emitting text. The positive theory of an agent bound to
                reality through a closed feedback loop &mdash; the structural inverse of
                open-loop generation, and the formal backbone under the FEP mapping.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1038/nrn2787" target="_blank" rel="noopener">
                  doi.org/10.1038/nrn2787
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Harnad, S.</strong> (1990).{" "}
                <em>The Symbol Grounding Problem.</em> Physica D.
              </p>
              <p className="ref-note">
                Symbols manipulated only by reference to other symbols never acquire
                meaning; the meaning has to be grounded in something outside the symbol
                system. Establishes at the foundations why a model trained on text alone
                holds no world it can be right or wrong about. Symbols pointing at symbols,
                never at reality.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1016/0167-2789(90)90087-6" target="_blank" rel="noopener">
                  doi.org/10.1016/0167-2789(90)90087-6
                </a>
              </p>
            </li>

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

          <h2 className="ref-group">Hallucination in practice</h2>
          <ol className="references-page-list" start={19}>
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

            <li>
              <p>
                <strong>Farquhar, S., Kossen, J., Kuhn, L. &amp; Gal, Y.</strong> (2024).{" "}
                <em>
                  Detecting Hallucinations in Large Language Models Using Semantic Entropy.
                </em>{" "}
                Nature, 630, 625&ndash;630.
              </p>
              <p className="ref-note">
                Hallucination is intrinsic enough that detecting it requires a dedicated
                statistical apparatus measuring uncertainty over meaning rather than over
                words. The authors prefer the sharper term <em>confabulation</em>: output
                that is arbitrary and wrong while sounding plausible. The model needs an
                external instrument to flag what it cannot flag for itself.
              </p>
              <p className="ref-link">
                <a href="https://doi.org/10.1038/s41586-024-07421-0" target="_blank" rel="noopener">
                  doi.org/10.1038/s41586-024-07421-0
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Synthetic content on the web</h2>
          <ol className="references-page-list" start={23}>
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
          <ol className="references-page-list" start={29}>
            <li>
              <p>
                <strong>Microsoft Q3 2025 Earnings</strong> (Satya Nadella). Azure AI
                processed over 100 trillion tokens, up 5&times; year-over-year.
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Counter-evidence, cited and answered</h2>
          <ol className="references-page-list" start={30}>
            <li>
              <p>
                <strong>
                  Gerstgrasser, M., Schaeffer, R., Dey, A., Rafailov, R., et al.
                </strong>{" "}
                (2024).{" "}
                <em>
                  Is Model Collapse Inevitable? Breaking the Curse of Recursion by
                  Accumulating Real and Synthetic Data.
                </em>{" "}
                arXiv:2404.01413.
              </p>
              <p className="ref-note">
                The strongest objection to the collapse thesis. Confirms that replacing real
                data with synthetic data drives collapse, then shows that accumulating
                synthetic data alongside the original real data avoids it. Included
                deliberately: the argument that means to leave no valid objection has to cite
                its own strongest objection and answer it.
              </p>
              <p className="ref-note">
                <em>How to argue against this.</em> The result holds only in a setting where
                pristine real data is preserved and keeps entering in fixed proportion
                &mdash; precisely the condition the thesis names, not a refutation of it. On
                the actual web the synthetic fraction is rising and provenance is not
                recoverable, so the clean real anchor the proof depends on cannot be
                isolated, which collapses the accumulate case back into the replace case.
                Read correctly, Gerstgrasser states the survival inequality rather than
                breaking it: collapse is avoided only while reality-anchored data the model
                did not generate enters faster than fidelity leaks out. Producing that data
                is the binding constraint &mdash; the business, not the rebuttal.
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2404.01413" target="_blank" rel="noopener">
                  arxiv.org/abs/2404.01413
                </a>
              </p>
            </li>

            <li>
              <p>
                <strong>Shojaee, P., et al.</strong> (2025).{" "}
                <em>
                  The Illusion of Thinking: Understanding the Strengths and Limitations of
                  Reasoning Models via the Lens of Problem Complexity.
                </em>{" "}
                Apple Machine Learning Research.
              </p>
              <p className="ref-note">
                Reasoning models collapse to near-zero accuracy past a complexity threshold
                and fail even when handed the solving algorithm, suggesting pattern
                completion rather than execution.
              </p>
              <p className="ref-note">
                <em>Use with caution.</em> A published rebuttal (Lawsen, 2025,
                arXiv:2506.09250) argues the collapse was partly an artifact of output-token
                limits and of test instances that were unsolvable by construction. Strong as
                a pointer, weak as a load-bearing premise; if used at all, cite the rebuttal
                in the same breath.
              </p>
              <p className="ref-link">
                <a
                  href="https://machinelearning.apple.com/research/illusion-of-thinking"
                  target="_blank"
                  rel="noopener"
                >
                  machinelearning.apple.com/research/illusion-of-thinking
                </a>
              </p>
              <p className="ref-link">
                <a href="https://arxiv.org/abs/2506.09250" target="_blank" rel="noopener">
                  arxiv.org/abs/2506.09250 &mdash; Lawsen rebuttal
                </a>
              </p>
            </li>
          </ol>

          <h2 className="ref-group">Cultural antecedents</h2>
          <ol className="references-page-list" start={32}>
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
