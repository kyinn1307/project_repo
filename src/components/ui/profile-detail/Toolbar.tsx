import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
} from "lucide-react";

export const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-[12px] items-center px-2 py-1 border-b border-[#555] text-[#888]">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="w-[18px] h-[18px]" />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="w-[18px] h-[18px]" />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="w-[18px] h-[18px]" />
      </button>

      <div className="w-[1px] h-[18px] bg-[#444]" />

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="w-[18px] h-[18px]" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="w-[18px] h-[18px]" />
      </button>

      <div className="w-[1px] h-[18px] bg-[#444]" />

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="w-[18px] h-[18px]" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
};
