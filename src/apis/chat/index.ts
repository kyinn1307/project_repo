import axiosInstance from "../axiosInstance";
import {
  ChatMessage,
  ChatRoomCheckResponse,
  ChatRoomPreview,
} from "@/types/chat";

interface ChatRoomListResponse {
  success: boolean;
  message: string;
  rooms: ChatRoomPreview[];
}

export const fetchChatMessages = async (
  roomId: number
): Promise<ChatMessage[]> => {
  const res = await axiosInstance.get(`/chat/messages/${roomId}`);
  console.log("채팅 내역", res.data.messages);
  return res.data.messages;
};

export const createChatRoom = async (
  participantIds: number[]
): Promise<{ roomId: number }> => {
  const res = await axiosInstance.post("/chat/rooms/create", participantIds);
  return res.data;
};

export const fetchChatRooms = async () => {
  const res = await axiosInstance.get(`/chat/rooms`);
  return res.data;
};

export const checkChatRoom = async (
  partnerUserId: number
): Promise<ChatRoomCheckResponse> => {
  const res = await axiosInstance.get(`/chat/rooms/check/${partnerUserId}`);
  console.log("존재여부", res.data);
  return res.data;
};

export const fetchMyChatRooms = async (): Promise<ChatRoomPreview[]> => {
  const res = await axiosInstance.get<ChatRoomListResponse>("/chat/rooms/my");
  console.log(res.data.rooms);
  return res.data.rooms;
};
