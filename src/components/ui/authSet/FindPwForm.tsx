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
      <div className="text-white text-[15px] font-bold mb-[2px]">
        비밀번호찾기
      </div>
      <div className="text-white text-xs font-medium">
        이메일을 입력해주세요
      </div>

      <div className="text-white text-[9px] font-medium mt-[30px]">이메일</div>
      <Input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="여기에 입력"
        className={cn(
          "mt-[2.5px] h-[27px] w-full !text-[10.5px] bg-[#111111] text-white border rounded-[3.75px] placeholder:text-[10.5px] px-[6px] py-[7px]",
          emailTouched && email !== "" && !isEmailValid
            ? "border-red-500"
            : "border-[#555555]",
          "focus:outline-none"
        )}
      />

      {errorMessage && (
        <div className="text-red-500 text-[10.5px] mt-1 ml-1">
          {errorMessage}
        </div>
      )}
      <Button
        className="mt-[7.5px] w-full h-[30px] bg-[#0050ef] text-white text-[10.5px] cursor-pointer rounded-[3.75px]"
        onClick={onSubmit}
      >
        다음
      </Button>
    </>
  );
};
