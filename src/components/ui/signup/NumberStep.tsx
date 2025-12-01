import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postPhoneNumber } from "@/apis/signup";

export const NumberStep = ({ onNext }: { onNext: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const isPhoneNumberValid = /^\d{11}$/.test(phoneNumber);

  const handlePhoneNumberClick = async () => {
    try {
      const success = await postPhoneNumber(phoneNumber);
      console.log("응답 성공:", success);

      if (success) {
        console.log("✅ 인증 성공");
        onNext();
      } else {
        console.log("❌ 인증 실패");
        alert("인증 실패. 코드를 확인해주세요.");
      }
    } catch (err) {
      console.error("❌ 인증 요청 실패", err);
    }
  };

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
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))
          }
          placeholder="숫자만 입력 (예: 01012345678)"
          className={cn(
            "mt-[3px] h-9 w-full bg-[#111111] text-white px-2 text-sm border rounded-[5px]",
            phoneNumber !== "" && !isPhoneNumberValid
              ? "border-[#e33629]"
              : "border-[#555555]",
            "focus:outline-none"
          )}
        />
        {phoneNumber !== "" && !isPhoneNumberValid && (
          <div className="text-[#e33629] text-xs ml-1 mt-[2px]">
            숫자 11자리를 입력해주세요.
          </div>
        )}
        <Button
          className={cn(
            "mt-[10px] w-full h-10 text-sm cursor-pointer rounded-[5px]",
            isPhoneNumberValid
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isPhoneNumberValid}
          onClick={handlePhoneNumberClick}
        >
          다음
        </Button>
      </div>
    </>
  );
};
