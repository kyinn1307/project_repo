import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PasswordBtn } from "@/assets/PasswordBtn";

interface Props {
  onSubmit: (password: string, confirmPassword: string) => void;
}

export const PwResetForm = ({ onSubmit }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid =
    password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const doPasswordsMatch = password === confirmPassword;
  const isValid = isPasswordValid && doPasswordsMatch;

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="text-white text-[15px] font-medium">
        비밀번호를 입력해주세요.
      </div>

      <div className="flex flex-col">
        <div>
          <div className="text-[9px] text-white">비밀번호</div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자리 이상, 특수문자 포함"
              className={cn(
                "mt-[2.5px] px-[6px] h-[27px] w-full bg-[#111111] text-white !text-[10.5px] pr-10 border rounded-[3.75px]",
                password !== "" && !isPasswordValid
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasswordBtn />
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-[9px] text-white">비밀번호 확인</div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className={cn(
                "mt-[2.5px] px-[6px] h-[27px] w-full bg-[#111111] text-white !text-[10.5px] pr-10 border rounded-[3.75px]",
                confirmPassword !== "" && !doPasswordsMatch
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PasswordBtn />
            </button>
          </div>
          {confirmPassword !== "" && !doPasswordsMatch && (
            <div className="text-red-500 text-xs mt-1 ">다시 입력해주세요.</div>
          )}
        </div>

        <Button
          className={cn(
            "mt-5 w-full h-[30px] text-[15px] cursor-pointer rounded-[3.75px]",
            isValid ? "bg-[#0050ef] text-white" : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isValid}
          onClick={() => onSubmit(password, confirmPassword)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
