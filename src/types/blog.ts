/**
 * Blog TypeScript interfaces
 * Types for blog posts, categories, and related data structures
 */

export interface BlogAuthor {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface BlogFeaturedImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  author: BlogAuthor;
  publishDate: string;
  lastModified: string;
  category: string;
  tags: string[];
  featuredImage: BlogFeaturedImage;
  readingTime: number;
  excerpt: string;
  content: string;
  relatedPosts: string[];
  /** Optional FAQs for FAQ schema markup */
  faqs?: Array<{ question: string; answer: string }>;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  color: string;
}

export interface BlogData {
  posts: BlogPost[];
}

export interface BlogCategoriesData {
  categories: BlogCategory[];
}
