import axiosInstance from "../axiosInstance";

// 피드 업로드
export const uploadFeed = async (formData: FormData) => {
  return axiosInstance.post("/feed/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 특정 피드 정보 조회 (트랙 수정 시, 정보 호출)
export const getFeedDetail = async (feedId: number) => {
  const res = await axiosInstance.get(`/feed/${feedId}`);
  return res.data.data;
};

// 피드 업데이트
export const updateFeed = async (formData: FormData) => {
  return axiosInstance.post(`/feed/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 피드 삭제하기
export const deleteFeed = async (feedId: number) => {
  return axiosInstance.delete(`/feed/delete/${feedId}`);
};

// 피드 좋아요 토글
export const toggleFeedLike = async (feedId: number) => {
  return axiosInstance.post(`/feed/${feedId}/like`);
};
