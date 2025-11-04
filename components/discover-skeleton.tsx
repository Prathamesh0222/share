import { Skeleton } from "./ui/skeleton";

export const DiscoverSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-12 border border-subtlest rounded-lg overflow-hidden flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 lg:p-6 flex-1">
            <div className="relative h-48 lg:h-80 rounded-lg overflow-hidden order-1 lg:order-2">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="space-y-4 order-2 lg:order-1 flex flex-col h-full p-4 lg:p-0">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 lg:h-10 w-full" />
              <Skeleton className="h-8 lg:h-10 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-span-12 md:col-span-4">
            <div className="border border-subtlest rounded-lg overflow-hidden h-full flex flex-col bg-background">
              <div className="relative h-48 w-full">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-6" />
                    <Skeleton className="h-3 w-6" />
                    <Skeleton className="h-3 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
