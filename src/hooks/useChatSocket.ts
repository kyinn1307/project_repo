import { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/types/chat";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useChatSocket = (
  roomId: number,
  myUserId: number,
  onMessageReceive: (message: ChatMessage) => void,
  onRoomUpdate: (update: {
    roomId: number;
    lastMessage: string;
    unreadCount: number;
    lastMessageTime: string;
    senderId: number;
  }) => void
) => {
  const clientRef = useRef<Client | null>(null);
  const chatSubRef = useRef<StompSubscription | null>(null);
  const roomSubRef = useRef<StompSubscription | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId || !myUserId) return;

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        chatSubRef.current = client.subscribe(
          `/topic/chat.room.${roomId}`,
          (msg) => onMessageReceive(JSON.parse(msg.body))
        );

        roomSubRef.current = client.subscribe(
          `/topic/user.${myUserId}.chatroom-update`,
          (msg) => onRoomUpdate(JSON.parse(msg.body))
        );
      },

      onWebSocketClose: () => setConnected(false),
      onStompError: console.error,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      setConnected(false);
      chatSubRef.current?.unsubscribe();
      roomSubRef.current?.unsubscribe();
      client.deactivate();
    };
  }, [roomId, myUserId]);

  const sendMessage = (message: ChatMessage) => {
    if (!connected || !clientRef.current) return;

    clientRef.current.publish({
      destination: "/pub/api/chat/message",
      body: JSON.stringify(message),
    });
  };

  const sendRead = (roomId: number) => {
    if (!connected || !clientRef.current) return;

    clientRef.current.publish({
      destination: "/pub/api/chat/rooms/read",
      body: JSON.stringify({ roomId }),
    });
  };

  return { sendMessage, sendRead, connected };
};
