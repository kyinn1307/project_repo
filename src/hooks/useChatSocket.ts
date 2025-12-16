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

      // debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        subscriptionRef.current = client.subscribe(
          `/topic/chat.room.${roomId}`,
          (message: IMessage) => {
            const body: ChatMessage = JSON.parse(message.body);
            onMessageReceive(body);
          }
        );
      },
      onStompError: (frame) => {
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
      clientRef.current.publish({
        destination: "/pub/api/chat/message",
        body: JSON.stringify(message),
      });
    } else {
      console.warn("STOMP client not connected");
    }
  };

  return { sendMessage };
};
