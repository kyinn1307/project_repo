import { useRef, useEffect } from "react";
import { ChatBox } from "./ChatBox";
import type { ChatMessage } from "@/types/chat";

interface ChatBodyProps {
  chats: ChatMessage[];
}

export const ChatBody = ({ chats }: ChatBodyProps) => {
  const myUserId = 1;
  const scrollRef = useRef<HTMLDivElement>(null); // ✅ 스크롤 위치 제어용 ref

  useEffect(() => {
    // ✅ 채팅이 렌더링된 후, 항상 맨 아래로 스크롤 이동
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-[9px] py-[7.5px]">
      {chats.map((chat, idx) => {
        const prevChat = chats[idx - 1];
        const isSameUserAsPrevious = prevChat?.sender === chat.sender;
        const isMe = chat.sender === myUserId;

        return (
          <ChatBox
            key={idx}
            content={chat.message}
            isMe={isMe}
            isContinuous={isSameUserAsPrevious}
          />
        );
      })}
    </div>
  );
};
