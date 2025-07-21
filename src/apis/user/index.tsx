import axiosInstance from "../axiosInstance";

// 유저 프로필 조회
export const getUserProfile = (userId: number) => {
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
