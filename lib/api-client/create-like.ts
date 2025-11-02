export const createLike = async (postId: string) => {
  try {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create like");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to create like", error);
    throw new Error("Failed to create like");
  }
};
