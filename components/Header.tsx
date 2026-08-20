"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllCategories, categorySlug } from "@/lib/data";

const today = new Date().toLocaleDateString("en-AU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      {/* utility bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[13px] text-neutral-500 sm:px-6">
        <button
          aria-label="Open menu"
          className="flex items-center gap-1 font-semibold text-neutral-700 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path
              d="M0 1h18M0 7h18M0 13h18"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
        <span className="hidden sm:inline">{today}</span>
        <Link
          href="/"
          className="text-[22px] font-black tracking-tight text-neutral-900"
        >
          THE <span className="text-brand">BRIEFING</span>
        </Link>
        <form
          action="/search"
          className="hidden items-center overflow-hidden rounded border border-neutral-300 sm:flex"
        >
          <input
            name="q"
            placeholder="Search"
            className="w-40 px-3 py-1.5 text-[13px] outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-neutral-900 px-3 py-1.5 text-white"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <circle
                cx="9"
                cy="9"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* main nav */}
      <nav className="hidden border-t border-neutral-100 bg-neutral-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2.5 text-[13px] font-semibold text-neutral-700">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/${categorySlug(c)}`}
              className="hover:text-brand"
            >
              {c}
            </Link>
          ))}
        </div>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="flex flex-col px-4 py-2 text-[14px] font-semibold text-neutral-700">
            <Link
              href="/"
              className="border-b border-neutral-100 py-2.5"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/${categorySlug(c)}`}
                className="border-b border-neutral-100 py-2.5 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
