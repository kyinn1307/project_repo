import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
} from "lucide-react";
import { Editor } from "@tiptap/core";

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        blockquote: {},
        codeBlock: {},
      }),
      Placeholder.configure({
        placeholder: "가사 또는 생각을 적어주세요.",
      }),
    ],
    content: "",
  });

  return (
    <div className="bg-[#111111] text-white p-[7.5px] rounded-[7.5px]">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[100px] px-[8px] py-[6px] text-sm text-white focus:outline-none"
      />
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor | null }) => {
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
