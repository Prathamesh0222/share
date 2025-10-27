"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Separator } from "./ui/separator";
import { TipTapButtons } from "./tiptap-buttons";
import { TiptapProps } from "@/types/types";

export const Tiptap = ({ content = "", onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border rounded-xl">
        <div className="p-3">
          <TipTapButtons editor={editor} />
        </div>
        <Separator />
        <div className="px-3 dark:bg-input/30 h-90 overflow-auto minimal-scrollbar">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default Tiptap;
