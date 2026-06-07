import { TrackResponse } from "@/types/music";
import axiosInstance from "../axiosInstance";
import { FeedResponse } from "@/types/feed";
import { ProjectResponse } from "@/types/project";

// 내 프로필 조회
export const getMyProfile = (userId: number) => {
  return axiosInstance.get(`/profile/${userId}`);
};

// 마이 프로필 이미지 업로드
export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/profile/image-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 프로필 텍스트 정보 수정
export const updateProfile = (data: {
  nickname: string;
  link: string;
  introduction: string;
  selectedFields: string[];
  selectedGenres: string[];
}) => {
  return axiosInstance.post("/profile/update", data);
};

// 내 음원 목록 조회
export const getMyTracks = async (
  cursor?: number,
  size: number = 10
): Promise<TrackResponse> => {
  const res = await axiosInstance.get("/tracks/my", {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};

// 내 피드 목록 조회
export const getMyFeeds = async (
  cursor?: number,
  size: number = 3
): Promise<FeedResponse> => {
  const res = await axiosInstance.get("/feed/my", {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};

// 내 프로젝트 목록 조회
export const getMyProjects = async (
  cursor?: number,
  size: number = 6
): Promise<ProjectResponse> => {
  const res = await axiosInstance.get("/project/my", {
    params: {
      cursor,
      size,
    },
  });
  return res.data.data;
};

// 내 비즈니스 목록 조회
export const getMyBusiness = () => {
  return axiosInstance.get("/business/my");
};

// 좋아요 음원 목록 조회
export const getLikedTracks = () => {
  return axiosInstance.get("/tracks/liked");
};

// 좋아요 피드 목록 조회
export const getLikedFeeds = () => {
  return axiosInstance.get("/feed/liked");
};

// 좋아요 프로젝트 목록 조회
export const getLikedProjects = () => {
  return axiosInstance.get("/project/liked");
};
