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
  return res.data?.data;
};

// 뮤지션 전체 조회 (무한스크롤)
export const getAllMusicians = async (
  pageParam?: number,
  size: number = 20
): Promise<MusicianResponse> => {
  const params = new URLSearchParams();
  params.append("size", String(size));
  if (pageParam !== undefined) {
    params.append("cursorId", String(pageParam));
  }

  const query = `/musician/list?${params.toString()}`;
  const res = await axiosInstance.get(query);
  console.log("📦 응답:", res.data.data);
  return res.data.data;
};
