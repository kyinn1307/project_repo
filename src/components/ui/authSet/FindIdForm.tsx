import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
          "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
          phoneNumber !== "" && !isPhoneNumberValid
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
