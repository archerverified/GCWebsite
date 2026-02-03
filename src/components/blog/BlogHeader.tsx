import { Link } from "react-router-dom";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import type { BlogPost, BlogCategory } from "../../types/blog";

interface BlogHeaderProps {
  post: BlogPost;
  category?: BlogCategory;
}

export function BlogHeader({ post, category }: BlogHeaderProps) {
  const categoryColor = category?.color || "#fec300";

  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
        <Link
          to="/"
          className="font-product-sans text-[#666] hover:text-[#323232] transition-colors"
        >
          Home
        </Link>
        <ChevronRight size={14} className="text-[#999]" />
        <Link
          to="/blog"
          className="font-product-sans text-[#666] hover:text-[#323232] transition-colors"
        >
          Blog
        </Link>
        <ChevronRight size={14} className="text-[#999]" />
        <span className="font-product-sans text-[#323232] line-clamp-1">
          {post.title}
        </span>
      </nav>

      {/* Category Badge */}
      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-md font-product-sans font-bold text-xs text-[#222] uppercase tracking-wide"
          style={{ backgroundColor: categoryColor }}
        >
          {category?.name || post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-[#323232] mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Author & Meta */}
      <div className="flex flex-wrap items-center gap-6 pb-6 border-b-2 border-[#e6e6e6]">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#35363a]"
            width={48}
            height={48}
          />
          <div>
            <p className="font-product-sans font-bold text-[#323232]">
              {post.author.name}
            </p>
            <p className="font-product-sans text-sm text-[#666]">
              {post.author.title}
            </p>
          </div>
        </div>

        {/* Date & Reading Time */}
        <div className="flex items-center gap-4 text-sm text-[#666]">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="font-product-sans">
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            <span className="font-product-sans">{post.readingTime} min read</span>
          </span>
        </div>
      </div>
    </header>
  );
}
