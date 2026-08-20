import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllCategories,
  getArticlesByCategory,
  getArticleBySlug,
  categoryFromSlug,
  categorySlug,
  getAuthorById,
  getAuthorHref,
  getRelatedArticles,
  formatDate,
  readTime,
} from "@/lib/data";
import ArticleImage from "@/components/ArticleImage";
import { CompactArticle } from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllCategories().flatMap((c) =>
    getArticlesByCategory(c).map((a) => ({
      category: categorySlug(c),
      slug: a.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category: categorySlugParam, slug } = await params;
  const category = categoryFromSlug(categorySlugParam);
  if (!category) return {};
  const article = getArticleBySlug(category, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlugParam, slug } = await params;
  const category = categoryFromSlug(categorySlugParam);
  if (!category) notFound();

  const article = getArticleBySlug(category, slug);
  if (!article) notFound();

  const author = getAuthorById(article.authorId);
  const related = getRelatedArticles(article, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <Link
            href={`/${categorySlug(article.category)}`}
            className="text-[13px] font-bold uppercase tracking-wide text-brand"
          >
            {article.category}
          </Link>
          <h1 className="mt-2 text-[30px] font-black leading-[1.1] text-neutral-900 sm:text-[40px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[17px] leading-snug text-neutral-500">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-3 border-y border-neutral-200 py-4 text-[14px] text-neutral-500">
            {author && (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                <ArticleImage
                  src={author.photo}
                  alt={author.name}
                  category={author.name}
                  sizes="44px"
                />
              </div>
            )}
            <div>
              {author ? (
                <Link
                  href={getAuthorHref(author)}
                  className="block font-bold text-neutral-800 hover:text-brand"
                >
                  {author.name}
                </Link>
              ) : (
                <span className="block font-bold text-neutral-800">
                  Staff Writer
                </span>
              )}
              <span>
                {formatDate(article.date)} · {readTime(article)}
              </span>
            </div>
          </div>

          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
            <ArticleImage
              src={article.image}
              alt={article.title}
              category={article.category}
              sizes="(max-width: 1024px) 100vw, 720px"
              priority
            />
          </div>

          <div
            className="article-body mt-8 max-w-2xl text-[17px] text-neutral-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.keywords?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-neutral-200 pt-6">
              {article.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-[12px] text-neutral-600"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </article>

        <aside>
          {author && (
            <div className="mb-8 border border-neutral-200 p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                  <ArticleImage
                    src={author.photo}
                    alt={author.name}
                    category={author.name}
                    sizes="56px"
                  />
                </div>
                <div>
                  <Link
                    href={getAuthorHref(author)}
                    className="font-bold text-neutral-900 hover:text-brand"
                  >
                    {author.name}
                  </Link>
                  <p className="mt-1 text-[13px] text-neutral-500">
                    {article.category} reporter
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-snug text-neutral-600">
                {author.bio}
              </p>
              <Link
                href={getAuthorHref(author)}
                className="mt-3 inline-block text-[13px] font-semibold text-brand"
              >
                View profile →
              </Link>
            </div>
          )}

          {related.length > 0 && (
            <div className="lg:sticky lg:top-24 ">
              <h2 className="border-b-2 border-neutral-900 pb-2 text-[16px] font-black uppercase tracking-wide text-neutral-900">
                Related in {article.category}
              </h2>
              <div className="divide-y divide-neutral-100">
                {related.map((a) => (
                  <CompactArticle key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}