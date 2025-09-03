import { MusicianResponse } from "@/types/musician";
import axiosInstance from "../axiosInstance";

export const getMusicianSearch = async ({
  nickname,
  cursorId,
  size = 20,
}: {
  nickname: string;
  cursorId?: number;
  size?: number;
}): Promise<MusicianResponse> => {
  const params: Record<string, string | number> = { size, nickname };
  if (cursorId !== undefined) params.cursorId = cursorId;

  const res = await axiosInstance.get("/musician/search", { params });
  console.log("📦 응답:", res.data?.data);
  return res.data?.data;
};
