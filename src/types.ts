/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Block {
  id: string;
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'code' | 'callout' | 'quote' | 'image' | 'list-item' | 'equation' | 'table';
  content: string;
  properties?: {
    language?: string; // For code blocks
    caption?: string;  // For images/tables
    style?: string;    // Accent styling (e.g. info, warning, success, error)
    columns?: string[]; // Table headers
    rows?: string[][];  // Table cell matrix
    checked?: boolean;  // For checklist/todo item
  };
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  focusKeyword: string;
  canonicalUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  bannerImage?: string;
  category: string;
  tags: string[];
  difficulty: DifficultyLevel;
  blocks: Block[];
  isPublished: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  publishedAt: string;
  updatedAt: string;
  scheduledFor?: string;
  metrics: {
    views: number;
    likes: number;
    readingTime: number; // in minutes
  };
  seo: BlogSEO;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
}

export interface Comment {
  id: string;
  blogId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isApproved: boolean;
  parentId: string | null; // null for top-level, string ID of parent for nested replies
}

export interface Subscriber {
  id: string;
  email: string;
  joinedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface CustomizationConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColorLight: string;
  backgroundColorDark: string;
  cardColorLight: string;
  cardColorDark: string;
  borderRadius: string; // '0px' | '4px' | '8px' | '12px' | '16px' | '24px'
  fontSans: string;      // 'Inter' | 'Space Grotesk' | 'Playfair Display' | 'JetBrains Mono'
  logoText: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  sidebarWidth: string;  // '250px' | '300px' | '350px'
  footerText: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    discord: string;
    youtube: string;
    telegram: string;
  };
}

export interface ReadingHistoryItem {
  blogId: string;
  viewedAt: string;
}
