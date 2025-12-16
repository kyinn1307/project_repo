import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { ChatInputTool } from "./ChatInputTool";
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatMessage } from "@/types/chat";
import { getUserProfile } from "@/apis/user";
import { Profile } from "@/types/my-profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
interface ChatContainerProps {
  roomId: number | null;
  opponentId: number | null;
  myUserId: number | null;
  chats: ChatMessage[];
  setChats: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const ChatContainer = ({
  roomId,
  opponentId,
  myUserId,
  chats,
  setChats,
}: ChatContainerProps) => {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery<Profile>({
    queryKey: ["profile", opponentId],
    queryFn: async () => {
      const res = await getUserProfile(opponentId!);
      return res.data.data as Profile;
    },
    enabled: !!opponentId,
    staleTime: 60_000,
  });

  // 소켓: 수신 메시지를 로컬 상태 + Query 캐시에 함께 반영
  const { sendMessage } = useChatSocket(roomId!, (newMsg: ChatMessage) => {
    setChats((prev) => [...prev, newMsg]);
    if (roomId) {
      queryClient.setQueryData<ChatMessage[]>(
        ["chat", "messages", roomId],
        (old = []) => [...old, newMsg]
      );
    }
  });

  const handleSend = (text: string) => {
    if (!roomId || !myUserId) return;
    const message: ChatMessage = {
      roomId,
      type: "TALK",
      message: text,
      sender: myUserId,
    };

    sendMessage(message);
  };

  if (!opponentId || !roomId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white text-lg"></div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      {profile && <ChatHeader profile={profile} />}
      {profile && <ChatBody chats={chats} profile={profile} />}
      <ChatInputTool onSend={handleSend} />
    </div>
  );
};
