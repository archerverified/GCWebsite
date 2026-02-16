import { useParams, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Seo } from "../components/seo/Seo";
import { BlogHeader } from "../components/blog/BlogHeader";
import { RelatedPosts } from "../components/blog/RelatedPosts";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import { createBlogPostingSchema, createFAQSchema } from "../seo/schemas";
import postsData from "../data/blog/posts.json";
import categoriesData from "../data/blog/categories.json";
import type { BlogPost as BlogPostType, BlogCategory } from "../types/blog";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const posts = postsData.posts as BlogPostType[];
  const categories = categoriesData.categories as BlogCategory[];

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const category = categories.find(
    c => c.id === post.category || c.slug === post.category
  );

  // Build schemas
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const blogPostingSchema = createBlogPostingSchema({
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    slug: post.slug,
    author: post.author,
    publishDate: post.publishDate,
    lastModified: post.lastModified,
    featuredImage: post.featuredImage,
    wordCount
  });

  const schemas = [blogPostingSchema];

  // Add FAQ schema if FAQs exist
  if (post.faqs && post.faqs.length > 0) {
    schemas.push(createFAQSchema(post.faqs));
  }

  // Track page view on mount
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'blog_post_view', {
        post_id: post.id,
        post_title: post.title,
        category: post.category,
        author: post.author.name
      });
    }
  }, [post.id, post.title, post.category, post.author.name]);

  // Track scroll progress
  const firedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'blog_engagement', {
              event_category: 'Blog',
              event_label: 'Reading Progress',
              value: milestone
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for related post clicks
  const handleRelatedPostClick = (relatedPostId: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'blog_interaction', {
        event_category: 'Blog',
        event_label: 'Related Post Click',
        post_id: relatedPostId
      });
    }
  };

  return (
    <main className="bg-white">
      <Seo
        title={post.metaTitle || post.title}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        ogImage={post.featuredImage.url}
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ]}
      />

      {/* Article Content */}
      <article className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <BlogHeader post={post} category={category} />

          {/* Featured Image */}
          <figure className="mb-10 -mx-4 sm:mx-0">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              className="w-full rounded-none sm:rounded-[15px] border-y-2 sm:border-2 border-[#35363a]"
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              loading="lazy"
            />
          </figure>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none font-product-sans text-[#323232] prose-headings:font-product-sans prose-headings:font-black prose-headings:text-[#323232] prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-strong:font-bold prose-strong:text-[#323232] prose-a:text-[#35363a] prose-a:underline prose-a:decoration-[#fec300] prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:bg-[#fec300]/20 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-li:marker:text-[#fec300] prose-blockquote:border-l-4 prose-blockquote:border-[#fec300] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#666] prose-blockquote:bg-[#f5f5f5] prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-hr:border-[#e6e6e6] prose-hr:my-10 prose-table:border-collapse prose-th:bg-[#35363a] prose-th:text-white prose-th:font-bold prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-[#e6e6e6] prose-td:p-3 prose-code:bg-[#f5f5f5] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t-2 border-[#e6e6e6]">
              <h3 className="font-product-sans font-bold text-sm text-[#666] uppercase tracking-wide mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#f5f5f5] border border-[#e6e6e6] rounded-full font-product-sans text-sm text-[#666]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-[#f5f5f5] rounded-[15px] border-2 border-[#e6e6e6]">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#35363a]"
                width={80}
                height={80}
              />
              <div>
                <h3 className="font-product-sans font-bold text-lg text-[#323232]">
                  About {post.author.name}
                </h3>
                <p className="font-product-sans text-sm text-[#fec300] font-bold mb-2">
                  {post.author.title}
                </p>
                <p className="font-product-sans text-[#666]">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 p-8 bg-[#35363a] rounded-[15px] text-center">
            <h3 className="font-product-sans font-black text-2xl text-white mb-4">
              Need Help With Your Garage Door?
            </h3>
            <p className="font-product-sans text-[#eaeaea] mb-6">
              Our expert technicians are ready to assist with repairs, installation, and maintenance.
            </p>
            <a
              href="tel:8172560122"
              className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#222] rounded-[15px] px-6 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Phone size={20} className="text-[#222]" />
              <span className="font-product-sans font-black text-lg text-[#222] uppercase">
                Call (817) 256-0122
              </span>
            </a>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts
        currentPostId={post.id}
        relatedPostIds={post.relatedPosts}
        allPosts={posts}
        categories={categories}
        onPostClick={handleRelatedPostClick}
      />

      {/* CTA Section */}
      <ReadyToGetStartedCTA
        title="Ready to Upgrade Your Garage Door?"
        subtitle="Get expert advice and professional installation"
      />
    </main>
  );
}
