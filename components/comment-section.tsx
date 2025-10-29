import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useComments, useCreateComment } from "@/hooks/use-comment";
import { formatTimeAgo } from "@/lib/format-time";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { CommentSectionProps } from "@/types/types";

export const CommentSection = ({
  isOpen,
  onOpenChange,
  postId,
}: CommentSectionProps) => {
  const { data, isLoading, error } = useComments(postId || "", 1, 20);
  const { mutate: createComment, isPending } = useCreateComment();
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!postId || !comment.trim()) return;
    createComment(
      { postId, comment: comment.trim() },
      {
        onSuccess: () => {
          setComment("");
        },
      }
    );
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <span className="flex items-center gap-2">
                <MessageCircle className="size-5 text-green-500" />
                <span>
                  <h3 className="text-green-500">Comments</h3>
                  <p className="text-xs text-muted-foreground">
                    {" "}
                    Read and write comments for this post.
                  </p>
                </span>
              </span>
            </SheetTitle>
            <SheetDescription>
              {error && "Failed to load comments"}
            </SheetDescription>
          </SheetHeader>
          <div
            className="flex flex-col gap-0 px-4 overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            {isLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading comments...
              </div>
            ) : data && data.comments.length > 0 ? (
              data.comments.map((c) => (
                <div key={c.id} className="flex gap-3 p-2">
                  <div className="flex items-center justify-center h-9 w-9 rounded-full bg-green-500 text-white border border-red-500/15 text-sm font-semibold">
                    {(c.author?.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">
                        {c.author?.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {formatTimeAgo(c.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 mr-4 text-sm leading-relaxed text-foreground/90 wrap-break-word">
                      {c.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No comments yet.
              </div>
            )}
          </div>
          <SheetFooter>
            <div className="flex items-center w-full p-3 gap-2 pt-0">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                aria-label="Write a comment"
                rows={3}
                className="w-full min-h-24 resize-none rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm placeholder:text-muted-foreground/70 shadow-sm transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isPending || !comment.trim() || !postId}
                  className="h-9 rounded-md bg-primary px-3 text-primary-foreground disabled:opacity-50"
                >
                  {isPending ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
