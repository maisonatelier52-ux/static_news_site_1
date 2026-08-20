import Link from "next/link";
import {
  Article,
  getArticleHref,
  formatDateShort,
  readTime,
} from "@/lib/data";
import ArticleImage from "./ArticleImage";

type TextColumn = {
  title: string;
  href?: string;
  articles: Article[];
};

/**
 * Four-column news summary block: an image-led "Latest News" list,
 * two text-only category columns, and a numbered "Most Read" list.
 * Designed to sit right under the home page's two-up feature row.
 */
export default function LatestNewsGrid({
  latest,
  columns,
  mostRead,
}: {
  latest: Article[];
  columns: TextColumn[];
  mostRead: Article[];
}) {
  return (
    <section className="border-b border-neutral-200 py-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Latest News */}
        <div>
          <div className="mb-4 flex items-end justify-between border-b-2 border-neutral-900 pb-2">
            <h2 className="font-serif text-[20px] font-black uppercase tracking-tight text-neutral-900">
              Latest News
            </h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {latest.map((a) => (
              <Link
                key={a.slug}
                href={getArticleHref(a)}
                className="group flex gap-3 py-4 first:pt-0"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-neutral-100 pt-[40%]">
                  <ArticleImage
                    src={a.image}
                    alt={a.title}
                    category={a.category}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    {a.category}
                  </span>
                  <h3 className="mt-0.5 font-serif text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
                    {a.title}
                  </h3>
                  <span className="mt-1 block text-[11px] uppercase tracking-wide text-neutral-400">
                    {formatDateShort(a.date)} · {readTime(a)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Text-only category columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-4 flex items-end justify-between border-b-2 border-neutral-900 pb-2">
              <h2 className="font-serif text-[20px] font-black uppercase tracking-tight text-neutral-900">
                {col.title}
              </h2>
              {col.href && (
                <Link
                  href={col.href}
                  className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 hover:text-brand"
                >
                  View all
                </Link>
              )}
            </div>
            <div className="divide-y divide-neutral-100">
              {col.articles.map((a) => (
                <Link
                  key={a.slug}
                  href={getArticleHref(a)}
                  className="group block py-4 first:pt-0"
                >
                  <h3 className="font-serif text-[16px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-neutral-500">
                    {a.excerpt}
                  </p>
                  <span className="mt-1.5 block text-[11px] uppercase tracking-wide text-neutral-400">
                    {formatDateShort(a.date)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Most Read */}
        <div>
          <div className="mb-4 border-b-2 border-neutral-900 pb-2">
            <h2 className="font-serif text-[20px] font-black uppercase tracking-tight text-neutral-900">
              Most Read
            </h2>
          </div>
          <ol className="divide-y divide-neutral-100">
            {mostRead.map((a, i) => (
              <li key={a.slug} className="py-4 first:pt-0">
                <Link href={getArticleHref(a)} className="group flex gap-4">
                  <span className="font-serif text-[26px] font-black leading-none text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
                    {a.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}