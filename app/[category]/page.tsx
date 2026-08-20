import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCategories,
  categoryFromSlug,
  categorySlug,
  getArticlesByCategory,
  getAuthorById,
  getAuthorHref,
} from "@/lib/data";
import { LeadArticle, StandardArticle, CompactArticle } from "@/components/ArticleCard";
import ArticleImage from "@/components/ArticleImage";
import NewsletterSidebar from "@/components/NewsletterSidebar";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return {};
  return {
    title: category,
    description: `The latest ${category} news and analysis.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category);
  if (articles.length === 0) notFound();

  const [lead, ...rest] = articles;
  const leadAuthor = getAuthorById(lead.authorId);
  const sideStories = rest.slice(0, 4);

  // In the 4-column "rest" grid, the 4th slot of the first row holds the
  // lead article's author card + newsletter signup instead of a story, so
  // the remaining articles are split around it.
  const beforeCard = rest.slice(0, 3);
  const afterCard = rest.slice(3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="border-b-4 border-brand pb-2 text-[32px] font-black uppercase tracking-tight text-neutral-900">
        {category}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <LeadArticle article={lead} />
        </div>

        {/* right rail: more stories from the category */}
        {sideStories.length > 0 && (
          <aside className="lg:col-span-1">
            <h2 className="border-b-2 border-neutral-900 pb-2 text-[16px] font-black uppercase tracking-wide text-neutral-900">
              More in {category}
            </h2>
            <div className="divide-y divide-neutral-100">
              {sideStories.map((a) => (
                <CompactArticle key={a.slug} article={a} />
              ))}
            </div>
          </aside>
        )}
      </div>

      {rest.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {beforeCard.map((a) => (
            <StandardArticle key={a.slug} article={a} />
          ))}

          {/* 4th column: lead article's author + newsletter signup */}
          <div className="flex flex-col gap-6">
            {leadAuthor && (
              <div className="border border-neutral-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                    <ArticleImage
                      src={leadAuthor.photo}
                      alt={leadAuthor.name}
                      category={leadAuthor.name}
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <Link
                      href={getAuthorHref(leadAuthor)}
                      className="font-bold text-neutral-900 hover:text-brand"
                    >
                      {leadAuthor.name}
                    </Link>
                    <p className="mt-1 text-[13px] text-neutral-500">
                      {category} reporter
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-snug text-neutral-600">
                  {leadAuthor.bio}
                </p>
                <Link
                  href={getAuthorHref(leadAuthor)}
                  className="mt-3 inline-block text-[13px] font-semibold text-brand"
                >
                  View profile →
                </Link>
              </div>
            )}

            <NewsletterSidebar />
          </div>

          {afterCard.map((a) => (
            <StandardArticle key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}