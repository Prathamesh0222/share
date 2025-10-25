export const generateSlug = (title: string): string => {
  return title.toLowerCase().trim().split(" ").join("-");
};
