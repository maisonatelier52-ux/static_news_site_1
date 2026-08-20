import Link from "next/link";
import ArticleImage from "./ArticleImage";
import { Author, getAuthorHref } from "@/lib/data";

export default function AuthorByline({
  author,
  dateLabel,
  size = "sm",
}: {
  author?: Author;
  dateLabel: string;
  size?: "sm" | "md";
}) {
  const avatarSize = size === "md" ? "h-10 w-10" : "h-7 w-7";
  return (
    <div className="flex items-center gap-2 text-[13px] text-neutral-500">
      {author && (
        <div
          className={`relative ${avatarSize} shrink-0 overflow-hidden rounded-full bg-neutral-200`}
        >
          <ArticleImage
            src={author.photo}
            alt={author.name}
            category={author.name}
            sizes="40px"
          />
        </div>
      )}
      <span className="leading-tight">
        {author ? (
          <Link
            href={getAuthorHref(author)}
            className="font-semibold text-neutral-700 hover:text-brand"
          >
            {author.name}
          </Link>
        ) : (
          <span className="font-semibold text-neutral-700">Staff Writer</span>
        )}
        <span className="mx-1 text-neutral-300">•</span>
        <span>{dateLabel}</span>
      </span>
    </div>
  );
}
