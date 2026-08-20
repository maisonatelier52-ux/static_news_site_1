import Link from "next/link";
import { Article, categorySlug } from "@/lib/data";
import { LeadArticle, CompactArticle } from "./ArticleCard";

export default function CategorySection({
  category,
  articles,
}: {
  category: string;
  articles: Article[];
}) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;
  const supporting = rest.slice(0, 4);

  return (
    <section className="border-t border-neutral-200 py-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="border-b-4 border-brand pb-1 text-[22px] font-black uppercase tracking-tight text-neutral-900">
          {category}
        </h2>
        <Link
          href={`/${categorySlug(category)}`}
          className="text-[13px] font-semibold text-neutral-500 hover:text-brand"
        >
          See all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <LeadArticle article={lead} />
        </div>
        <div className="divide-y divide-neutral-100 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:divide-y-0">
          {supporting.map((a) => (
            <div key={a.slug} className="lg:border-b lg:border-neutral-100 lg:py-0">
              <CompactArticle article={a} showExcerpt />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
