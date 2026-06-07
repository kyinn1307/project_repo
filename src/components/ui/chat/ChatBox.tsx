import clsx from "clsx";
import { Profile } from "@/types/my-profile";
import sample from "@/assets/Images/sample-musician.png";

interface ChatBoxProps {
  content: string;
  isMe: boolean;
  isContinuous: boolean;
  isLast: boolean;
  isLastOpponentMessage: boolean;
  profile: Profile;
}

export const ChatBox = ({
  content,
  isMe,
  isContinuous,
  profile,
  isLast,
  isLastOpponentMessage,
}: ChatBoxProps) => {
  return (
    <div
      className={clsx(
        "flex w-full px-[9px] py-[3px] text-[13.5px]",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {/* 상대 프로필 */}
      {!isMe && isLast && isLastOpponentMessage && (
        <div className="mr-[7.5px] mt-auto">
          {profile?.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt="상대 프로필"
              className="w-[25.5px] h-[25.5px] rounded-full object-cover"
            />
          ) : (
            <img
              src={sample}
              alt="상대 프로필"
              className="w-[25.5px] h-[25.5px] rounded-full object-cover"
            />
          )}
        </div>
      )}

      <div
        className={clsx(
          "text-white p-[7.5px] max-w-[500px] break-words whitespace-pre-line",
          isMe ? "bg-[#0050ef]" : "bg-[#777777]",
          "rounded-[7.5px]",

          // 위쪽 radius
          !isMe && !isLastOpponentMessage && isLast && "ml-[34px]",
          isMe && isContinuous && "rounded-tr-[0px] rounded-br-[7.5px]",
          isMe && !isContinuous && "rounded-tr-[7.5px]",

          !isMe && isContinuous && "rounded-tl-[0px]",
          !isMe && !isContinuous && "rounded-tl-[7.5px]",
          !isMe && !isLast && "ml-[34px]",

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
