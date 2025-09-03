import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/ui/chat/ChatContainer";
import { ChatRoomList } from "@/components/ui/chat/ChatRoomList";
import { checkChatRoom, createChatRoom, fetchChatMessages } from "@/apis/chat";
import { useUserStore } from "@/stores/useUserStore";
import { useSearchParams } from "react-router-dom";
import { ChatMessage } from "@/types/chat";
import { fetchMyChatRooms } from "@/apis/chat";
import type { ChatRoomPreview } from "@/types/chat";
export const ChatPage = () => {
  const [searchParams] = useSearchParams();

  const myUserId = useUserStore((state) => state.userId);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatMessage[]>([]);

  const [rooms, setRooms] = useState<ChatRoomPreview[]>([]);
  const [selectedOpponentId, setSelectedOpponentId] = useState<number | null>(
    () => {
      const idFromParams = searchParams.get("userId");
      return idFromParams ? Number(idFromParams) : null;
    }
  );

  // 채팅방 리스트 정보 조회
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await fetchMyChatRooms();
        setRooms(data);
      } catch (err) {
        console.error("채팅방 리스트 불러오기 실패", err);
      }
    };

    fetchRooms();
  }, []);

  //   ✅ 채팅방 생성 + 기존 메시지 불러오기
  useEffect(() => {
    const initChatRoom = async () => {
      if (!myUserId || selectedOpponentId === null) return;

      try {
        const checkRes = await checkChatRoom(selectedOpponentId);

        let roomIdToUse: number;

        if (checkRes.success && checkRes.roomId !== null) {
          console.log("✅ 기존 채팅방 존재:", checkRes.roomId);
          roomIdToUse = checkRes.roomId;
        } else {
          // ✅ 2. 채팅방 없으면 새로 생성
          console.log("➕ 채팅방 없음 → 새로 생성");
          const { roomId } = await createChatRoom([
            myUserId,
            selectedOpponentId,
          ]);
          roomIdToUse = roomId;
        }

        setRoomId(roomIdToUse);

        const prevMessages = await fetchChatMessages(roomIdToUse);
        console.log("📦 불러온 메시지:", prevMessages);
        setChats(prevMessages);
      } catch (err) {
        console.error("채팅방 초기화 실패", err);
      }
    };

    initChatRoom();
  }, [selectedOpponentId]);

  return (
    <div className="flex h-[calc(100vh-36px)] mt-9 text-white">
      <ChatRoomList
        rooms={rooms}
        onRoomClick={(id) => setSelectedOpponentId(id)}
      />
      <div className="flex-1 h-full overflow-hidden">
        <ChatContainer
          roomId={roomId}
          opponentId={selectedOpponentId} // ✅ 선택된 상대 ID 전달
          myUserId={myUserId}
          chats={chats}
          setChats={setChats}
        />
      </div>
    </div>
  );
};
