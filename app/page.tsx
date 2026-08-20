import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import LatestNewsGrid from "@/components/LatestNewsGrid";
import Newsletter from "@/components/Newsletter";
import { RowArticle, StandardArticle } from "@/components/ArticleCard";
import {
  getLatestArticles,
  getAllCategories,
  getArticlesByCategory,
  categorySlug,
} from "@/lib/data";

export default function Home() {
  const latest = getLatestArticles();
  const lead = latest[0];
  const sideStories = latest.slice(1, 6);
  const rowStories = latest.slice(6, 8);
  const gridStories = latest.slice(8, 11);
  const categories = getAllCategories();

  // Pick two categories for the text-only columns, and use a later slice
  // of the latest articles to stand in for "Most Read" (no analytics/view
  // counts exist in data.json, so this is date-based rather than traffic-based).
  const [colCategoryA, colCategoryB] = categories;
  const gridLatest = latest.slice(0, 4);
  const mostRead = latest.slice(11, 16);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Hero lead={lead} sideStories={sideStories} />

        {/* two-up feature row */}
        {rowStories.length > 0 && (
          <section className="grid grid-cols-1 gap-8 border-b border-neutral-200 py-6 sm:grid-cols-2">
            {rowStories.map((a) => (
              <RowArticle key={a.slug} article={a} />
            ))}
          </section>
        )}

        {/* three-up compact grid */}
        {gridStories.length > 0 && (
          <section className="grid grid-cols-1 gap-8 border-b border-neutral-200 py-6 sm:grid-cols-3">
            {gridStories.map((a) => (
              <StandardArticle key={a.slug} article={a} imageAspect="aspect-[3/2]" />
            ))}
          </section>
        )}

        <LatestNewsGrid
          latest={gridLatest}
          columns={[
            {
              title: colCategoryA,
              href: `/${categorySlug(colCategoryA)}`,
              articles: getArticlesByCategory(colCategoryA).slice(0, 4),
            },
            {
              title: colCategoryB,
              href: `/${categorySlug(colCategoryB)}`,
              articles: getArticlesByCategory(colCategoryB).slice(0, 4),
            },
          ]}
          mostRead={mostRead}
        />

        <Newsletter />

        {/* category sections */}
        {categories.filter((c) => c!== "Business" && c !== "Finance")
        .map((c) => (
          <CategorySection
            key={c}
            category={c}
            articles={getArticlesByCategory(c)}
          />
        ))}
      </div>

    </>
  );
}