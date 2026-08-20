import { Article, getAuthorById, formatDateShort, readTime } from "@/lib/data";
import { CompactArticle } from "./ArticleCard";
import Link from "next/link";
import ArticleImage from "./ArticleImage";
import { getArticleHref } from "@/lib/data";

export default function Hero({
  lead,
  sideStories,
}: {
  lead: Article;
  sideStories: Article[];
}) {
  const author = getAuthorById(lead.authorId);
  return (
    <section className="border-b border-neutral-200 py-6">
      {/* breaking banner */}
      <Link
        href={getArticleHref(lead)}
        className="mb-6 flex items-center justify-between bg-brand px-4 py-2.5 text-white"
      >
        <span className="truncate text-[14px] font-bold sm:text-[15px]">
          {lead.title}
        </span>
        <span className="ml-3 shrink-0">→</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* main lead */}
        <div className="lg:col-span-2">
          <Link href={getArticleHref(lead)} className="group block">
            <span className="mb-1 block text-[13px] font-bold uppercase tracking-wide text-brand">
              {lead.category}
            </span>
            <h1 className="text-[28px] font-black leading-[1.1] text-neutral-900 group-hover:text-brand sm:text-[36px]">
              {lead.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] leading-snug text-neutral-500">
              {lead.excerpt}
            </p>
            <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
              <ArticleImage
                src={lead.image}
                alt={lead.title}
                category={lead.category}
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
          </Link>
          <div className="mt-3 flex items-center gap-2 text-[13px] text-neutral-500">
            {author && (
              <span className="font-semibold text-neutral-700">
                {author.name}
              </span>
            )}
            <span>· {formatDateShort(lead.date)}</span>
            <span>· {readTime(lead)}</span>
          </div>
        </div>

        {/* top headlines sidebar */}
        <aside className="lg:col-span-1">
          <h2 className="border-b-2 border-neutral-900 pb-2 text-[16px] font-black uppercase tracking-wide text-neutral-900">
            Top Headlines
          </h2>
          <div className="divide-y divide-neutral-100">
            {sideStories.map((a) => (
              <CompactArticle key={a.slug} article={a} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
