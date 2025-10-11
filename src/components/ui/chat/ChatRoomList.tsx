import { ChatRoom } from "./ChatRoom";
import { ChatRoomHeader } from "./ChatRoomHeader";
import type { ChatRoomPreview } from "@/types/chat";

interface ChatRoomListProps {
  rooms: ChatRoomPreview[];
  onRoomClick: (opponentId: number) => void;
}

export const ChatRoomList = ({ rooms, onRoomClick }: ChatRoomListProps) => {
  return (
    <div className="flex flex-col w-[262.5px] border-r border-white h-full">
      <ChatRoomHeader onSelectUser={onRoomClick} />
      <div className="flex-1 overflow-y-auto">
        {rooms?.map((room) => (
          <ChatRoom key={room.roomId} room={room} onClick={onRoomClick} />
        ))}
      </div>
    </div>
  );
};
