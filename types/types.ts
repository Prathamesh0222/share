export interface Post {
  title: string;
  content: string;
  tags: string[];
  image?: File;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
}

export interface TiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
}

interface Author {
  id: string;
  name: string;
  email?: string;
  image: string | null;
}

export interface PostCardProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug?: string;
  author: Author;
  Tags: Array<{ id: string; name: string }>;
  _count: {
    Like: number;
    Comment: number;
    Bookmark: number;
  };
  createdAt: Date | string;
  isBookmarked: boolean;
  isLiked: boolean;
}

export interface DiscoverMoreProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug?: string;
  author: Author;
  _count: {
    Like: number;
    Comment: number;
    Bookmark: number;
  };
  createdAt: Date | string;
}

export interface Comments {
  id: string;
  comment: string;
  authorId: string;
  postId: string;
  createdAt: string | Date;
  author: Author;
}

export interface CommentFormData {
  comment: string;
  postId: string;
}

export interface CommentResponse {
  comments: Comments[];
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface CommentSectionProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  postId?: string;
  postAuthorId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date | string;
  _count: {
    Post: number;
    Comment: number;
    Like: number;
    Bookmark: number;
  };
  Post: PostCardProps[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Tags {
  id: string;
  name: string;
  count: number;
}
