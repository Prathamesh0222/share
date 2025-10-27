import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code2,
  Quote,
  Minus,
  Undo2,
  Redo2,
} from "lucide-react";

export const TipTapButtons = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });
  return (
    <div className="control-group mb-2">
      <div className="button-group space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={
            editorState.isBold
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Bold className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={
            editorState.isItalic
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Italic className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={
            editorState.isStrike
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Strikethrough className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={
            editorState.isCode
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Code className="size-3.5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editorState.isHeading1
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Heading1 className="size-3.5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editorState.isHeading2
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Heading2 className="size-3.5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editorState.isHeading3
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Heading3 className="size-3.5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editorState.isBulletList
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <List className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editorState.isOrderedList
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <ListOrdered className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editorState.isCodeBlock
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Code2 className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editorState.isBlockquote
              ? "bg-green-500 rounded-sm p-2 text-white"
              : "p-2 rounded-sm border"
          }
        >
          <Quote className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-sm border"
        >
          <Minus className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className="p-2 rounded-sm border disabled:opacity-50"
        >
          <Undo2 className="size-3.5" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className="p-2 rounded-sm border disabled:opacity-50"
        >
          <Redo2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
