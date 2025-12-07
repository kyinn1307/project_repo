import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordBtn } from "@/assets/PasswordBtn";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PasswordFormProps {
  password: string;
  setPassword: (value: string) => void;
  passwordTouched: boolean;
  setPasswordTouched: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  togglePassword: () => void;
  showPasswordError: boolean;
  handleLogin: () => void;
}

export const PasswordForm = ({
  password,
  setPassword,
  showPassword,
  togglePassword,
  showPasswordError,
  handleLogin,
}: PasswordFormProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="text-white text-base font-medium mb-10">
        비밀번호를 입력해주세요.
      </div>

      {/* 비밀번호 입력창 */}
      <div className="flex flex-col">
        <Label htmlFor="password" className="text-white text-xs font-medium">
          비밀번호
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && password.trim() !== "") {
                handleLogin();
              }
            }}
            placeholder="비밀번호를 입력하세요"
            className={cn(
              "mt-[3px] h-9 w-full bg-[#111111] border text-white text-sm pl-2 pr-9 focus:outline-none placeholder:text-sm rounded-[5px]",
              showPasswordError
                ? "border-red-500"
                : "border-[#555555] focus:border-[#0050ef]"
            )}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-[8.67px] top-[50%] -translate-y-1/2 cursor-pointer"
          >
            <PasswordBtn />
          </button>
        </div>

        {/* 비밀번호 에러 처리 */}
        {showPasswordError && (
          <div className="text-red-500 text-xs mt-[3px] ml-[2px]">
            다시 입력해주세요
          </div>
        )}
      </div>
      <Button
        className="mt-[10px] w-full h-10 bg-[#0050ef] text-white text-sm cursor-pointer rounded-[5px]"
        onClick={handleLogin}
      >
        다음
      </Button>

      {/* 비밀번호 재설정 버튼 */}
      <div className="flex flex-row justify-center mt-[3px] text-white text-xs">
        <span
          className="cursor-pointer"
          onClick={() => {
            navigate("/auth/pw");
          }}
        >
          비밀번호를 잊으셨나요?
        </span>
      </div>
    </motion.div>
  );
};
