import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/ui/chat/ChatContainer";
import { ChatRoomList } from "@/components/ui/chat/ChatRoomList";
import { checkChatRoom, createChatRoom, fetchChatMessages } from "@/apis/chat";
import { useUserStore } from "@/stores/useUserStore";
import { useSearchParams } from "react-router-dom";
import { ChatMessage } from "@/types/chat";
import { fetchMyChatRooms } from "@/apis/chat";
import type { ChatRoomPreview } from "@/types/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const myUserId = useUserStore((state) => state.userId);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatMessage[]>([]);

  const [selectedOpponentId, setSelectedOpponentId] = useState<number | null>(
    () => {
      const idFromParams = searchParams.get("userId");
      return idFromParams ? Number(idFromParams) : null;
    }
  );

  // 1) 내 채팅방 목록
  const { data: rooms = [] } = useQuery<ChatRoomPreview[]>({
    queryKey: ["chat", "rooms", myUserId],
    queryFn: fetchMyChatRooms,
    enabled: !!myUserId,
    staleTime: 30_000,
  });

  // 2) 상대 선택 시 방 보장(check → 없으면 create)
  const ensureRoom = useMutation({
    mutationFn: async (opponentId: number) => {
      const res = await checkChatRoom(opponentId);
      if (res.success && res.roomId != null) return res.roomId;
      const created = await createChatRoom([myUserId!, opponentId]);
      return created.roomId;
    },
    onSuccess: async (rid: number) => {
      setRoomId(rid);
      await queryClient.invalidateQueries({
        queryKey: ["chat", "rooms", myUserId],
      });
    },
    onError: (err) => {
      console.error("채팅방 초기화 실패", err);
    },
  });

  useEffect(() => {
    if (!myUserId || selectedOpponentId == null) return;
    ensureRoom.mutate(selectedOpponentId);
  }, [myUserId, selectedOpponentId]);

  const { data: chatsData } = useQuery<ChatMessage[]>({
    queryKey: ["chat", "messages", roomId],
    queryFn: () => fetchChatMessages(roomId!),
    enabled: !!roomId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (chatsData) setChats(chatsData);
  }, [chatsData]);

  return (
    <div className="flex h-[calc(100vh-36px)] mt-9 text-white">
      <ChatRoomList
        rooms={rooms}
        onRoomClick={(id) => setSelectedOpponentId(id)}
      />
      <div className="flex-1 h-full overflow-hidden">
        <ChatContainer
          roomId={roomId}
          opponentId={selectedOpponentId}
          myUserId={myUserId}
          chats={chats}
          setChats={setChats}
        />
      </div>
    </div>
  );
};
