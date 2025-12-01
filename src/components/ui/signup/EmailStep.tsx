import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import GoogleBtn from "@/assets/GoogleBtn";
import { sendEmailCode } from "@/apis/email";
import { cn } from "@/lib/utils";
interface EmailStepProps {
  setTimer: (timer: string) => void;
  onNext: (email: string) => void;
}

export function EmailStep({ setTimer, onNext }: EmailStepProps) {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  // 이미 가입된 이메일 상태 확인
  const [showEmailDuplicateError, setShowEmailDuplicateError] = useState(false);

  // email 형식 확인
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 이메일 에러 조건
  const showEmailError = emailTouched && (email === "" || !isEmailValid);

  return (
    <div>
      <div className="text-white text-xl font-bold">
        Start Ego, it’s Time to Awake up
      </div>
      <div className="text-white text-base font-medium mt-[3px]">
        당신의 음악, SETA와 함께
      </div>
      <div className="flex flex-col mt-10">
        <Label htmlFor="email" className="text-white text-xs">
          이메일
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.replace(/\s+/g, ""));
            setShowEmailDuplicateError(false);
          }}
          placeholder="이메일을 입력하세요"
          className={cn(
            "mt-[3px] h-10 w-full bg-[#111111] text-white text-sm px-2 border placeholder:text-sm rounded-[5px]",
            showEmailError || showEmailDuplicateError
              ? "border-red-500"
              : emailTouched && isEmailValid
              ? "border-[#0050ef]"
              : "border-[#555555]",
            "focus:outline-none"
          )}
        />

        {/* email 형식 에러 */}
        {showEmailError && (
          <div className="text-red-500 text-xs mt-1 ml-1">
            올바른 이메일 주소를 입력하세요
          </div>
        )}

        {/* 이미 가입된 이메일 가입 시도의 경우 */}
        {!showEmailError && showEmailDuplicateError && (
          <div className="text-[#ff0000] text-xs mt-[3px] ml-[2px]">
            이미 가입된 이메일 입니다
          </div>
        )}

        {/* 다음 버튼 */}
        <Button
          className={cn(
            "mt-[10px] w-full h-10 text-sm font-medium cursor-pointer rounded-[5px]",
            email === ""
              ? "bg-[#555555] text-[#777777]"
              : "bg-[#0050ef] text-white"
          )}
          disabled={email === ""}
          onClick={async () => {
            setEmailTouched(true);
            if (isEmailValid) {
              try {
                const res = await sendEmailCode(email);
                setTimer(res.data.timer);
                onNext(email);
              } catch (error) {
                setShowEmailDuplicateError(true);
                console.error("이메일 전송 실패:", error);
              }
            }
          }}
        >
          다음
        </Button>
      </div>

      <div className="flex flex-row items-center gap-2 mt-10 mb-5">
        <div className="flex-1 border-t border-white" />
        <span className="text-white text-xs">또는</span>
        <div className="flex-1 border-t border-white" />
      </div>

      {/* 구글 로그인 버튼 (기능 x) */}
      <div className="mb-[33px] cursor-pointer">
        <GoogleBtn />
      </div>
    </div>
  );
}
