import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
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
      <div className="text-white text-xl font-bold mb-[3px]">비밀번호찾기</div>
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
          "mt-[3px] h-9 w-full text-sm bg-[#111111] text-white border rounded-[5px] placeholder:text-sm px-2 py-[9px]",
          emailTouched && email !== "" && !isEmailValid
            ? "border-[#e33629]"
            : "border-[#555555]",
          "focus:outline-none"
        )}
      />

      {errorMessage && (
        <div className="text-[#e33629] text-xs mt-[3px] ml-[2px]">
          {errorMessage}
        </div>
      )}
      <Button
        className="mt-[10px] w-full h-10 bg-[#0050ef] text-white text-sm cursor-pointer rounded-[5px]"
        onClick={onSubmit}
      >
        다음
      </Button>
    </>
  );
};
