import { BusinessPayload } from "@/types/business";
import axiosInstance from "../axiosInstance";

// Business 등록
export async function createBusiness(payload: BusinessPayload) {
  const { data } = await axiosInstance.post("/business/upload", payload);
  return data;
}

// Business 수정
export async function updateBusiness(
  businessId: number,
  payload: BusinessPayload
) {
  const { data } = await axiosInstance.put(
    `/business/update/${businessId}`,
    payload
  );
  return data;
}

// Business 삭제
export async function deleteBusiness(businessId: number) {
  const { data } = await axiosInstance.delete(`/business/delete/${businessId}`);
  return data;
}
