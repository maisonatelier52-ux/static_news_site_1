import { notFound } from "next/navigation";
import type { Metadata } from "next";
import rawData from "@/data/data.json";
import {
  getAuthorBySlug,
  getArticlesByAuthor,
} from "@/lib/data";
import ArticleImage from "@/components/ArticleImage";
import { StandardArticle } from "@/components/ArticleCard";

import {
  FaXTwitter,
  FaMedium,
  FaQuora,
  FaRedditAlien,
} from "react-icons/fa6";

export function generateStaticParams() {
  return (rawData.authors as { slug: string }[]).map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) return {};

  return {
    title: author.name,
    description: author.bio,
  };
}

const socialIcons = {
  twitter: FaXTwitter,
  medium: FaMedium,
  quora: FaQuora,
  reddit: FaRedditAlien,
};

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) notFound();

  const articles = getArticlesByAuthor(author.id);

  const socialKeys = ["twitter", "medium", "quora", "reddit"] as const;

  const socials = socialKeys
    .filter(
      (key) =>
        typeof author[key] === "string" &&
        (author[key] as string).trim().length > 0
    )
    .map((key) => ({
      key,
      url: author[key] as string,
      Icon: socialIcons[key],
    }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Author header */}
      <div className="flex flex-col items-center gap-5 border-b border-neutral-200 pb-8 text-center sm:flex-row sm:text-left">

        {/* Author image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-neutral-200">
          <ArticleImage
            src={author.photo}
            alt={author.name}
            category={author.name}
            sizes="96px"
          />
        </div>

        {/* Author information */}
        <div>
          <h1 className="text-[28px] font-black text-neutral-900">
            {author.name}
          </h1>

          <p className="mt-2 max-w-2xl text-[15px] leading-snug text-neutral-600">
            {author.bio}
          </p>

          {/* Social icons */}
          {socials.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
              {socials.map(({ key, url, Icon }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ${author.name} on ${key}`}
                  title={key}
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-neutral-200
                    text-neutral-500
                    transition-all duration-200
                    hover:-translate-y-0.5
                  "
                >
                  <Icon
                    className={`
                      h-[17px] w-[17px]
                      transition-colors duration-200
                      ${
                        key === "twitter"
                          ? "hover:text-black"
                          : key === "medium"
                          ? "hover:text-black"
                          : key === "quora"
                          ? "hover:text-red-600"
                          : "hover:text-orange-500"
                      }
                    `}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Articles */}
      <h2 className="mt-8 border-b-2 border-neutral-900 pb-2 text-[16px] font-black uppercase tracking-wide text-neutral-900">
        Articles by {author.name}
      </h2>

      {articles.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <StandardArticle key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-neutral-500">
          No articles yet.
        </p>
      )}
    </div>
  );
}