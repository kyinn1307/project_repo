// steps/EmailAuthStep.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { validateAuthCode, resendEmailCode } from "@/apis/email";
import VerificationCodeInput from "@/components/ui/signup/VerificationCodeInput";
import axios from "axios";

export function EmailAuthStep({ onNext }: { onNext: () => void }) {
  const [authCode, setAuthCode] = useState("");
  const [email] = useState("test@example.com");

  return (
    <div>
      <div className="text-white text-base font-medium mb-5">
        {email}로<br />
        발송된 인증번호를 입력해주세요.
      </div>
      <VerificationCodeInput onComplete={setAuthCode} />
      <div className="flex justify-center items-center text-white text-xs mt-[12.25px]">
        30초
      </div>
      <Button
        className={`w-[350px] h-10 text-sm cursor-pointer mt-[4.89px] ${
          authCode.length < 6
            ? "bg-[#555555] text-[#777777]"
            : "bg-[#0050ef] text-white"
        }`}
        disabled={authCode.length < 6}
        onClick={async () => {
          try {
            await validateAuthCode(email, authCode);
            onNext();
          } catch (error) {
            if (axios.isAxiosError(error)) {
              alert(error.response?.data?.message || "인증에 실패했습니다.");
            } else {
              alert("알 수 없는 오류가 발생했습니다.");
            }
          }
        }}
      >
        다음
      </Button>
      <div className="flex justify-center items-center text-white text-xs mt-[3px]">
        인증번호를 못받으셨나요?
        <span
          className="underline cursor-pointer ml-1"
          onClick={async () => {
            try {
              await resendEmailCode(email);
              alert("인증번호가 다시 발송되었습니다.");
            } catch (error) {
              alert("인증번호 재전송에 실패했습니다.");
              console.log(error);
            }
          }}
        >
          인증번호 다시 받기
        </span>
      </div>
    </div>
  );
}
