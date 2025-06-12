import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NicknameStep = ({ onNext }: { onNext: () => void }) => {
  const [nickname, setNickname] = useState("");
  const isNicknameValid =
    /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,20}$/.test(nickname);

  return (
    <>
      <div className="text-white text-base font-medium">
        닉네임을 입력해주세요.
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-white">닉네임</div>
        <Input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="2~20자의 닉네임을 입력하세요"
          className={cn(
            "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
            nickname !== "" && !isNicknameValid
              ? "border-red-500"
              : "border-[#555555]",
            "focus:outline-none"
          )}
        />
        {nickname !== "" && !isNicknameValid && (
          <div className="text-red-500 text-xs ml-1 mt-[2px]">
            2~20자의 한글, 영문, 숫자, 특수문자를 사용할 수 있습니다.
          </div>
        )}
        <Button
          className={cn(
            "mt-5 w-[350px] h-10 text-sm cursor-pointer",
            isNicknameValid
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          )}
          disabled={!isNicknameValid}
          onClick={() => onNext()}
        >
          다음
        </Button>
      </div>
    </>
  );
};
