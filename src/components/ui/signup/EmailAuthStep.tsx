import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { validateAuthCode, resendEmailCode } from "@/apis/email";
import VerificationCodeInput from "@/components/ui/signup/VerificationCodeInput";

interface EmailAuthStepProps {
  email: string;
  timer: string;
  onNext: () => void;
}

export function EmailAuthStep({ email, timer, onNext }: EmailAuthStepProps) {
  const [authCode, setAuthCode] = useState("");
  const [countdown, setCountdown] = useState<number>(parseInt(timer, 10));
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 이메일 인증번호 확인
  const handleValidate = async () => {
    try {
      const res = await validateAuthCode(email, authCode);
      console.log("응답 성공:", res);

      if (res) {
        console.log("인증 성공");
        onNext();
      } else {
        console.log("인증 실패");
      }
    } catch (err) {
      setValidationError(true);
      console.error("❌ 인증 요청 실패", err);
    }
  };

  // 이메일 인증번호 재전송
  const handleResend = async () => {
    try {
      console.log("인증번호 재전송 성공");
      const res = await resendEmailCode(email);
      setCountdown(parseInt(res.data.timer, 10));
      setAuthCode("");
    } catch (err) {
      console.error("인증번호 재전송 실패:", err);
    }
  };

  return (
    <div>
      <div className="text-white text-base font-medium mb-5">
        {email}로<br />
        발송된 인증번호를 입력해주세요.
      </div>
      <VerificationCodeInput
        onComplete={(value) => {
          setAuthCode(value);
          setValidationError(false);
        }}
        onChange={(vals) => {
          setValidationError(false);

          if (vals.some((v) => v === "")) {
            setAuthCode("");
          }
        }}
      />
      {validationError ? (
        <div className="flex justify-center text-red-500 text-xs mt-[14.49px]">
          인증번호가 틀렸습니다. 다시 입력해주세요.
        </div>
      ) : countdown > 0 ? (
        <div className="flex justify-center text-white text-xs mt-[12.25px]">
          {formatTime(countdown)}
        </div>
      ) : (
        <div className="flex justify-center items-center text-xs mt-[14.49px]">
          <span className="text-[#e33629]">시간이 초과되었습니다.</span>
          <button
            className="text-[#777777] underline ml-[6px] cursor-pointer"
            onClick={handleResend}
          >
            다시 받기
          </button>
        </div>
      )}

      <Button
        className={`w-full h-10 text-sm cursor-pointer mt-[4.89px] rounded-[5px] ${
          authCode.length < 6
            ? "bg-[#555555] text-[#777777]"
            : "bg-[#0050ef] text-white"
        }`}
        disabled={authCode.length < 6}
        onClick={handleValidate}
      >
        다음
      </Button>
      <div className="flex justify-center items-center text-white text-xs mt-[3px] font-normal">
        인증번호를 못받으셨나요?
        <span
          className="underline cursor-pointer ml-[6px]"
          onClick={handleResend}
        >
          인증번호 다시 받기
        </span>
      </div>
    </div>
  );
}
