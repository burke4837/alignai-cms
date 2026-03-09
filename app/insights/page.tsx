import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { CTASection } from "@/components/CTASection";
import posts from "@/data/posts.json";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and analysis on enterprise AI governance, compliance, risk management, and the AlignAI framework.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="hero-panel pt-32 pb-20">
        <div className="container-main">
          <h1 className="text-4xl text-white md:text-5xl">
            AI governance thinking. Grounded in research.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-light-slate">
            Perspectives on the governance gap, regulatory exposure, and what
            enterprise AI accountability actually requires.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section className="bg-off-white py-20">
        <div className="container-main">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                date={post.date}
                tag={post.tag}
                excerpt={post.excerpt}
                slug={post.slug}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <CTASection />
    </>
  );
}
