import axiosInstance from "@/apis/axiosInstance";

export const sendEmailCode = (email: string) => {
  return axiosInstance.post("/email/send", { email });
};

export const validateAuthCode = (email: string, authCode: string) => {
  return axiosInstance.post("/email/validate", { email, authCode });
};

export const resendEmailCode = (email: string) => {
  return axiosInstance.post("/email/resend", { email });
};
