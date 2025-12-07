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

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(password, confirmPassword);
  };

  return (
    <>
      <div className="text-white text-base font-medium">
        비밀번호를 입력해주세요.
      </div>

      <div className="flex flex-col mt-10">
        {/* 비밀번호 */}
        <div className="flex flex-col">
          <div className="text-xs text-white">비밀번호</div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ""))}
              placeholder="8자리 이상, 특수문자 포함"
              className={cn(
                "mt-[3px] h-9 w-full bg-[#111111] text-white text-sm pl-2 pr-[30px] border rounded-[5px]",
                password !== "" && !isPasswordValid
                  ? "border-red-500"
                  : "border-[#555555]"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PasswordBtn />
            </button>
          </div>

          {!isPasswordValid && password !== "" && (
            <div className="text-[#e33629] text-xs mt-[3px]">
              8자리 이상, 특수문자를 포함해야 합니다.
            </div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col mt-3">
          <div className="text-xs text-white">비밀번호 확인</div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value.replace(/\s+/g, ""))
              }
              placeholder="8자리 이상, 특수문자 포함"
              className={cn(
                "mt-[3px] h-9 w-full bg-[#111111] text-white text-sm pl-2 pr-9 border rounded-[5px]",
                confirmPassword !== "" && !doPasswordsMatch
                  ? "border-[#e33629]"
                  : "border-[#555555]"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PasswordBtn />
            </button>
          </div>

          {confirmPassword !== "" && !doPasswordsMatch && (
            <div className="text-[#e33629] text-xs mt-[3px]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        {/* 다음 버튼 */}
        <Button
          className={cn(
            "mt-5 w-full h-10 text-sm cursor-pointer rounded-[5px]",
            isValid ? "bg-[#0050ef] text-white" : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          다음
        </Button>
      </div>
    </>
  );
};
