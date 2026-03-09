import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "AlignAI Governance Framework",
  description:
    "Governance architecture for the layer where AI actually changes enterprise behaviour.",
};

const PILLARS = [
  {
    number: "01",
    title: "Transparency & Explainability",
    description:
      "Ensure every AI-driven decision can be explained to stakeholders, regulators, and end-users in clear, non-technical terms.",
  },
  {
    number: "02",
    title: "Accountability Structures",
    description:
      "Define clear ownership, escalation paths, and responsibility matrices for AI systems across the organization.",
  },
  {
    number: "03",
    title: "Regulatory Compliance",
    description:
      "Map AI operations to current and emerging regulatory frameworks including EU AI Act, NIST AI RMF, and sector-specific requirements.",
  },
  {
    number: "04",
    title: "Risk Assessment & Management",
    description:
      "Implement systematic risk identification, scoring, and mitigation strategies tailored to AI-specific failure modes.",
  },
  {
    number: "05",
    title: "Continuous Monitoring",
    description:
      "Establish ongoing performance tracking, drift detection, and governance reporting to maintain alignment over time.",
  },
];

export default function FrameworkPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-panel pt-32 pb-20">
        <div className="container-main">
          <h1 className="max-w-4xl text-4xl text-white md:text-5xl">
            Governance architecture for the layer where AI actually changes
            enterprise behaviour.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-light-slate">
            AlignAI governs the AI Decision Influence Layer — the environment
            created by AI systems before humans make decisions.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Timeline */}
      <section className="bg-navy py-20">
        <div className="container-main">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-mid-blue" aria-hidden="true" />
            <ol className="space-y-16">
              {PILLARS.map((pillar) => (
                <li
                  key={pillar.number}
                  className="relative grid gap-6 md:grid-cols-[1fr_48px_1fr] md:items-start"
                >
                  <h3 className="text-right text-lg font-semibold text-white md:pr-8">
                    {pillar.title}
                  </h3>
                  <span
                    className="z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan bg-deep-blue font-heading text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                  <p className="max-w-prose text-sm leading-relaxed text-light-slate md:pl-8">
                    {pillar.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Conceptual Model */}
      <section className="bg-off-white py-20">
        <div className="container-main">
          <h2 className="text-center text-3xl text-navy">Conceptual Model</h2>
          <p className="mx-auto mt-4 max-w-prose text-slate">
            The AlignAI framework operates as an integrated cycle — each pillar
            reinforces the others to create a self-sustaining governance system.
          </p>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-btn border border-light-slate bg-white p-4"
                >
                  <span className="block font-heading text-sm font-bold text-mid-blue">
                    {pillar.number}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-navy">
                    {pillar.title}
                  </span>
                </div>
              ))}
            <div className="rounded-btn border border-mid-blue bg-[#dce8f5] p-4 text-center text-sm font-semibold text-deep-blue md:col-span-2">
              Continuous governance flow across all five pillars
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <CTASection />
    </>
  );
}
