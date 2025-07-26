import { ChatRoom } from "./ChatRoom";
import { ChatRoomHeader } from "./ChatRoomHeader";

export const ChatRoomList = () => {
  return (
    <div className="flex flex-col w-[300px] border-r border-white h-full">
      <ChatRoomHeader />
      <div className="flex-1 overflow-y-auto">
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </div>
    </div>
  );
};
