"use client";

import { useState, FormEvent } from "react";

/**
 * Compact newsletter signup for sidebars/rails — a smaller companion to
 * components/Newsletter.tsx (which is the full-width dark band).
 */
export default function NewsletterSidebar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    // TODO: replace with a real subscribe API call.
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="border border-neutral-200 bg-neutral-50 p-5">
      <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
        Newsletter
      </span>
      <h3 className="mt-1 text-[16px] font-black leading-snug text-neutral-900">
        Get headlines in your inbox
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-snug text-neutral-500">
        One email a day. No spam, unsubscribe any time.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-3 flex flex-col gap-2">
        <label htmlFor="sidebar-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="sidebar-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="w-full rounded bg-brand px-3 py-2 text-[13px] font-bold text-white transition hover:opacity-90"
        >
          Subscribe
        </button>
      </form>

      <div aria-live="polite" className="mt-2 min-h-[1rem] text-[12px]">
        {status === "success" && (
          <span className="text-green-700">Check your inbox to confirm.</span>
        )}
        {status === "error" && (
          <span className="text-red-600">Enter a valid email address.</span>
        )}
      </div>
    </div>
  );
}