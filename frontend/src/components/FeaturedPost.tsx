import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export const posts = [
  {
    title:
      "Unlocking the Potential of AI: Transforming Industries and Shaping the Future",
    href: "#",
    description:
      "Learn the secrets of increasing your website's conversion rate with proven strategies and expert tips.",
    date: "Jan 6th, 2025",
    datetime: "2023-03-16",
    imageUrl:
      "https://res.cloudinary.com/dp77laaey/image/upload/v1736187650/gd8sklngowzyilwxpllo.png",
    author: {
      name: "Hitesh",
      href: "#",
      imageUrl: "H",
    },
    tags: [{ name: "AI" }, { name: "Future" }, { name: "LLM" }],
  },
  {
    title:
      "Redis: The Ultimate Guide to High-Performance Data Caching and Scalability",
    href: "#",
    description:
      "Discover powerful SEO techniques that can significantly boost your online sales and improve your website's visibility.",
    date: "Jan 5th, 2025",
    datetime: "2023-03-10",
    imageUrl:
      "https://res.cloudinary.com/dp77laaey/image/upload/v1727669351/u4qcxojsg2qx5vbxxpwm.jpg",
    author: {
      name: "Brenna Goyette",
      href: "#",
      imageUrl: "B",
    },
    tags: [{ name: "Caching" }, { name: "Database" }, { name: "Redis" }],
  },
  {
    title:
      "Mastering Express.js: A Comprehensive Guide to Building Scalable Web Applications",
    href: "#",
    description:
      "Explore real-world examples of companies that have transformed their customer experience and learn from their success.",
    date: "Jan 7th, 2025",
    datetime: "2023-02-12",
    imageUrl:
      "https://res.cloudinary.com/dp77laaey/image/upload/v1727853356/criqgc0ormjmgvzqy4ln.jpg",
    author: {
      name: "Daniela Metz",
      href: "#",
      imageUrl: "D",
    },
    tags: [{ name: "Express" }, { name: "Nodejs" }, { name: "HTTP" }],
  },
];

export default function FeaturedPosts() {
  return (
    <div className="relative bg-background dark:bg-background px-4 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <div
              key={post.title}
              className="border flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                  width={1280}
                  height={720}
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link to={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-100">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-300">
                      {post.description}
                    </p>
                  </Link>
                </div>
                <div className="space-x-2 mt-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag.name}>{tag.name}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <Link to={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg border shadow-lg">
                        {post.author.imageUrl}
                      </span>
                    </Link>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-100">
                      <Link to={post.author.href} className="hover:underline">
                        {post.author.name}
                      </Link>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-400">
                      <time dateTime={post.datetime}>{post.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
