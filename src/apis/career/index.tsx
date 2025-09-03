import { CareerPayload } from "@/types/career";
import axiosInstance from "../axiosInstance";

// 활동이력 생성
export const createCareer = async (payload: CareerPayload) => {
  return axiosInstance.post("/career", payload);
};

// 활동이력 수정
export const updateCareer = async (
  careerId: number,
  payload: CareerPayload
) => {
  return axiosInstance.put(`/career/${careerId}`, payload);
};

// 활동이력 삭제
export const deleteCareer = async (careerId: number) => {
  return axiosInstance.delete(`/career/${careerId}`);
};

// 활동이력 조회
export const getUserCareers = async (userId: number) => {
  const { data } = await axiosInstance.get(`/career/user/${userId}`);
  return data.data;
};
