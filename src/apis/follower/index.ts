import axiosInstance from "@/apis/axiosInstance";

export const getFollowerList = (userId: number) =>
  axiosInstance.get(`/follow/${userId}/followers`);

export const getFollowingList = (userId: number) =>
  axiosInstance.get(`/follow/${userId}/following`);

// 유저 팔로우 요청
export const followUser = (targetUserId: number) =>
  axiosInstance.post(`/follow/${targetUserId}`);

// 유저 언팔로우 요청
export const unfollowUser = (targetUserId: number) =>
  axiosInstance.delete(`/follow/${targetUserId}`);

// 유저 언팔로우 요청
export const deleteFollowerUser = (followerUserId: number) =>
  axiosInstance.delete(`/follow/follower/${followerUserId}`);
