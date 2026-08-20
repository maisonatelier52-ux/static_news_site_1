import Link from "next/link";
import ArticleImage from "./ArticleImage";
import {
  Article,
  getArticleHref,
  getAuthorById,
  formatDateShort,
  readTime,
} from "@/lib/data";

/**
 * Compact card: small square thumbnail on the right, headline + dek on the left.
 * Used for sidebars ("Top Headlines") and dense list rows.
 */
export function CompactArticle({
  article,
  showExcerpt = false,
}: {
  article: Article;
  showExcerpt?: boolean;
}) {
  return (
    <Link
      href={getArticleHref(article)}
      className="group flex items-start justify-between gap-3 py-3"
    >
      <div className="min-w-0">
        <h3 className="text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
          {article.title}
        </h3>
        {showExcerpt && (
          <p className="mt-1 line-clamp-2 text-[13px] text-neutral-500">
            {article.excerpt}
          </p>
        )}
        <span className="mt-1 block text-[12px] text-neutral-400">
          {readTime(article)}
        </span>
      </div>
      <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-neutral-100 sm:h-20 sm:w-24">
        <ArticleImage
          src={article.image}
          alt={article.title}
          category={article.category}
          sizes="96px"
        />
      </div>
    </Link>
  );
}

/**
 * Standard card: image on top, headline + dek below. Used in category grids.
 */
export function StandardArticle({
  article,
  imageAspect = "aspect-[4/3]",
}: {
  article: Article;
  imageAspect?: string;
}) {
  return (
    <Link href={getArticleHref(article)} className="group block">
      <div
        className={`relative ${imageAspect} w-full overflow-hidden bg-neutral-100`}
      >
        <ArticleImage
          src={article.image}
          alt={article.title}
          category={article.category}
        />
      </div>
      <h3 className="mt-2 text-[16px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
        {article.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-[13px] text-neutral-500">
        {article.excerpt}
      </p>
      <span className="mt-1 block text-[12px] text-neutral-400">
        {readTime(article)}
      </span>
    </Link>
  );
}

/**
 * Lead card: larger image + headline for a section's top story.
 */
export function LeadArticle({ article }: { article: Article }) {
  const author = getAuthorById(article.authorId);
  return (
    <Link href={getArticleHref(article)} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <ArticleImage
          src={article.image}
          alt={article.title}
          category={article.category}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <h3 className="mt-3 text-[22px] font-bold leading-tight text-neutral-900 group-hover:text-brand sm:text-[26px]">
        {article.title}
      </h3>
      <p className="mt-2 text-[15px] leading-snug text-neutral-500">
        {article.excerpt}
      </p>
      <div className="mt-2 text-[13px] text-neutral-400">
        {author ? `${author.name} · ` : ""}
        {formatDateShort(article.date)} · {readTime(article)}
      </div>
    </Link>
  );
}

/**
 * Row card: horizontal image + headline, used for the two-up feature row.
 */
export function RowArticle({ article }: { article: Article }) {
  return (
    <Link href={getArticleHref(article)} className="group flex gap-4">
      <div className="min-w-0 flex-1">
        <h3 className="text-[17px] font-bold leading-snug text-neutral-900 group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-neutral-500">
          {article.excerpt}
        </p>
        <span className="mt-1 block text-[12px] text-neutral-400">
          {readTime(article)}
        </span>
      </div>
      <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-neutral-100 sm:h-28 sm:w-40">
        <ArticleImage
          src={article.image}
          alt={article.title}
          category={article.category}
          sizes="160px"
        />
      </div>
    </Link>
  );
}
