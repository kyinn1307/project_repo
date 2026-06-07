import { useRef, useEffect } from "react";
import { ChatBox } from "./ChatBox";
import type { ChatMessage } from "@/types/chat";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/types/my-profile";

interface ChatBodyProps {
  chats: ChatMessage[];
  profile: Profile;
}

export const ChatBody = ({ chats, profile }: ChatBodyProps) => {
  const myUserId = useUserStore((state) => state.userId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-[9px] py-[7.5px]">
      {chats.map((chat, idx) => {
        const next = chats[idx + 1];
        const prevChat = chats[idx - 1];
        const isSameUserAsPrevious = prevChat?.sender === chat.sender;
        const isMe = chat.sender === myUserId;
        const isLast = !next || next.sender !== chat.sender;
        const lastOpponentIndex = [...chats]
          .map((c, i) => ({ c, i }))
          .filter(({ c }) => c.sender !== myUserId)
          .pop()?.i;
        const isLastOpponentMessage = idx === lastOpponentIndex;

        return (
          <ChatBox
            key={idx}
            content={chat.message}
            isMe={isMe}
            isContinuous={isSameUserAsPrevious}
            isLast={isLast}
            isLastOpponentMessage={isLastOpponentMessage}
            profile={profile}
          />
        );
      })}
    </div>
  );
};
