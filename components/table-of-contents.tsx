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

    const timer = setTimeout(() => {
      const headingElements = toc
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter(
            (entry) => entry.isIntersecting
          );

          if (visibleEntries.length > 0) {
            const sorted = visibleEntries.sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );
            setActiveId(sorted[0].target.id);
          } else {
            const aboveTop = entries
              .filter((entry) => entry.boundingClientRect.top < 0)
              .sort(
                (a, b) => b.boundingClientRect.top - a.boundingClientRect.top
              );

            if (aboveTop.length > 0) {
              setActiveId(aboveTop[0].target.id);
            }
          }
        },
        {
          root: null,
          rootMargin: "-80px 0px -70% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      headingElements.forEach((el) => observer!.observe(el));
    }, 300);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-8 rounded-lg mb-6 mt-12  overflow-y-auto">
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
