import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NumberStep = ({ onNext }: { onNext: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const isPhoneNumberValid = /^\d{10,11}$/.test(phoneNumber);

  return (
    <>
      <div className="text-white text-base font-medium">
        전화번호를 입력해주세요.
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-white">전화번호</div>
        <Input
          id="phone-number"
          type="text"
          inputMode="numeric"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          placeholder="숫자만 입력 (예: 01012345678)"
          className={cn(
            "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
            phoneNumber !== "" && !isPhoneNumberValid
              ? "border-red-500"
              : "border-[#555555]",
            "focus:outline-none"
          )}
        />
        {phoneNumber !== "" && !isPhoneNumberValid && (
          <div className="text-red-500 text-xs ml-1 mt-[2px]">
            숫자만 입력해주세요 (10~11자리).
          </div>
        )}
        <Button
          className={cn(
            "mt-5 w-[350px] h-10 text-sm cursor-pointer",
            isPhoneNumberValid
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isPhoneNumberValid}
          onClick={() => onNext()}
        >
          다음
        </Button>
      </div>
    </>
  );
};
