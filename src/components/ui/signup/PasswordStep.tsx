import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PasswordBtn } from "@/assets/PasswordBtn";
import { postPassword } from "@/apis/signup";

export const PasswordStep = ({ onNext }: { onNext: () => void }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid =
    password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const doPasswordsMatch = password === confirmPassword;
  const isPasswordStepValid = isPasswordValid && doPasswordsMatch;

  const handlePwClick = async () => {
    try {
      const success = await postPassword({ password, confirmPassword });
      console.log("응답 성공:", success);

      if (success) {
        console.log("✅ 인증 성공");
        onNext();
      } else {
        console.log("❌ 인증 실패");
        alert("인증 실패. 코드를 확인해주세요.");
      }
    } catch (err) {
      console.error("❌ 인증 요청 실패", err);
    }
  };

  return (
    <>
      <div className="text-white text-base font-medium">
        비밀번호를 입력해주세요.
      </div>
      <div className="flex flex-col">
        {/* 비밀번호 */}
        <div className="flex flex-col">
          <div className="text-xs text-white">비밀번호</div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자리 이상, 특수문자 포함"
              className={cn(
                "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm pr-10 border",
                !isPasswordValid && password !== ""
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
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
            <div className="text-red-500 text-xs ml-1 mt-[2px]">
              8자리 이상, 특수문자를 포함해야 합니다.
            </div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col mt-4">
          <div className="text-xs text-white">비밀번호 확인</div>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className={cn(
                "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm pr-10 border",
                confirmPassword !== "" && !doPasswordsMatch
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
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
            <div className="text-red-500 text-xs ml-1 mt-[2px]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        {/* 다음 버튼 */}
        <Button
          className={cn(
            "mt-5 w-[350px] h-10 text-sm cursor-pointer",
            isPasswordStepValid
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isPasswordStepValid}
          onClick={handlePwClick}
        >
          다음
        </Button>
      </div>
    </>
  );
};
