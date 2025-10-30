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
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

export const CommentSection = ({
  isOpen,
  onOpenChange,
  postId,
  postAuthorId,
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
            className="flex flex-col gap-0 px-4 overflow-y-auto minimal-scrollbar"
            style={{ maxHeight: "70vh" }}
          >
            {isLoading ? (
              <div className="flex flex-col gap-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <div className="mt-2 space-y-2 pr-6">
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
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
                      {postAuthorId && c.authorId === postAuthorId ? (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0.1"
                        >
                          Author
                        </Badge>
                      ) : null}
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
            <div className="w-full p-4 pt-0">
              <div className="relative w-full rounded-2xl border border-border bg-muted/30 p-4 shadow-sm">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add comment..."
                  aria-label="Add comment"
                  rows={3}
                  className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
                />

                <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
                  <Button
                    onClick={handleSubmit}
                    disabled={isPending || !comment.trim() || !postId}
                    className="h-8 rounded-full bg-orange-600 hover:bg-orange-700 px-3 text-white text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Posting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
