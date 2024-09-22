import { Blog } from "@/hooks/useBlog";
import { Header } from "./Header";

export const IdPost = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Header />
      <div className="mt-10 text-center">
        <article className="max-w-2xl px-4 py-12 mx-auto bg-white border rounded-lg dark:bg-slate-800">
          <header className="mb-8">
            <h1 className="mb-6 text-4xl font-bold">{blog.title}</h1>
            <div className="px-8 text-gray-500 dark:text-slate-400 text-start">
              <span>{blog.author.name}</span> • <time>{"20th Sep 2024"}</time>
            </div>
          </header>
          <img
            src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            alt="Sample"
            className="w-full px-8 rounded-lg"
          />
          <div className="mt-8 border-t border-b">Hi There</div>
          <div className="mb-8"></div>
          <div className="px-8 text-lg leading-8 text-justify">
            <p>{blog.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};
