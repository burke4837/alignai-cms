"use client";

import Image from "next/image";
import { useState } from "react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="rounded-[8px] border border-[rgba(99,188,231,0.22)] bg-[rgba(18,44,79,0.92)] p-8 py-12">
        <div className="mb-5 flex justify-center">
          <span className="rounded-btn border border-[rgba(99,188,231,0.25)] bg-[rgba(38,71,112,0.55)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan">
            • Invitation Only
          </span>
        </div>

        <div className="text-center">
          <Image src="/brand/logo-bg-black.png" alt="AlignAI Logo" className="mx-auto" width={150} height={150} />
          <h2 className="mt-6 font-heading text-2xl font-semibold text-white">
            Client &amp; Partner Access
          </h2>
          <p className="mx-auto mt-2 max-w-[290px] text-sm leading-relaxed text-light-slate">
            Secure access to your AlignAI workspace, reports, and resources.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-light-slate"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-btn border border-deep-blue bg-[rgba(11,32,63,0.9)] px-4 py-2.5 text-sm text-white outline-none focus:border-mid-blue focus:ring-1 focus:ring-mid-blue"
              placeholder="you@organization.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-light-slate"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-btn border border-deep-blue bg-[rgba(11,32,63,0.9)] px-4 py-2.5 text-sm text-white outline-none focus:border-mid-blue focus:ring-1 focus:ring-mid-blue"
              placeholder="**********"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-btn bg-mid-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep-blue"
          >
            Sign In →
          </button>
        </form>

        <p className="mt-5 text-center text-xs leading-relaxed text-light-slate">
          Access is by invitation only
          <br />
          To request access, contact bburke@bytestream.ca
        </p>
      </div>
    </div>
  );
}
