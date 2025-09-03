import { useEffect, useState } from "react";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { ChatInputTool } from "./ChatInputTool";
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatMessage } from "@/types/chat";
import { getUserProfile } from "@/apis/user";
import { Profile } from "@/types/my-profile";
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
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!opponentId) return;
      try {
        const data = await getUserProfile(opponentId);
        console.log(data.data.data);
        setProfile(data.data.data);
      } catch (err) {
        console.error("프로필 불러오기 실패", err);
      }
    };

    fetchProfile();
  }, [opponentId]);

  // ✅ 소켓 연결 및 실시간 수신 처리
  const { sendMessage } = useChatSocket(roomId!, (newMsg: ChatMessage) => {
    console.log("💬 실시간 메시지 수신:", newMsg);
    setChats((prev) => [...prev, newMsg]);
  });

  // ✅ 메시지 전송 핸들러
  const handleSend = (text: string) => {
    if (!roomId) return;
    if (!myUserId) return;

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
