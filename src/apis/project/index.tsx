import axiosInstance from "../axiosInstance";
import { ProjectResponse } from "@/types/project";

// 전체 프로젝트 정보 조회
export const getAllProjects = async (
  pageParam?: number,
  size: number = 5
): Promise<ProjectResponse> => {
  const params = new URLSearchParams();
  params.append("size", String(size));
  if (pageParam !== undefined) {
    params.append("cursorId", String(pageParam));
  }

  const query = `/project?${params.toString()}`;
  const res = await axiosInstance.get(query);
  return res.data.data;
};

export const getProjectSearch = async ({
  k,
  cursorId,
  size = 20,
}: {
  k: string;
  cursorId?: number;
  size?: number;
}): Promise<ProjectResponse> => {
  const params: Record<string, string | number> = { k, size };
  if (cursorId !== undefined) params.cursorId = cursorId;

  const res = await axiosInstance.get("/project/list/search", { params });
  console.log(res.data.data);
  return res.data?.data;
};

// 프로젝트 업로드
export const uploadProject = async (formData: FormData) => {
  return axiosInstance.post("/project/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 특정 프로젝트 정보 조회 (프로젝트 수정 시, 정보 호출)
export const getProjectDetail = async (projectId: number) => {
  const res = await axiosInstance.get(`/project/${projectId}`);
  console.log(res.data);
  return res.data.data;
};

// 프로젝트 업데이트
export const updateProject = async (projectId: number, formData: FormData) => {
  return axiosInstance.put(`/project/update/${projectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 프로젝트 삭제하기
export const deleteProject = async (projectId: number) => {
  return axiosInstance.delete(`/project/delete/${projectId}`);
};

// 프로젝트 좋아요 토글
export const toggleProjectLike = async (projectId: number) => {
  return axiosInstance.post(`/project/${projectId}/like`);
};
