const BlogCardSkeleton = () => {
  return (
    <main className="p-4 mx-auto bg-white border rounded-xl dark:bg-slate-950 max-w-7xl sm:p-6 lg:p-8 animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="flex justify-center mb-4 sm:mb-0 sm:mr-6 sm:w-1/3">
          <div className="object-cover w-full h-48 rounded-lg bg-gray-300 dark:bg-gray-700 lg:h-48 md:h-full lg:w-full"></div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="mt-2 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="pr-12 mt-4 mb-4 text-justify bg-gray-300 dark:bg-gray-700 h-24 rounded"></div>
          <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="object-cover w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 sm:h-12 sm:w-12"></div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
          <div className="mt-6 space-x-3">
            <div className="inline-block h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            <div className="inline-block h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            <div className="inline-block h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogCardSkeleton;
