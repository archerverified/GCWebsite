import { Link } from "react-router-dom";
import { Phone, BookOpen } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { BlogCard } from "../components/blog/BlogCard";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import { createBlogListSchema, createBreadcrumbSchema } from "../seo/schemas";
import { colors } from "../styles/design-tokens";
import postsData from "../data/blog/posts.json";
import categoriesData from "../data/blog/categories.json";
import type { BlogPost, BlogCategory } from "../types/blog";

export function Blog() {
  const posts = postsData.posts as BlogPost[];
  const categories = categoriesData.categories as BlogCategory[];

  // Sort posts by publish date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const getCategoryForPost = (post: BlogPost) =>
    categories.find(c => c.id === post.category || c.slug === post.category);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ]);

  const blogListSchema = createBlogListSchema();

  return (
    <main className="bg-white">
      <Seo
        title="Garage Door Blog - Tips, Guides & Expert Advice"
        description="Expert tips, guides, and insights on garage door repair, maintenance, and installation. Learn from the Garage Cowboy team serving Dallas-Fort Worth."
        canonicalPath="/blog"
        schema={[blogListSchema, breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section
        className="relative min-h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundColor: colors.brand.dark }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen size={40} className="text-[#fec300]" />
          </div>
          <h1 className="font-product-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Garage Door Blog
          </h1>
          <p className="font-product-sans text-xl md:text-2xl text-white mb-8 opacity-90">
            Expert tips, guides, and insights on garage door repair, maintenance, and installation from the Garage Cowboy team.
          </p>
          <a
            href="tel:8172560122"
            className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Phone size={24} className="text-[#222]" />
            <span className="font-product-sans font-black text-xl text-[#222] uppercase">
              Call Now
            </span>
          </a>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              to="/"
              className="font-product-sans text-[#666] hover:text-[#323232] transition-colors"
            >
              Home
            </Link>
            <span className="text-[#999]">/</span>
            <span className="font-product-sans text-[#323232]">Blog</span>
          </nav>

          <h2 className="font-product-sans font-black text-3xl md:text-4xl text-[#323232] mb-4">
            Latest Articles
          </h2>
          <p className="font-product-sans text-lg text-[#666] mb-12 max-w-2xl">
            Stay informed with our latest guides, tips, and expert advice on garage doors.
          </p>

          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  category={getCategoryForPost(post)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-product-sans text-lg text-[#666]">
                No blog posts yet. Check back soon for expert garage door tips and guides!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#f5f5f5]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-product-sans font-black text-2xl md:text-3xl text-[#323232] text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map(category => {
                const categoryPostCount = posts.filter(
                  p => p.category === category.id || p.category === category.slug
                ).length;

                return (
                  <div
                    key={category.id}
                    className="bg-white rounded-[15px] border-2 border-[#35363a] p-6 text-center hover:shadow-lg transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <BookOpen size={24} className="text-[#222]" />
                    </div>
                    <h3 className="font-product-sans font-bold text-lg text-[#323232] mb-2">
                      {category.name}
                    </h3>
                    <p className="font-product-sans text-sm text-[#666] mb-3">
                      {category.description}
                    </p>
                    <span className="font-product-sans text-xs text-[#999]">
                      {categoryPostCount} {categoryPostCount === 1 ? "article" : "articles"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA
        title="Need Help With Your Garage Door?"
        subtitle="Our expert technicians are ready to assist"
      />
    </main>
  );
}
