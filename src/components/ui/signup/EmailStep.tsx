import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import GoogleBtn from "@/assets/GoogleBtn";
import { sendEmailCode } from "@/apis/email";
import { cn } from "@/lib/utils";

export function EmailStep({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const showEmailError = emailTouched && (email === "" || !isEmailValid);

  return (
    <div>
      <div className="text-white text-[20px] font-bold">
        Start Ego, it’s Time to Awake up
      </div>
      <div className="text-white text-base font-medium mt-1">
        당신의 음악, SETA와 함께
      </div>
      <div className="flex flex-col mt-10">
        <Label htmlFor="email" className="text-white text-xs">
          이메일
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          className={cn(
            "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
            showEmailError
              ? "border-red-500"
              : emailTouched && isEmailValid
              ? "border-[#0050ef]"
              : "border-[#555555]",
            "focus:outline-none"
          )}
        />
        {showEmailError && (
          <div className="text-red-500 text-xs mt-1 ml-1">
            올바른 이메일 주소를 입력하세요
          </div>
        )}
        <Button
          className={cn(
            "mt-3 w-[350px] h-10 text-sm cursor-pointer",
            email === ""
              ? "bg-[#555555] text-[#777777]"
              : "bg-[#0050ef] text-white"
          )}
          disabled={email === ""}
          onClick={async () => {
            setEmailTouched(true);
            if (isEmailValid) {
              try {
                console.log("인증번호를 이메일로 보냈습니다");
                await sendEmailCode(email);
                onNext();
              } catch (error) {
                console.error("이메일 전송 실패:", error);
              }
            }
          }}
        >
          다음
        </Button>
      </div>
      <div className="flex flex-row items-center gap-2 mt-9 mb-5">
        <div className="w-[155px] border-t border-white" />
        <span className="text-white text-xs">또는</span>
        <div className="w-[155px] border-t border-white" />
      </div>
      <div className="mb-8 cursor-pointer">
        <GoogleBtn />
      </div>
    </div>
  );
}
