import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";

interface FindIdFormProps {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  isPhoneNumberValid: boolean;
  onSubmit: () => void;
  errorMessage?: string;
}

export const FindIdForm = ({
  phoneNumber,
  setPhoneNumber,
  isPhoneNumberValid,
  onSubmit,
  errorMessage,
}: FindIdFormProps) => {
  return (
    <>
      <div className="text-white text-base font-medium">
        전화번호를 입력해주세요.
      </div>
      <div className="text-white text-xs font-medium mt-10">
        전화번호 (숫자만 입력)
      </div>
      {/* 번호 입력창 */}
      <Input
        id="phone-number"
        type="text"
        inputMode="numeric"
        value={phoneNumber}
        onChange={(e) =>
          setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))
        }
        placeholder="여기에 입력"
        className={cn(
          "mt-[3px] h-9 w-full bg-[#111111] px-2 text-white text-sm border rounded-[5px]",
          phoneNumber !== "" && !isPhoneNumberValid
            ? "border-red-500"
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
        className="mt-[10px] w-full h-10 bg-[#0050ef] text-white text-sm font-normal cursor-pointer rounded-[5px] disabled:bg-[#555555]"
        onClick={onSubmit}
        disabled={!isPhoneNumberValid}
      >
        다음
      </Button>
    </>
  );
};
