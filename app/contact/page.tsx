import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AlignAI by ByteStream Strategies to discuss enterprise AI governance and strategic advisory.",
};

export default function ContactPage() {
  return (
    <section className="flex min-h-screen items-center bg-navy pt-16">
      <div className="container-main py-20 text-center">
        <h1 className="text-4xl text-white md:text-5xl">Start a conversation.</h1>
        <p className="mx-auto mt-6 max-w-prose text-lg text-light-slate">
          No forms, no demos, no sales calls. A direct conversation about
          whether there is a fit.
        </p>
        <a
          href="mailto:bburke@bytestream.ca"
          className="mt-12 inline-block text-2xl font-medium text-cyan transition-colors hover:text-white md:text-3xl"
        >
          bburke@bytestream.ca
        </a>
        <div className="mt-6">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-light-slate hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
