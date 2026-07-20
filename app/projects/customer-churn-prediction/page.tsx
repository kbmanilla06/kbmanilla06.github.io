import type { Metadata } from "next";
import Image from "next/image";
import WdlButton from "@/components/ui/WdlButton";
import WdlPanel from "@/components/ui/WdlPanel";
import WdlCard from "@/components/ui/WdlCard";
import { PROJECTS } from "@/lib/content/projects";

const PROJECT = PROJECTS.find((project) => project.slug === "customer-churn-prediction")!;

export const metadata: Metadata = {
  title: "Customer Churn ML Case Study",
  description: "Reproducible model evaluation, leakage controls, limitations, and product decisions behind a telecom churn classifier.",
};

const METRICS = [
  { value: "5,000", label: "synthetic customers" },
  { value: "21.8%", label: "positive class" },
  { value: "0.557", label: "held-out F1" },
  { value: "0.807", label: "held-out ROC-AUC" },
] as const;

const MODELS = [
  { name: "Logistic Regression", precision: "0.430", recall: "0.734", f1: "0.542", auc: "0.820" },
  { name: "Random Forest", precision: "0.520", recall: "0.601", f1: "0.557", auc: "0.807" },
  { name: "XGBoost", precision: "0.559", recall: "0.372", f1: "0.446", auc: "0.784" },
] as const;

const GALLERY = [
  {
    src: "/pictures/churn-overview.png",
    alt: "Churn dashboard overview with class and contract cohort charts",
    title: "Cohort overview",
    caption: "Class balance, tenure, contract, and monthly-charge patterns make the dataset inspectable before prediction.",
  },
  {
    src: "/pictures/churn-model-comparison.png",
    alt: "Model comparison table with cross-validation and confusion matrix",
    title: "Model evaluation",
    caption: "Precision, recall, F1, ROC-AUC, five-fold results, and confusion matrices expose the tradeoffs between candidates.",
  },
  {
    src: "/pictures/churn-feature-insights.png",
    alt: "Random Forest and XGBoost feature importance charts",
    title: "Feature interpretation",
    caption: "Feature rankings are paired with retention actions, while remaining bounded by the synthetic dataset assumptions.",
  },
] as const;

const EVIDENCE = [
  { label: "Training pipeline", href: "https://github.com/kbmanilla06/customer-churn-prediction/blob/main/train.py" },
  { label: "Feature engineering", href: "https://github.com/kbmanilla06/customer-churn-prediction/blob/main/utils/preprocessing.py" },
  { label: "Synthetic data generator", href: "https://github.com/kbmanilla06/customer-churn-prediction/blob/main/generate_data.py" },
  { label: "Streamlit dashboard", href: "https://github.com/kbmanilla06/customer-churn-prediction/blob/main/app.py" },
] as const;

export default function ChurnCaseStudyPage() {
  return (
    <article className="case-study mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <header className="case-study-hero">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--wdl-text-muted)]">Applied ML Case Study · Reproduced July 2026</p>
        <h1 className="mt-4 text-4xl leading-tight text-[var(--wdl-text-primary)] sm:text-5xl">Customer Churn Prediction</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--wdl-text-primary)]">
          A reproducible classification pipeline that prioritizes churn recall, prevents oversampling leakage, and makes model tradeoffs visible in a dashboard.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--wdl-text-secondary)]">{PROJECT.summary}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <WdlButton href={PROJECT.repoUrl} external variant="accent" >Review Repository</WdlButton>
          <WdlButton href="/#quests" >Back to Projects</WdlButton>
        </div>
      </header>

      <section className="case-study-metrics" aria-label="Reproduced model evidence">
        {METRICS.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
      </section>

      <section className="case-study-section grid gap-6 lg:grid-cols-2">
        <WdlPanel>
          <p className="case-study-label">Problem</p>
          <h2>Find likely churners without hiding the cost tradeoff.</h2>
          <p>
            Churn is an imbalanced classification problem: missing an at-risk customer can be more costly than contacting a customer who would have stayed. The pipeline therefore reports precision and recall alongside F1 and ROC-AUC instead of relying on accuracy.
          </p>
        </WdlPanel>
        <WdlPanel>
          <p className="case-study-label">My Contribution</p>
          <h2>Data generation through interactive delivery.</h2>
          <p>
            I implemented the synthetic data generator, feature engineering, preprocessing, cross-validation, three model candidates, persisted artifacts, and four-page Streamlit dashboard as an individual project.
          </p>
        </WdlPanel>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Evaluation</p>
        <h2>Reproduced results on the fixed random seed</h2>
        <p>
          A stratified 80/20 split produced 4,000 training and 1,000 held-out records. Random Forest had the strongest held-out F1; Logistic Regression recovered more churners and achieved the strongest ROC-AUC, showing that deployment choice should depend on retention capacity and error cost.
        </p>
        <div className="case-study-table-wrap">
          <table>
            <caption className="sr-only">Held-out model comparison</caption>
            <thead><tr><th>Model</th><th>Precision</th><th>Recall</th><th>F1</th><th>ROC-AUC</th></tr></thead>
            <tbody>{MODELS.map((model) => <tr key={model.name}><th scope="row">{model.name}</th><td>{model.precision}</td><td>{model.recall}</td><td>{model.f1}</td><td>{model.auc}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Pipeline</p>
        <h2>Leakage-aware preprocessing and evaluation</h2>
        <div className="architecture-flow" role="img" aria-label="Synthetic telecom data flows through a stratified split, fold-local preprocessing and SMOTE, model comparison, and Streamlit dashboard">
          <div><span>Data</span><strong>5,000 records</strong><small>Fixed seed · engineered churn drivers</small></div>
          <i aria-hidden="true">→</i>
          <div><span>Training</span><strong>Fold-local SMOTE</strong><small>Scaling · encoding · stratified CV</small></div>
          <i aria-hidden="true">→</i>
          <div><span>Delivery</span><strong>3 models + dashboard</strong><small>Metrics · prediction · feature insights</small></div>
        </div>
        <p className="case-study-note">SMOTE is inside the imbalanced-learn cross-validation pipeline, so synthetic samples never cross from a training fold into its validation fold.</p>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Working Product</p>
        <h2>Dataset, model, and feature evidence in one interface</h2>
        <div className="case-study-gallery case-study-gallery-three">
          {GALLERY.map((item) => (
            <figure key={item.src}>
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--wdl-surface-base)]">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study-section grid gap-6 lg:grid-cols-2">
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">What the result supports</p>
          <h2>A learning and decision-support prototype</h2>
          <p>The project demonstrates an end-to-end ML workflow, class-imbalance handling, reproducibility, metric interpretation, and an interface for exploring model behavior.</p>
        </WdlCard>
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">What it does not prove</p>
          <h2>No production claim from synthetic data</h2>
          <p>The labels come from programmed churn drivers, so the scores do not establish performance on real customers. Fairness, calibration, drift, privacy, and business-cost validation require real governed data.</p>
        </WdlCard>
      </section>

      <section className="case-study-section">
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">Methodology Limitations</p>
          <h2>Three concrete improvements before stronger claims</h2>
          <ul className="evidence-bullet-list mt-5">
            <li>The script chooses the winning model using held-out F1. A validation split or nested cross-validation should select the model before one untouched final test evaluation.</li>
            <li>The dashboard uses a newer table-width API than the pinned Streamlit version on one page. Aligning the dependency and API is the next compatibility fix.</li>
            <li>Threshold tuning should use an explicit retention-cost function rather than the default 0.5 cutoff.</li>
          </ul>
        </WdlCard>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Verification</p>
        <h2>Inspect the pipeline directly</h2>
        <div className="case-study-link-grid">
          {EVIDENCE.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}
        </div>
      </section>
    </article>
  );
}
