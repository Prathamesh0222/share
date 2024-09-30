import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ChangeEvent, FormEvent, useState } from "react";
import { $getRoot, $getSelection, EditorState } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ToolbarPlugin from "./ToolbarPlugin";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BLOG_URL } from "@/constants/config";
import CardProfile from "./CardProfile";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const editorConfig = {
    namespace: "MyEditor",
    theme: {},
    onChange(editorState: EditorState) {
      editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
        console.log(root, selection);
      });
    },
    onError(error: Error) {
      console.error("Lexical Editor Error:", error);
    },
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if(image){
      formData.append("image",image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data',
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
    if(e.target.files && e.target.files.length > 0){
      setImage(e.target.files[0]);
    }
  }

  return (
    <div className="container flex flex-col justify-center h-screen">
      <CardProfile />
      <form onSubmit={handleSubmit}>
        <div className="p-8 bg-white border rounded-lg shadow-lg dark:bg-slate-900">
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
            <LexicalComposer initialConfig={editorConfig}>
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
            </LexicalComposer>
          </div>
          <div className="flex justify-center">
          <Input type="file" onChange={handleImageChange} className="mt-4 w-1/3 cursor-pointer" />
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
