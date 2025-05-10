import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordBtn } from "@/assets/PasswordBtn";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="text-white text-[16px] font-medium mb-10">
        비밀번호를 입력해주세요.
      </div>
      <div className="flex flex-col">
        <Label htmlFor="password" className="text-white text-xs">
          비밀번호
        </Label>
        <div className="relative w-fit">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className={cn(
              "mt-1 h-9 w-[350px] bg-[#111111] border text-white text-sm pr-10 focus:outline-none",
              showPasswordError
                ? "border-red-500"
                : "border-[#555555] focus:border-[#0050ef]"
            )}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-[8.67px] top-[55%] -translate-y-1/2 cursor-pointer"
          >
            <PasswordBtn />
          </button>
        </div>
        {showPasswordError && (
          <div className="text-red-500 text-xs mt-1 ml-1">
            다시 입력해주세요
          </div>
        )}
      </div>
      <Button
        className="mt-3 w-[350px] h-10 bg-[#0050ef] text-white text-sm cursor-pointer"
        onClick={handleLogin}
      >
        다음
      </Button>
      <div className="flex flex-row justify-center mt-[4.84px] text-white text-xs">
        <span className="cursor-pointer">비밀번호를 잊으셨나요?</span>
      </div>
    </motion.div>
  );
};
