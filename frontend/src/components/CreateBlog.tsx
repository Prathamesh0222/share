import { ChangeEvent, FormEvent, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import ToolbarPlugin from "./ToolbarPlugin";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BLOG_URL } from "@/constants/config";
import { Toolbar } from "./Toolbar";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTags = e.target.value;
    setTagInput(inputTags);

    const newTags = inputTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    setTags(newTags);
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
        "http://localhost:3000/api/v1/blog",
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
      setImage(e.target.files[0]);
    }
  };
  const extensions = [StarterKit];
  const contents = "<p>Hello World!</p>";

  const editor = useEditor({
    extensions,
    content: contents,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="p-8 border rounded-lg shadow-lg ">
          <div className="mb-4">
            <label className="font-semibold">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Content</label>
            <Toolbar editor={editor} />
            <div className="border rounded-md mt-3">
              <EditorContent editor={editor} />
            </div>

            {/* <LexicalComposer initialConfig={editorConfig}>
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm text- focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                }
                placeholder={null}
                ErrorBoundary={({ children }) => <div>{children}</div>}
              />
              <OnChangePlugin
                onChange={(editorState, editor) => {
                  editor.update(() => {
                    const htmlString = $generateHtmlFromNodes(editor);
                    setContent(htmlString);
                  });
                }}
              />
              <HistoryPlugin />
            </LexicalComposer> */}
          </div>
          <Input
            type="text"
            placeholder="Tags"
            value={tagInput}
            onChange={handleTagsChange}
            className="mt-4"
          />
          <div className="flex justify-center">
            <Input
              type="file"
              onChange={handleImageChange}
              className="mt-4 w-1/3 cursor-pointer"
            />
          </div>
          <Button type="submit" className="mt-4">
            Create Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
