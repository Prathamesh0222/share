import { CreatePostPayload } from "@/types/types";

export const createPost = async (data: CreatePostPayload) => {
  const response = await fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create post");
  }
  return response.json();
};
