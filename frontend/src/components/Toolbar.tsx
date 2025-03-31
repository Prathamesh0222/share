import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  List,
  TextQuote,
} from "lucide-react";
import { useRef } from "react";

export const Toolbar = ({ editor }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !editor) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      }
    };

    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="space-x-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <Heading3 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "dark:bg-white bg-black py-1.5 px-2.5 rounded dark:text-black text-white"
            : "py-1.5 px-2.5 rounded"
        }
      >
        <TextQuote size={16} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={"py-1.5 px-2.5 rounded"}
      >
        <ImageIcon size={16} />
      </button>
    </div>
  );
};
