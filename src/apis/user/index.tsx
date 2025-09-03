import { MusicianResponse } from "@/types/musician";
import axiosInstance from "../axiosInstance";

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

// 유저 프로필 조회
export const getUserProfile = (userId: number | null) => {
  return axiosInstance.get(`/profile/${userId}`);
};

// 유저 트랙 조회
export const getUserTracks = ({ userId }: { userId: number }) => {
  return axiosInstance.get(`/tracks/user/${userId}`);
};

// 유저 피드 조회
export const getUserFeeds = (userId: number) => {
  return axiosInstance.get(`/feed/user/${userId}`);
};

// 유저 프로젝트 조회
export const getUserProjects = (userId: number) => {
  return axiosInstance.get(`/project/user/${userId}`);
};
