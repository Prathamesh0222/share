export const formatTimeAgo = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 5) return "now";
  if (diffSec < 60) return `${diffSec}s`;
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHr < 24) return `${diffHr}h`;
  if (diffDay < 7) return `${diffDay}d`;

  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const sameYear = now.getFullYear() === date.getFullYear();
  if (!sameYear) opts.year = "numeric";
  return date.toLocaleDateString(undefined, opts);
};
