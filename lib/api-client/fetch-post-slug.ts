export async function fetchPostBySlug(slug: string) {
  const response = await fetch(`/api/post/${slug}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}
