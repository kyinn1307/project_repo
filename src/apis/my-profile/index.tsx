import axiosInstance from "../axiosInstance";

// 내 프로필 조회
export const getMyProfile = (userId: number) => {
  return axiosInstance.get(`/profile/${userId}`);
};

// 마이 프로필 이미지 업로드
export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/profile/image-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 프로필 텍스트 정보 수정
export const updateProfile = (data: {
  nickname: string;
  phoneNumber: string;
  link: string;
  career: string;
  introduction: string;
  selectedFields: string[];
  selectedGenres: string[];
}) => {
  return axiosInstance.post("/profile/update", data);
};

// 내 음원 목록 조회
export const getMyTracks = () => {
  return axiosInstance.get("/tracks/my");
};

// 내 피드 목록 조회
export const getMyFeeds = () => {
  return axiosInstance.get("/feed/my");
};

// 내 프로젝트 목록 조회
export const getMyProjects = () => {
  return axiosInstance.get("/project/my");
};

// 좋아요 음원 목록 조회
export const getLikedTracks = () => {
  return axiosInstance.get("/tracks/liked");
};

// 좋아요 피드 목록 조회
export const getLikedFeeds = () => {
  return axiosInstance.get("/feed/liked");
};

// 좋아요 프로젝트 목록 조회
export const getLikedProjects = () => {
  return axiosInstance.get("/project/liked");
};
