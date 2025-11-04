export function generateSummary(html: string, maxLength: number = 200): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const paragraphs = doc.querySelectorAll("p");
  const headings = doc.querySelectorAll("h1, h2, h3");

  const skipPhrases = [
    "introduction",
    "welcome",
    "in this article",
    "in this post",
    "in this blog",
    "let's start",
    "let us start",
    "today we",
    "today i",
  ];

  const isGenericIntro = (text: string): boolean => {
    const lowerText = text.toLowerCase().trim();
    return skipPhrases.some((phrase) => lowerText.startsWith(phrase));
  };

  const getCleanText = (element: Element): string => {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  };

  let summary = "";

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const text = getCleanText(paragraph);

    if (text.length < 20) continue;

    if (isGenericIntro(text)) continue;

    summary = text;
    break;
  }

  if (!summary || summary.length < 30) {
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const text = getCleanText(heading);

      if (text.length > 10 && !isGenericIntro(text)) {
        let nextElement = heading.nextElementSibling;
        while (nextElement && nextElement.tagName !== "P") {
          nextElement = nextElement.nextElementSibling;
        }

        if (nextElement) {
          const paraText = getCleanText(nextElement);
          if (paraText.length >= 30) {
            summary = paraText;
            break;
          }
        }
      }
    }
  }

  if (!summary || summary.length < 30) {
    const bodyText = doc.body.textContent || "";
    const cleaned = bodyText.replace(/\s+/g, " ").trim();

    const sentences = cleaned
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 20);

    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!isGenericIntro(trimmed) && trimmed.length >= 30) {
        summary = trimmed;
        break;
      }
    }

    if (!summary) {
      summary = cleaned.substring(0, maxLength * 2);
    }
  }

  if (summary.length > maxLength) {
    const trimmed = summary.substring(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    summary =
      lastSpace > 0 ? trimmed.substring(0, lastSpace) + "..." : trimmed + "...";
  }

  return summary;
}
