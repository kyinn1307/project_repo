import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useChatSocket = (
  roomId: number,
  onMessageReceive: (message: ChatMessage) => void
) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: SOCKET_URL,

      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ STOMP connected");

        // 구독 (RabbitMQ에서는 topic 기반으로 pub/sub 수행)
        subscriptionRef.current = client.subscribe(
          `/topic/chat.room.${roomId}`,
          (message: IMessage) => {
            const body: ChatMessage = JSON.parse(message.body);
            onMessageReceive(body);
          }
        );
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      subscriptionRef.current?.unsubscribe();
      clientRef.current?.deactivate();
    };
  }, [roomId]);

  const sendMessage = (message: ChatMessage) => {
    if (clientRef.current?.connected) {
      console.log("🚀 보낸 메시지:", message); // ✅ 이 줄 추가

      clientRef.current.publish({
        destination: "/pub/api/chat/message",
        body: JSON.stringify(message),
      });
    } else {
      console.warn("❗ STOMP client not connected");
    }
  };

  return { sendMessage };
};
