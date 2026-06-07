import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
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
      <div className="text-white text-xl font-bold">
        Start Ego, it’s Time to Awake up
      </div>
      <div className="text-white text-base font-medium mt-[3px]">
        당신의 음악, SETA와 함께
      </div>

      {/* 이메일 입력창 */}
      <div className="flex flex-col mt-10">
        <Label htmlFor="email" className="text-white text-xs font-medium">
          이메일
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && email.trim() !== "") {
              onNext();
            }
          }}
          placeholder="이메일을 입력하세요"
          className={cn(
            "flex mt-[3px] h-9 w-full bg-[#111111] text-white text-sm border focus:outline-none placeholder:text-sm p-2 rounded-[5px]",
            showEmailError
              ? "border-red-500"
              : "border-[#555555] focus:border-[#0050ef]"
          )}
        />

        {showEmailError && (
          <div className="text-red-500 text-xs mt-[3px] ml-[2px] mb-[2px]">
            올바른 이메일 주소를 입력하세요
          </div>
        )}
        <Button
          className="mt-[10px] w-full h-10 bg-[#0050ef] text-white text-sm cursor-pointer rounded-[5px]
             disabled:bg-[#555555] disabled:text-[#777777] disabled:opacity-100 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={email.trim() === ""}
        >
          다음
        </Button>
      </div>
    </>
  );
};
