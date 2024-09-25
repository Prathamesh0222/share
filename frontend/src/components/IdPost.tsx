import { Header } from "./Header";
import { BookmarkIcon } from "lucide-react";

interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
}

export const IdPost = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Header />
      <div className="mt-10 text-center">
        <article className="max-w-3xl px-4 py-12 mx-auto bg-white border rounded-lg dark:bg-slate-900">
          <header className="mb-8">
            <h1 className="px-12 mb-6 text-2xl font-bold lg:text-3xl">
              {blog.title}
            </h1>
          </header>
          <img
            src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            className="w-full px-8 mx-auto"
          />
          <div className="mt-8 dark:border-cyan-200">
            <div className="px-8 text-gray-500 dark:text-slate-300 text-start">
              <div className="flex justify-between">
                <div>
                  By <span className="underline">{blog.author.name}</span> •{" "}
                  <time>{"20th Sep 2024"}</time>
                </div>
                <BookmarkIcon className="w-5 h-5 mx-2" />
              </div>
            </div>
          </div>
          <div className="mb-8"></div>
          <div className="px-8 text-lg leading-8 text-justify">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </article>
      </div>
    </div>
  );
};
