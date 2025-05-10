import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FindPwFormProps {
  email: string;
  setEmail: (val: string) => void;
  isEmailValid: boolean;
  emailTouched: boolean;
  onSubmit: () => void;
  errorMessage?: string;
}

export const FindPwForm = ({
  email,
  setEmail,
  isEmailValid,
  emailTouched,
  onSubmit,
  errorMessage,
}: FindPwFormProps) => {
  return (
    <>
      <div className="text-white text-xl font-bold">비밀번호찾기</div>
      <div className="text-white text-base font-medium">
        이메일을 입력해주세요
      </div>

      <div className="text-white text-xs font-medium mt-10">이메일</div>
      <Input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="여기에 입력"
        className={cn(
          "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
          emailTouched && email !== "" && !isEmailValid
            ? "border-red-500"
            : "border-[#555555]",
          "focus:outline-none"
        )}
      />

      {errorMessage && (
        <div className="text-red-500 text-xs mt-1 ml-1">{errorMessage}</div>
      )}
      <Button
        className="mt-3 w-[350px] h-10 bg-[#0050ef] text-white text-sm cursor-pointer"
        onClick={onSubmit}
      >
        다음
      </Button>
    </>
  );
};
