import { BusinessPayload, BusinessResponse } from "@/types/business";
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

// 사용자 Business 조회
export async function getUserBusiness(userId: number) {
  const { data } = await axiosInstance.get(`/business/user/${userId}`);
  return data;
}

// 전체 비즈니스 검색 api
export const getAllBusiness = async ({
  k,
  cursorId,
  size = 20,
}: {
  k: string;
  cursorId?: number;
  size?: number;
}): Promise<BusinessResponse> => {
  const params: Record<string, string | number> = { size, k };
  if (cursorId !== undefined) params.cursorId = cursorId;

  const res = await axiosInstance.get("/business/list/search", { params });
  return res.data?.data;
};

// 특정 비즈니스 정보 조회 (비즈니스 수정 시, 정보 호출)
export const getBusinessDetail = async (businessId: number) => {
  const res = await axiosInstance.get(`/business/${businessId}`);
  console.log(res.data);
  return res.data.data;
};
