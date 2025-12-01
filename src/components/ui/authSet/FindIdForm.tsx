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
      <div className="text-white text-xs font-medium">
        전화번호를 입력해주세요.
      </div>
      <div className="text-white text-[9px] font-medium mt-[30px]">
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
          "mt-[2.5px] h-[27px] w-full bg-[#111111] px-[6px] text-white !text-[10.5px] border rounded-[3.75px]",
          phoneNumber !== "" && !isPhoneNumberValid
            ? "border-red-500"
            : "border-[#555555]",
          "focus:outline-none"
        )}
      />

      {errorMessage && (
        <div className="text-red-500 text-[9px] mt-1 ml-1">{errorMessage}</div>
      )}
      <Button
        className="mt-[7.5px] w-full h-[30px] bg-[#0050ef] text-white text-[10.5px] cursor-pointer rounded-[3.75px] disabled:bg-[#555555] disabled:font-normal"
        onClick={onSubmit}
        disabled={!isPhoneNumberValid}
      >
        다음
      </Button>
    </>
  );
};
