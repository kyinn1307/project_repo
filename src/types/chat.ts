export interface ChatMessage {
  type: "ENTER" | "TALK" | "EXIT";
  roomId: number;
  sender: number;
  message: string;
}

export interface ChatRoomCheckResponse {
  success: boolean;
  message: string;
  roomId: number | null;
}

export interface ChatRoomPreview {
  roomId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number | null;
  participantIds: number[];
  nickname: string;
  opponentUserNickname?: string;
  otherProfileImageUrl?: string;
}
