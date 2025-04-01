import { Pen, Search, Tag, User, BookmarkIcon } from "lucide-react";

const Image_Upload = import.meta.env.VITE_IMAGE_UPLOAD;
const Rich_Text_Editor = import.meta.env.VITE_RICH_TEXT_EDITOR;
const Tags_Section = import.meta.env.VITE_TAGS_SECTION;
const Comment_Section = import.meta.env.VITE_COMMENT_SECTION;
const Bookmark_Section = import.meta.env.VITE_BOOKMARK_SECTION;

export const features = [
  {
    title: "Rich Text Editor",
    description:
      "Craft engaging blog posts with our powerful and intuitive editor. Effortlessly format your content with bold, italic, and underlined text, add headings, bullet points, links, and more. Experience seamless writing with real-time previews and formatting options.",
    icon: <Pen size={28} />,
    video: Rich_Text_Editor,
  },
  {
    title: "Tagging System",
    description:
      "Organize your blog posts with a versatile tagging system. Assign relevant tags to your content to make it easily searchable and discoverable by readers. Navigate through topics effortlessly and connect your audience with their interests.",
    icon: <Tag size={28} />,
    video: Tags_Section,
  },
  {
    title: "Media Upload",
    description:
      "Bring your blog posts to life with media uploads. Enhance your storytelling by adding high-quality images, videos, and other media files. Our intuitive upload system ensures smooth integration of multimedia elements into your posts.",
    icon: <Search size={28} />,
    video: Image_Upload,
  },
  {
    title: "User Interaction",
    description:
      "Foster a vibrant community by engaging with your readers. Enable features like comments for discussions, likes to show appreciation, and bookmarks for easy access to favorite posts. Create an interactive experience that keeps users coming back for more.",
    icon: <User size={28} />,
    video: Comment_Section,
  },
  {
    title: "Bookmark Posts",
    description:
      "Save your favorite blog posts for later reading with our bookmark feature. Never lose track of interesting content and build your personal library of inspiring articles. Access your bookmarked posts anytime,anywhere.",
    icon: <BookmarkIcon size={28} />,
    video: Bookmark_Section,
  },
];
