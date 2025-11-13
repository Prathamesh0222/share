import { useEffect, useState } from "react";

export const useDebounce = (search: string, delay: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);
    return () => clearTimeout(timer);
  }, [search]);

  return debouncedSearch;
};
