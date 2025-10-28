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
}

interface Author {
  id: string;
  name: string;
  email: string;
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
