import axiosInstance from "@/apis/axiosInstance";

export const getFollowerList = (userId: number) =>
  axiosInstance.get(`/follow/${userId}/followers`);

export const getFollowingList = (userId: number) =>
  axiosInstance.get(`/follow/${userId}/following`);
