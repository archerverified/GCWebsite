import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { BlogPost, BlogCategory } from "../../types/blog";

interface BlogCardProps {
  post: BlogPost;
  category?: BlogCategory;
  onClick?: () => void;
}

export function BlogCard({ post, category, onClick }: BlogCardProps) {
  const categoryColor = category?.color || "var(--gc-yellow)";

  return (
    <Link
      to={`/blog/${post.slug}`}
      onClick={onClick}
      className="group bg-white rounded-[15px] border-2 border-gc-ink overflow-hidden shadow-lg hover:shadow-xl hover:border-gc-yellow transition-all block"
    >
      {/* Featured Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width={post.featuredImage.width}
          height={post.featuredImage.height}
        />
        {/* Category Badge */}
        <div
          className="absolute top-0 left-4 px-3 py-1 border-t-[3px] border-gc-ink rounded-b-md"
          style={{ backgroundColor: categoryColor }}
        >
          <span className="font-product-sans font-bold text-xs text-gc-ink uppercase tracking-wide">
            {category?.name || post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-product-sans font-bold text-lg text-gc-ink mb-2 line-clamp-2 group-hover:text-gc-ink transition-colors">
          {post.title}
        </h3>

        <p className="font-product-sans text-sm text-gc-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-product-sans text-gc-gray-600">
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>
          <span className="flex items-center gap-1 font-product-sans text-gc-gray-600">
            <Clock size={14} />
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
