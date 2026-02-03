import { BlogCard } from "./BlogCard";
import type { BlogPost, BlogCategory } from "../../types/blog";

interface RelatedPostsProps {
  currentPostId: string;
  relatedPostIds: string[];
  allPosts: BlogPost[];
  categories: BlogCategory[];
  onPostClick?: (postId: string) => void;
}

export function RelatedPosts({
  currentPostId,
  relatedPostIds,
  allPosts,
  categories,
  onPostClick
}: RelatedPostsProps) {
  // Get related posts by ID, or fall back to most recent posts
  let relatedPosts: BlogPost[] = [];

  if (relatedPostIds.length > 0) {
    relatedPosts = relatedPostIds
      .map(id => allPosts.find(p => p.id === id))
      .filter((p): p is BlogPost => p !== undefined && p.id !== currentPostId)
      .slice(0, 3);
  }

  // Fallback to most recent posts if no related posts specified
  if (relatedPosts.length < 3) {
    const recentPosts = allPosts
      .filter(p => p.id !== currentPostId && !relatedPosts.find(rp => rp.id === p.id))
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...recentPosts];
  }

  // Don't render if no related posts available
  if (relatedPosts.length === 0) {
    return null;
  }

  const getCategoryForPost = (post: BlogPost) =>
    categories.find(c => c.id === post.category || c.slug === post.category);

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#f5f5f5]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-product-sans font-black text-2xl md:text-3xl text-[#323232] text-center mb-12">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              category={getCategoryForPost(post)}
              onClick={() => onPostClick?.(post.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
