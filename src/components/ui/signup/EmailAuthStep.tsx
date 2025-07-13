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
  // const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (resent) return; // 다시 받은 경우에는 초기화 후 타이머 새로 시작됨

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
  }, [resent]);

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

  // 이메일 인증번호 재전송
  const handleResend = async () => {
    try {
      const res = await resendEmailCode(email);
      console.log(res);
      setCountdown(parseInt(res.data.timer, 10));
      setAuthCode("");
      // setError("");
      setResent(false);
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
      <VerificationCodeInput onComplete={setAuthCode} />
      {countdown > 0 ? (
        <div className="flex justify-center text-white text-xs mt-[12.25px]">
          {formatTime(countdown)}
        </div>
      ) : (
        <div className="flex justify-center items-center text-xs mt-[12.25px]">
          <span className="text-red-500">시간이 초과되었습니다.</span>
          <button
            className="text-[#777777] underline ml-1 cursor-pointer"
            onClick={handleResend}
          >
            다시 받기
          </button>
        </div>
      )}
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
        <span className="underline cursor-pointer ml-1" onClick={handleResend}>
          인증번호 다시 받기
        </span>
      </div>
    </div>
  );
}
