import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { ChatInputTool } from "./ChatInputTool";
import { useChatSocket } from "@/hooks/useChatSocket";
import { ChatMessage, ChatRoomPreview } from "@/types/chat";
import { getUserProfile } from "@/apis/user";
import { Profile } from "@/types/my-profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { moveChatRoomToTop } from "@/hooks/moveChatRoomToTop";
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
  const hasReadRef = useRef(false);

  const { data: profile } = useQuery<Profile>({
    queryKey: ["profile", opponentId],
    queryFn: async () => {
      const res = await getUserProfile(opponentId!);
      return res.data.data as Profile;
    },
    enabled: !!opponentId,
    staleTime: 60_000,
  });

  const { sendMessage, sendRead, connected } = useChatSocket(
    roomId!,
    myUserId!,
    (newMsg) => {
      setChats((prev) => [...prev, newMsg]);

      queryClient.setQueryData<ChatRoomPreview[]>(
        ["chat", "rooms", myUserId],
        (old = []) =>
          moveChatRoomToTop(old, newMsg.roomId, (room) => ({
            ...room,
            lastMessage: newMsg.message,
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
          }))
      );
    },
    (roomUpdate) => {
      queryClient.setQueryData<ChatRoomPreview[]>(
        ["chat", "rooms", myUserId],
        (old = []) =>
          moveChatRoomToTop(old, roomUpdate.roomId, (room) => ({
            ...room,
            unreadCount: roomUpdate.unreadCount,
            lastMessage: roomUpdate.lastMessage,
            lastMessageTime: roomUpdate.lastMessageTime,
          }))
      );
    }
  );

  const handleSend = (text: string) => {
    if (!roomId || !myUserId) return;

    const message: ChatMessage = {
      roomId,
      type: "TALK",
      message: text,
      sender: myUserId,
    };

    // chat rooms optimistic + 맨 위 이동
    queryClient.setQueryData<ChatRoomPreview[]>(
      ["chat", "rooms", myUserId],
      (old = []) =>
        moveChatRoomToTop(old, roomId, (room) => ({
          ...room,
          lastMessage: text,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
        }))
    );

    sendMessage(message);
  };

  useEffect(() => {
    if (!roomId || !myUserId || !connected) return;
    if (hasReadRef.current) return;

    // 서버에 읽음 전송
    sendRead(roomId);

    // Optimistic Update (N만 제거, 순서 유지)
    queryClient.setQueryData<ChatRoomPreview[]>(
      ["chat", "rooms", myUserId],
      (old = []) =>
        old.map((room) =>
          room.roomId === roomId ? { ...room, unreadCount: 0 } : room
        )
    );

    hasReadRef.current = true;
  }, [roomId, myUserId, connected]);

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
