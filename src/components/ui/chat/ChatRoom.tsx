import { MoreInfoIcon } from "@/assets/Icons/my-profile/MoreInfoIcon";
import sample from "@/assets/Images/sample-musician.png";
import { parseLocalTime } from "@/hooks/parseLocalTime";
import { useUserStore } from "@/stores/useUserStore";
import { ChatRoomPreview } from "@/types/chat";

interface ChatRoomProps {
  room: ChatRoomPreview;
  onClick: (opponentId: number) => void;
}

export const ChatRoom = ({ room, onClick }: ChatRoomProps) => {
  const userId = useUserStore((state) => state.userId);
  const date = parseLocalTime(room.lastMessageTime);

  const lastMessageDate = date ? date.toLocaleDateString("ko-KR") : "";

  const opponentId = room.participantIds.find((id) => id !== userId);

  return (
    <div
      onClick={() => opponentId && onClick(opponentId)}
      className="h-[49.75px] flex flex-row justify-between px-[7.5px] py-[6px] text-[#999999] cursor-pointer"
    >
      <div className="flex flex-row items-center gap-[7.5px]">
        <img
          src={room.otherProfileImageUrl || sample}
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[3px]">
          <div className="w-[153px] flex flex-row justify-between">
            <span className="text-[13.5px] text-white">{room.nickname}</span>
            {room.unreadCount !== 0 && <span className="text-[9px]">N</span>}
          </div>
          <span className="text-xs">{room.lastMessage}</span>
        </div>
      </div>

      {/* n인 경우? */}
      <>
        <div className="flex flex-col gap-[15.25px]">
          <div className="flex justify-end py-[2.5px] cursor-pointer">
            <MoreInfoIcon />
          </div>
          <span className="text-[9px] font-medium">{lastMessageDate}</span>
        </div>
      </>
    </div>
  );
};
