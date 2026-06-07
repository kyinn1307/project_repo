import { TrackResponse } from "@/types/music";
import axiosInstance from "../axiosInstance";
import { FeedResponse } from "@/types/feed";
import { ProjectResponse } from "@/types/project";

// 유저 프로필 조회
export const getUserProfile = (userId: number | null) => {
  return axiosInstance.get(`/profile/${userId}`);
};

// 유저 트랙 조회
export const getUserTracks = async (
  userId: number,
  cursor?: number,
  size: number = 10
): Promise<TrackResponse> => {
  const res = await axiosInstance.get(`/tracks/user/${userId}`, {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};

// 유저 피드 조회
export const getUserFeeds = async (
  userId: number,
  cursor?: number,
  size: number = 10
): Promise<FeedResponse> => {
  const res = await axiosInstance.get(`/feed/user/${userId}`, {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};

// 유저 프로젝트 조회
export const getUserProjects = async (
  userId: number,
  cursor?: number,
  size: number = 10
): Promise<ProjectResponse> => {
  const res = await axiosInstance.get(`/project/user/${userId}`, {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};
