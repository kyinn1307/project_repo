import axiosInstance from "../axiosInstance";

// 로그인
export const login = (email: string, password: string) => {
  return axiosInstance.post("/auth/login", { email, password });
};

// 로그인 여부 체크
export const loginCheck = () => {
  return axiosInstance.get("/auth/check");
};

// 아이디 찾기
export const postFindId = (phoneNumber: string) => {
  return axiosInstance.post("/findid/check", { phoneNumber });
};

// 비밀번호 재설정 링크
export const postSendPwLink = (email: string) => {
  return axiosInstance.post("/reset/sendLink", { email });
};

// // 비밀번호 재설정
// export const postUpdatePw = (data) => {
//   return axiosInstance.post("/reset/sendLink", { email });
// };

// 로그아웃
export const logout = () => {
  return axiosInstance.post("/auth/logout");
};
