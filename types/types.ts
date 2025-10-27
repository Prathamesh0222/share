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
