import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  emailTouched: boolean;
  setEmailTouched: (value: boolean) => void;
  isEmailValid: boolean;
  showEmailError: boolean;
  onNext: () => void;
}

export const LoginForm = ({
  email,
  setEmail,
  setEmailTouched,
  showEmailError,
  onNext,
}: LoginFormProps) => {
  return (
    <>
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
          onBlur={() => setEmailTouched(true)}
          placeholder="이메일을 입력하세요"
          className={cn(
            "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border focus:outline-none",
            showEmailError
              ? "border-red-500"
              : "border-[#555555] focus:border-[#0050ef]"
          )}
        />

        {showEmailError && (
          <div className="text-red-500 text-xs mt-1 ml-1">
            올바른 이메일 주소를 입력하세요
          </div>
        )}
        <Button
          className="mt-3 w-[350px] h-10 bg-[#0050ef] text-white text-sm cursor-pointer"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </>
  );
};
