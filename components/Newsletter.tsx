"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
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
    <section className="border-y border-rule">
      <div className="container-page py-10 sm:py-12 lg:py-14">
        <div className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white shadow-2xl shadow-black/40">

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
          />

          {/* Decorative editorial line */}
          <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-brand via-brand/60 to-transparent" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Editorial copy */}
            <div className="px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                  The Daily Brief
                </span>
                <span className="ml-auto rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Premium
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl font-serif text-[30px] font-black leading-[1.05] tracking-tight sm:text-[38px] lg:text-[44px]">
                The stories that matter,
                <br className="hidden sm:block" /> delivered every morning.
              </h2>

              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                Start your day informed. Get our most important headlines,
                essential analysis and stories worth reading delivered directly
                to your inbox.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-widest text-white/40">
                <span>Daily Edition</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Independent Coverage</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Unsubscribe Anytime</span>
              </div>
            </div>

            {/* Signup panel */}
            <div className="relative border-t border-white/10 bg-white/[0.04] px-6 py-8 backdrop-blur-sm sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
              <div className="flex h-full flex-col justify-center">

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Subscribe
                </p>

                <h3 className="mt-2 font-serif text-[22px] font-bold text-white">
                  Join the morning edition
                </h3>

                <form onSubmit={handleSubmit} noValidate className="mt-6">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <svg
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M2.5 5.5h15v9h-15zM2.5 5.5l7.5 6 7.5-6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status !== "idle") setStatus("idle");
                        }}
                        placeholder="Your email address"
                        className="w-full border border-white/20 bg-white/[0.06] py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand/70 focus:bg-white/[0.09] focus:ring-1 focus:ring-brand/40"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group shrink-0 bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-black transition-all hover:bg-white/90 active:scale-[0.98]"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        Subscribe
                        <svg
                          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6h8M6 2l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>

                <div aria-live="polite" className="mt-3 min-h-[1.25rem] text-[12px]">
                  {status === "success" && (
                    <span className="flex items-center gap-1.5 text-green-400">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8.5l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      You&apos;re subscribed — check your inbox to confirm.
                    </span>
                  )}

                  {status === "error" && (
                    <span className="text-red-400">
                      Please enter a valid email address.
                    </span>
                  )}
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-white/35">
                  By subscribing, you agree to receive emails from The Static
                  News. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}