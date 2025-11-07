"use client";

import { generateToc } from "@/lib/generate-toc";
import { useEffect, useState } from "react";

export function TableOfContents({ content }: { content: string }) {
  const toc = generateToc(content);
  const [activeId, setActiveId] = useState<string>("");

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const setupObserver = () => {
      const headingElements = toc
        .map((item) => {
          const element = document.getElementById(item.id);
          return element ? { element, id: item.id } : null;
        })
        .filter(
          (item): item is { element: HTMLElement; id: string } => item !== null
        );

      if (headingElements.length === 0) {
        timeoutId = setTimeout(setupObserver, 200);
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: "-100px 0px -66% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) {
          const scrolledEntries = entries.filter(
            (entry) => entry.boundingClientRect.top < 150
          );
          if (scrolledEntries.length > 0) {
            const closest = scrolledEntries.reduce((prev, curr) => {
              return curr.boundingClientRect.top > prev.boundingClientRect.top
                ? curr
                : prev;
            });
            setActiveId(closest.target.id);
          }
          return;
        }

        const bestEntry = visibleEntries.reduce((prev, curr) => {
          if (curr.intersectionRatio > prev.intersectionRatio) {
            return curr;
          }
          if (
            curr.intersectionRatio === prev.intersectionRatio &&
            curr.boundingClientRect.top < prev.boundingClientRect.top
          ) {
            return curr;
          }
          return prev;
        });

        setActiveId(bestEntry.target.id);
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);

      headingElements.forEach(({ element }) => {
        observer!.observe(element);
      });

      if (toc.length > 0) {
        setActiveId((prev) => prev || toc[0].id);
      }
    };

    setupObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-8 rounded-lg mb-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <nav>
        <ul className="space-y-3">
          {toc.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <li key={index} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`
                    block pl-4 py-1 transition-all
                    ${
                      isActive
                        ? "text-foreground text-xs font-bold"
                        : "text-muted-foreground text-xs font-semibold"
                    }
                  `}
                  style={{
                    borderLeft: `2px solid ${isActive ? "#ffffff" : "#9ca3af"}`,
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
