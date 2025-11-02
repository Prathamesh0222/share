export const deleteLike = async (postId: string) => {
  try {
    const response = await fetch("/api/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete like");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to delete like", error);
    throw new Error("Failed to delete like");
  }
};
