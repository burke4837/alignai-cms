"use client";

import React, { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-32 h-32 border-4 border-blue-500/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute w-14 h-14 border-4 border-blue-400 rounded-full border-b-transparent animate-[spin_2s_ease-in-out_infinite_reverse]" />
        <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2 font-sans">
          AlignAI<span className="text-blue-600">.</span>
        </h2>
        <div className="flex items-center justify-center gap-1 min-w-[100px]">
          <span className="text-sm font-medium text-slate-500 font-sans tracking-wide uppercase">
            Loading Experience
          </span>
          <div className="flex items-center gap-1 ml-2">
            <span className="w-1.5 h-1.5 bg-blue-600/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-1.5 h-1.5 bg-blue-600/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-1.5 h-1.5 bg-blue-600/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
