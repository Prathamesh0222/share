const BlogCardSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white border rounded-xl dark:bg-zinc-950 animate-pulse">
      <div className="flex flex-col h-full">
        <div className="aspect-video bg-zinc-300 dark:bg-zinc-700"></div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-16"></div>
            <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-16"></div>
          </div>
          <div className="h-7 bg-zinc-300 dark:bg-zinc-700 rounded mb-3 w-3/4"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
            <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-4/6"></div>
          </div>
          <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="ml-3 space-y-1">
              <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-20"></div>
              <div className="h-2 bg-zinc-300 dark:bg-zinc-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
