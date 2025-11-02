export const deleteBookmark = async (postId: string) => {
  try {
    const response = await fetch("/api/bookmark", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete bookmark");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to delete bookmark", error);
    throw new Error("Failed to delete bookmark");
  }
};
