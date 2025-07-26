import { ChatContainer } from "@/components/ui/chat/ChatContainer";
import { ChatRoomList } from "@/components/ui/chat/ChatRoomList";

export const ChatPage = () => {
  return (
    <div className="flex h-[calc(100vh-36px)] mt-9 text-white">
      <ChatRoomList />
      <div className="flex-1 h-full overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
};
