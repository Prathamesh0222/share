import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, BLOG_URL } from "@/constants/config";
import { Toolbar } from "./Toolbar";
import { Badge } from "./ui/badge";
import { ArrowDown, ImagePlus, Trash, X } from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (tags.includes(newTag)) {
        toast.error("Duplicate tags are not allowed");
      } else {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTagInput = (tagId: string) => {
    setTags(tags.filter((tag) => tag !== tagId));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("tags", tags.join(","));

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.id) {
        throw new Error("Failed to create blog");
      } else {
        toast("Blog created successfully");
        navigate(BLOG_URL);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to create blog");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const extensions = [StarterKit];

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      editor.commands.scrollIntoView();
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center min-h-screen mt-12 mb-12 md:mb-0 px-4 md:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-background p-8 border rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80">
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-foreground mb-2">
                Title
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-foreground bg-background focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="relative">
              <label className="block font-medium text-foreground mb-2">
                Content
              </label>
              <div className="absolute z-10 p-2 border w-full bg-background">
                <Toolbar editor={editor} className="fixed rounded-t-lg" />
              </div>
              <div className="border rounded-b-lg bg-background overflow-auto editor-container scrollbar">
                <EditorContent editor={editor} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <div>
                  <label className="block font-medium text-foreground mb-2">
                    Tags
                  </label>
                  <Input
                    type="text"
                    placeholder="Press enter to add the tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInput}
                    className="w-full text-foreground bg-background focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="cursor-pointer hover:bg-primary/80 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-1">
                        {tag}
                        <X
                          size={14}
                          className="hover:text-red-500 transition-colors"
                          onClick={() => removeTagInput(tag)}
                        />
                      </span>
                    </Badge>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      No tags added yet. Type a tag and press Enter.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full">
                  <label className="block font-medium text-foreground mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 transition-all hover:border-primary dark:hover:border-primary/80">
                    {!imagePreview ? (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                          <ImagePlus />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Drag and drop your image here or click to browse
                        </p>
                        <ArrowDown className="text-muted-foreground" />
                        <Input
                          type="file"
                          onChange={handleImageChange}
                          required
                          className="w-full max-w-xs cursor-pointer"
                          accept="image/*"
                        />
                      </div>
                    ) : (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                            onClick={() => {
                              setImagePreview(null);
                              setImage(null);
                            }}
                          >
                            <Trash />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
              >
                Create Blog
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
