import axiosInstance from "../axiosInstance";
import { ChatMessage } from "@/types/chat";

export const fetchChatMessages = async (
  roomId: number
): Promise<ChatMessage[]> => {
  const res = await axiosInstance.get(`/chat/messages/${roomId}`);
  return res.data;
};

export const createChatRoom = async () => {
  const res = await axiosInstance.post(`/chat/rooms/create`);
  console.log(res.data);
  return res.data;
};

export const fetchChatRooms = async () => {
  const res = await axiosInstance.get(`/chat/rooms`);
  return res.data;
};
