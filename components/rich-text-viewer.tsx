"use client";

import { generateToc } from "@/lib/generate-toc";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export function RichTextViewer({ html }: { html: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: html,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(html);

      setTimeout(() => {
        const toc = generateToc(html);
        const editorElement = editor.view.dom;
        const headings = editorElement.querySelectorAll(
          "h1, h2, h3, h4, h5, h6"
        );

        headings.forEach((heading, index) => {
          const tocItem = toc[index];
          if (tocItem) {
            heading.id = tocItem.id;
          }
        });
      }, 100);
    }
  }, [editor, html]);

  if (!editor) return null;

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <EditorContent editor={editor} />
    </div>
  );
}
