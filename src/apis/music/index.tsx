import axiosInstance from "../axiosInstance";
import { TrackResponse } from "@/types/music";

// 전체 트랙 조회 (메인 페이지)
// export const getAllTracks = async (
//   pageParam?: number
// ): Promise<TrackResponse> => {
//   const query = `/tracks?cursorId=${pageParam}&size=20`;
//   const res = await axiosInstance.get(query);
//   console.log(res.data);
//   return res.data.data;
// };

export const getAllTracks = async (
  pageParam?: number,
  size: number = 20
): Promise<TrackResponse> => {
  const query =
    pageParam !== undefined
      ? `/tracks?cursorId=${pageParam}&size=${size}`
      : `/tracks`;

  const res = await axiosInstance.get(query);
  console.log(res.data.data);
  return res.data.data;
};

// 트랙 업로드
export const uploadTrack = async (formData: FormData) => {
  return axiosInstance.post("/tracks/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 특정 트랙 정보 조회 (트랙 수정 시, 정보 호출)
export const getTrackDetail = async (trackId: number) => {
  const res = await axiosInstance.get(`/tracks/${trackId}`);
  console.log(res.data.data);
  return res.data.data;
};

// 트랙 업데이트
export const updateTrack = async (trackId: number, formData: FormData) => {
  return axiosInstance.put(`/tracks/${trackId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 트랙 삭제하기
export const deleteTrack = async (trackId: number) => {
  return axiosInstance.delete(`/tracks/${trackId}`);
};

// 트랙 좋아요 토글
export const toggleTrackLike = async (trackId: number) => {
  return axiosInstance.post(`/tracks/${trackId}/like`);
};
