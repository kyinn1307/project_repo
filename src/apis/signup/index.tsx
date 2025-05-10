import axiosInstance from "@/apis/axiosInstance";

export interface TermsRequest {
  isOver14: boolean;
  termsOfService: boolean;
  privacyConsent: boolean;
  privacyPolicy: boolean;
  optionalPrivacyConsent: boolean;
}

export interface CompleteSignupRequest {
  selectedFields: string[];
  selectedGenres: string[];
}

export interface PasswordRequest {
  password: string;
  confirmPassword: string;
}

export const postTerms = (data: TermsRequest) => {
  return axiosInstance.post("/signup/terms", data);
};

export const postPassword = (data: PasswordRequest) => {
  return axiosInstance.post("/signup/password", data);
};

export const getSessionPassword = () => {
  return axiosInstance.get("/signup/session-password");
};

export const postNickname = (data: string) => {
  return axiosInstance.post("/signup/nickname", data);
};

export const getSessionNickname = () => {
  return axiosInstance.get("/signup/session-nickname");
};

export const postPhoneNumber = (data: string) => {
  return axiosInstance.post("/signup/phone-number", data);
};

export const getSessionPhoneNumber = () => {
  return axiosInstance.get("/signup/session-phone-number");
};

export const getFieldsGenres = () => {
  return axiosInstance.get("/signup/fields-genres");
};

export const postComplete = (data: CompleteSignupRequest) => {
  return axiosInstance.post("/signup/complete", data);
};
