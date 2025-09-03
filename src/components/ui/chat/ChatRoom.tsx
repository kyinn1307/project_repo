import { MoreInfoIcon } from "@/assets/Icons/my-profile/MoreInfoIcon";
import sample from "@/assets/Images/hmson.png";
import { useUserStore } from "@/stores/useUserStore";
import { ChatRoomPreview } from "@/types/chat";

interface ChatRoomProps {
  room: ChatRoomPreview;
  onClick: (opponentId: number) => void;
}

export const ChatRoom = ({ room, onClick }: ChatRoomProps) => {
  const userId = useUserStore((state) => state.userId);
  const isNew = true; // 추후 백엔드에서 '읽지 않은 메시지 여부' 받을 경우로 대체 가능
  const date = new Date(room.lastMessageTime ?? new Date());
  const lastMessageDate = date.toISOString().slice(0, 10); // "YYYY-MM-DD" 형식

  const opponentId = room.participantIds.find((id) => id !== userId);

  return (
    <div
      onClick={() => opponentId && onClick(opponentId)}
      className="flex flex-row justify-between px-[7.5px] py-[6px] text-[#999999] cursor-pointer"
    >
      <div className="flex flex-row items-center gap-[7.5px]">
        <img
          src={room.otherProfileImageUrl || sample}
          className="w-[30px] h-[30px] rounded-full"
        />
        <div className="flex flex-col gap-[3px]">
          <div className="w-[153px] flex flex-row justify-between">
            <span className="text-[13.5px] text-white">{room.nickname}</span>
            {isNew && <span className="text-[9px]">N</span>}
          </div>
          <span className="text-xs">{room.lastMessage}</span>
        </div>
      </div>

      {/* n인 경우? */}
      {isNew ? (
        <>
          <div className="flex flex-col gap-[15.25px]">
            <div className="flex justify-end py-[2.5px] cursor-pointer">
              <MoreInfoIcon />
            </div>
            <span className="text-[9px] font-medium">{lastMessageDate}</span>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center">
          <div className="flex w-3 h-3 justify-center items-center bg-[#0050ef] rounded-full ">
            <span className="flex justify-center items-center h-[9px] text-[9px] font-medium text-white">
              1
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
