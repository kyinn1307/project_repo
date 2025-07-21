import { loginCheck } from "@/apis/login";

export const checkLogin = async (): Promise<number | null> => {
  try {
    const res = await loginCheck();
    const userIdMatch = res.data.message.match(/\d+/);
    if (userIdMatch) {
      return parseInt(userIdMatch[0], 10);
    } else {
      throw new Error("userId not found in message");
    }
  } catch (error) {
    console.error("로그인 확인 실패:", error);
    return null;
  }
};
