export const fetchUserBookmark = async (page = 1, limit = 10) => {
  try {
    const res = await fetch(`/api/bookmark?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch user bookmark");
    return res.json();
  } catch (error) {
    console.error("Failed to fetch user bookmark", error);
    throw new Error("Failed to fetch user bookmark");
  }
};
