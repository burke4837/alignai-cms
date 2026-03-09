import type { Metadata } from "next";
import { LoginCard } from "@/components/LoginCard";

export const metadata: Metadata = {
  title: "Client Access",
  description:
    "Secure client portal for AlignAI by ByteStream Strategies project access.",
};

export default function ClientAccessPage() {
  return (
    <>
      <section className="hero-panel pt-32 pb-20">
        <div className="container-main">
          <h1 className="text-center text-4xl text-white md:text-5xl">
            Client & Partner Access
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-center text-lg text-light-slate">
            Secure access to your AlignAI workspace, reports, and resources.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section className="bg-navy py-20">
        <div className="container-main">
          <LoginCard />
        </div>
      </section>
    </>
  );
}
