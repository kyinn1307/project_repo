import axiosInstance from "@/apis/axiosInstance";

export const sendEmailCode = (email: string) => {
  return axiosInstance.post("/email/send", { email });
};

export const validateEmailCode = (email: string, code: string) => {
  return axiosInstance.post("/email/validate", { email, code });
};

export const resendEmailCode = (email: string) => {
  return axiosInstance.post("/email/resend", { email });
};
