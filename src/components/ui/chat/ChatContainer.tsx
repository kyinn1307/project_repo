import { useState, useEffect } from "react";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { ChatInputTool } from "./ChatInputTool";
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatMessage } from "@/types/chat";
// import { fetchChatMessages } from "@/apis/chat"; // ✅ import 추가
import { createChatRoom } from "@/apis/chat";

export const ChatContainer = () => {
  const myUserId = 1;
  const [roomId, setRoomId] = useState<number | null>(1);
  const [chats, setChats] = useState<ChatMessage[]>([]);

  //   ✅ 채팅방 생성 + 기존 메시지 불러오기
  useEffect(() => {
    const initRoom = async () => {
      try {
        const { roomId } = await createChatRoom(); // 서버에서 채팅방 생성
        setRoomId(roomId);

        // const prevMessages = await fetchChatMessages(roomId); // 과거 메시지 불러오기
        // console.log("📦 불러온 메시지:", prevMessages);
        // setChats(prevMessages);
      } catch (err) {
        console.error("채팅방 초기화 실패", err);
      }
    };

    initRoom();
  }, []);

  // ✅ 소켓 연결 및 실시간 수신 처리
  const { sendMessage } = useChatSocket(roomId, (newMsg: ChatMessage) => {
    console.log("💬 실시간 메시지 수신:", newMsg);
    setChats((prev) => [...prev, newMsg]);
  });

  // ✅ 메시지 전송 핸들러
  const handleSend = (text: string) => {
    if (!roomId) return;

    const message: ChatMessage = {
      roomId,
      type: "TALK",
      message: text,
      sender: myUserId,
    };

    sendMessage(message);
  };
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <ChatBody chats={chats} />
      <ChatInputTool onSend={handleSend} />
    </div>
  );
};
