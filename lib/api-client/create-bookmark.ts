export const createBookmark = async (postId: string) => {
  try {
    const response = await fetch("/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create bookmark");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to create bookmark", error);
    throw new Error("Failed to create bookmark");
  }
};
