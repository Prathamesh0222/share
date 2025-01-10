import { Pen, Search, Tag, User, BookmarkIcon, Share2 } from "lucide-react";

export const features = [
  {
    title: "Rich Text Editor",
    description: (
      <>
        "Craft engaging blog posts with our powerful and intuitive editor.
        Effortlessly format your content with bold, italic, and underlined text,
        add headings, bullet points, links, and more. Experience seamless
        writing with real-time previews and formatting options.""
      </>
    ),
    icon: <Pen size={28} />,
  },
  {
    title: "Tagging System",
    description: (
      <>
        Organize your blog posts with a versatile tagging system. Assign
        relevant tags to your content to make it easily searchable and
        discoverable by readers. Navigate through topics effortlessly and
        connect your audience with their interests.
      </>
    ),
    icon: <Tag size={28} />,
  },
  {
    title: "Media Upload",
    description: (
      <>
        Bring your blog posts to life with media uploads. Enhance your
        storytelling by adding high-quality images, videos, and other media
        files. Showcase visuals that complement your content and captivate your
        audience.
      </>
    ),
    icon: <Search size={28} />,
  },
  {
    title: "User Interaction",
    description: (
      <>
        Foster a vibrant community by engaging with your readers. Enable
        features like comments for discussions, likes to show appreciation, and
        bookmarks for easy access to favorite posts. Create an interactive
        experience that keeps users coming back for more.
      </>
    ),
    icon: <User size={28} />,
  },
  {
    title: "Bookmark Posts",
    description: (
      <>
        Save your favorite blog posts for later reading with our bookmark
        feature. Never lose track of interesting content and build your personal
        library of inspiring articles. Access your bookmarked posts anytime,
        anywhere.
      </>
    ),
    icon: <BookmarkIcon size={28} />,
  },
  {
    title: "Share Content",
    description: (
      <>
        Easily share compelling blog posts with your network. Spread knowledge
        and insights through social media integration. Help valuable content
        reach a wider audience with just a few clicks.
      </>
    ),
    icon: <Share2 size={28} />,
  },
];
