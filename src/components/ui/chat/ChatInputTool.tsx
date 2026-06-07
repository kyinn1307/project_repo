import { ChatInput } from "./ChatInput";
import { Button } from "../shadcn/button";
import { useState } from "react";
import { ChatOptionModal } from "./ChatOptionModal";

interface ChatInputToolProps {
  onSend: (message: string) => void;
}

export const ChatInputTool = ({ onSend }: ChatInputToolProps) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 조합 상태

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (input.trim() !== "") {
        onSend(input);
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-row items-center h-6 px-[9px] gap-[7.5px]">
      <ChatOptionModal />
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      <Button
        className="w-[61px] h-full bg-[#0050ef]"
        onClick={() => {
          if (input.trim() !== "") {
            onSend(input);
            setInput("");
          }
        }}
      >
        전송
      </Button>
    </div>
  );
};
