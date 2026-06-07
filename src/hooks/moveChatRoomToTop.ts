import { ChatRoomPreview } from "@/types/chat";

export function moveChatRoomToTop(
  rooms: ChatRoomPreview[],
  roomId: number,
  updater?: (room: ChatRoomPreview) => ChatRoomPreview
) {
  const target = rooms.find((r) => r.roomId === roomId);
  if (!target) return rooms;

  const updatedTarget = updater ? updater(target) : target;

  return [updatedTarget, ...rooms.filter((r) => r.roomId !== roomId)];
}
