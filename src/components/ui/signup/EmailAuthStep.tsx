import { useState } from "react";
import { Button } from "@/components/ui/button";
import { validateAuthCode, resendEmailCode } from "@/apis/email";
import VerificationCodeInput from "@/components/ui/signup/VerificationCodeInput";

interface EmailAuthStepProps {
  email: string;
  onNext: () => void;
}

export function EmailAuthStep({ email, onNext }: EmailAuthStepProps) {
  const [authCode, setAuthCode] = useState("");

  const handleValidate = async () => {
    console.log("👉 인증 요청 시작", { email, authCode }); // 먼저 로그 찍기
    console.log("document.cookie:", document.cookie);

    try {
      const success = await validateAuthCode(email, authCode);
      console.log("응답 성공:", success);

      if (success) {
        console.log("✅ 인증 성공");
        onNext();
      } else {
        console.log("❌ 인증 실패");
        console.log("document.cookie:", document.cookie);
        alert("인증 실패. 코드를 확인해주세요.");
      }
    } catch (err) {
      console.error("❌ 인증 요청 실패", err);
    }
  };

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
        onClick={handleValidate}
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
