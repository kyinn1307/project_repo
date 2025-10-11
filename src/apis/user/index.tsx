import axiosInstance from "../axiosInstance";

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

// 유저 팔로우 요청
export const followUser = (targetUserId: number) =>
  axiosInstance.post(`/follow/${targetUserId}`);

// 유저 언팔로우 요청
export const unfollowUser = (targetUserId: number) =>
  axiosInstance.delete(`/follow/${targetUserId}`);
