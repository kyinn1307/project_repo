import { useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
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
        {/* 비밀번호 입력파트 */}
        <div className="flex flex-col">
          <div className="text-xs text-white">비밀번호</div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\s+/g, ""))}
              placeholder="8자리 이상, 특수문자 포함"
              className={cn(
                "mt-[3px] h-9 w-full bg-[#111111] text-white text-sm pl-2 pr-9 border rounded-[5px]",
                !isPasswordValid && password !== ""
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
              )}
            />

            {/* 비밀번호 입력값 확인 버튼 */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PasswordBtn />
            </button>
          </div>

          {/* 비밀번호 입력 조건 처리 */}
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
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value.replace(/\s+/g, ""))
              }
              placeholder="비밀번호를 다시 입력하세요"
              className={cn(
                "mt-[3px] h-9 w-full bg-[#111111] text-white text-sm pl-2 pr-9 border rounded-[5px]",
                confirmPassword !== "" && !doPasswordsMatch
                  ? "border-red-500"
                  : "border-[#555555]",
                "focus:outline-none"
              )}
            />

            {/* 비밀번호 확인 입력값 확인 버튼 */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PasswordBtn />
            </button>
          </div>

          {/* 비밀번호와 비밀번호 확인 일치 x인 상황 처리 */}
          {confirmPassword !== "" && !doPasswordsMatch && (
            <div className="text-[#e33629] text-xs mt-[3px]">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        {/* 비밀번호 일치 여부 확인 및 다음 단계 버튼 */}
        <Button
          className={cn(
            "mt-[30px] w-full h-10 text-sm cursor-pointer rounded-[5px]",
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
