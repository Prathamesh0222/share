"use client";

import { Suspense } from "react";
import { DiscoverHeader } from "@/components/discover-header";
import { DiscoverSkeleton } from "@/components/discover-skeleton";
import { DiscoverContent } from "@/components/discover-content";

export default function Discover() {
  return (
    <Suspense
      fallback={
        <div>
          <DiscoverHeader />
          <DiscoverSkeleton />
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
1;
