"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Image as ImageIcon, Trash, X } from "lucide-react";
import Image from "next/image";
import { useCreatePost } from "@/hooks/use-create-post";
import Tiptap from "@/components/titptap";
import { toast } from "sonner";

export default function PublishPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [tagsList, setTagslist] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess: () => {
      setTitle("");
      setContent("");
      setTags("");
      setTagslist([]);
      setFile(null);
    },
  });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tags.trim()) {
      e.preventDefault();
      addTags(tags.trim());
    }
  };

  const addTags = (tagInput: string) => {
    const newTags = tagInput
      .trim()
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0 && tag.length <= 30)
      .filter((tag) => !tagsList.includes(tag));

    if (tagsList.length + newTags.length > 10) {
      const remainingSlots = 10 - tagsList.length;
      if (remainingSlots <= 0) {
        toast.error("Maximum 10 tags allowed. Please remove some tags first.");
        return;
      }
      const limitedTags = newTags.slice(0, remainingSlots);
      setTagslist([...tagsList, ...limitedTags]);
      if (newTags.length > remainingSlots) {
        toast.warning(
          `Only ${remainingSlots} more tags allowed. Added: ${limitedTags.join(
            ", "
          )}`
        );
      }
    } else {
      setTagslist([...tagsList, ...newTags]);
    }
    setTags("");
  };

  const handleRemoveTag = (tagsId: string) => {
    setTagslist(tagsList.filter((tag) => tag !== tagsId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost({
      title,
      content,
      tags: tagsList,
      image: file || undefined,
    });
  };

  return (
    <>
      <DiscoverHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Title</Label>
              <Input
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Tags</Label>
                <span className="text-xs text-muted-foreground">
                  {tagsList.length}/10 tags
                </span>
              </div>
              <Input
                placeholder="Type tags separated by commas and press Enter"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full"
                disabled={tagsList.length >= 10}
              />
              <div className="mt-3 min-h-[80px] p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                {tagsList.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No tags added yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {tagsList.map((tag) => (
                        <Badge key={tag} className="bg-green-500 text-xs">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {tagsList.length >= 8 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {tagsList.length === 10
                          ? "Maximum tags reached"
                          : `${10 - tagsList.length} more tags allowed`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Cover Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-600 transition-colors">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {!file ? (
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center py-10 cursor-pointer"
                  >
                    <ImageIcon className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-sm">Click to upload image</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Max 10MB
                    </span>
                  </label>
                ) : (
                  <div className="relative group">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Cover image preview"
                      width={800}
                      height={192}
                      className="w-full h-48 object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => setFile(null)}
                        className="bg-red-500 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                      <span className="text-xs text-white truncate">
                        {file.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <Label className="text-sm font-medium mb-2">Content</Label>
            <Tiptap
              content={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
              className="bg-input/30 h-95 rounded-b-xl"
            />
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-white px-6"
            >
              {isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
