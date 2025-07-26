import { UserCircle } from "lucide-react";
import clsx from "clsx";

interface ChatBoxProps {
  content: string;
  isMe: boolean;
  isContinuous: boolean;
}

export const ChatBox = ({ content, isMe, isContinuous }: ChatBoxProps) => {
  return (
    <div
      className={clsx(
        "flex w-full px-[9px] py-[3px] text-[13.5px]",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {/* 상대 프로필 */}
      {!isMe && isContinuous && (
        <div className="mr-[7.5px] mt-auto">
          <UserCircle size={25.5} className="text-white" />
        </div>
      )}

      <div
        className={clsx(
          "text-white p-[7.5px] max-w-[500px] break-words whitespace-pre-line",
          isMe ? "bg-[#0050ef]" : "bg-[#777777]",
          "rounded-[7.5px]",

          // 위쪽 radius
          isMe && isContinuous && "rounded-tr-[0px] rounded-br-[7.5px]",
          isMe && !isContinuous && "rounded-tr-[7.5px]",
          !isMe && isContinuous && "rounded-tl-[0px]",
          !isMe && !isContinuous && "rounded-tl-[7.5px] ml-[34px]",

          // 아래쪽 radius
          isMe && "rounded-br-[0px]",
          !isMe && "rounded-bl-[0px]",

          // 상대 연속 채팅 들여쓰기
          !isMe && isContinuous && "ml-[0px] rounded-bl-[7.5px]"
        )}
      >
        {content}
      </div>
    </div>
  );
};
