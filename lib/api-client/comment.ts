import { CommentFormData, CommentResponse, Comments } from "@/types/types";

export async function createComment(data: CommentFormData): Promise<Comments> {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create comment");
  }
  return response.json();
}

export async function fetchComments(
  postId: string,
  page: number = 1,
  limit: number = 10
): Promise<CommentResponse> {
  const response = await fetch(
    `/api/comments?postId=${postId}&page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch comments");
  }

  return response.json();
}
