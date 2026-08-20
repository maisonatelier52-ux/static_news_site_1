import rawData from "@/data/data.json";

export type Author = {
  id: number;
  name: string;
  slug: string;
  photo: string;
  bio: string;
  twitter?: string;
  medium?: string;
  quora?: string;
  reddit?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string[];
  date: string;
  image: string;
  authorId: number;
  published: boolean;
};

type Data = {
  authors: Author[];
  articles: Article[];
};

const data = rawData as Data;

export function categorySlug(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): string | undefined {
  return getAllCategories().find((c) => categorySlug(c) === slug);
}

export function getAllCategories(): string[] {
  const set = new Set(data.articles.map((a) => a.category));
  return Array.from(set).sort();
}

export function getPublishedArticles(): Article[] {
  return data.articles.filter((a) => a.published);
}

export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestArticles(limit?: number): Article[] {
  const sorted = sortByDateDesc(getPublishedArticles());
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getArticlesByCategory(category: string): Article[] {
  return sortByDateDesc(
    getPublishedArticles().filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    )
  );
}

export function getArticleBySlug(
  category: string,
  slug: string
): Article | undefined {
  return getPublishedArticles().find(
    (a) =>
      a.slug === slug &&
      categorySlug(a.category) === categorySlug(category)
  );
}

export function getArticleHref(article: Article): string {
  return `/${categorySlug(article.category)}/${article.slug}`;
}

export function getAuthorById(id: number): Author | undefined {
  return data.authors.find((a) => a.id === id);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return data.authors.find((a) => a.slug === slug);
}

export function getAuthorHref(author: Author): string {
  return `/author/${author.slug}`;
}

export function getArticlesByAuthor(authorId: number): Article[] {
  return sortByDateDesc(
    getPublishedArticles().filter((a) => a.authorId === authorId)
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, limit);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function readTime(article: Article): string {
  const words = stripHtml(article.content).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
