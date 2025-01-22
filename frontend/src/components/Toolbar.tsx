import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  TextQuote,
} from "lucide-react";

export const Toolbar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }
  console.log(editor.isActive("bold"));
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
        <Bold size={20} />
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
        <Italic size={20} />
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
        <Heading1 size={20} />
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
        <Heading2 size={20} />
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
        <Heading3 size={20} />
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
        <List size={20} />
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
        <TextQuote size={20} />
      </button>
    </div>
  );
};
