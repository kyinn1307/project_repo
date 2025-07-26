export interface ChatMessage {
  type: "ENTER" | "TALK" | "EXIT";
  roomId: number;
  sender: number;
  message: string;
}
