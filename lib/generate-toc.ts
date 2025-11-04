import { TocItem } from "@/types/types";

export const generateToc = (html: string): TocItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const toc: TocItem[] = [];
  let idCounter = 0;

  headings.forEach((heading) => {
    const text = heading.textContent || "";

    const level = parseInt(heading.tagName.charAt(1));

    let id = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = char.charCodeAt(0);

      if (
        (charCode >= 48 && charCode <= 57) ||
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      ) {
        id += char.toLowerCase();
      } else if (char === " " || char === "-" || char === "_") {
        if (id.length > 0 && id[id.length - 1] !== "-") {
          id += "-";
        }
      }
    }

    while (id.endsWith("-")) {
      id = id.slice(0, -1);
    }

    if (!id) {
      id = `heading-${idCounter}`;
      idCounter++;
    }

    let finalId = id;
    let counter = 1;
    while (toc.some((item) => item.id === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    heading.id = finalId;

    toc.push({ id: finalId, text, level });
  });
  return toc;
};

export const addIdsToHeadings = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const toc = generateToc(html);

  headings.forEach((heading, index) => {
    const item = toc[index];
    if (item) heading.id = item.id;
  });

  return doc.body.innerHTML;
};
