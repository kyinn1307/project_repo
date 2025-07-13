import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postNickname } from "@/apis/signup";

export const NicknameStep = ({ onNext }: { onNext: () => void }) => {
  const [nickname, setNickname] = useState("");
  const isNicknameValid =
    /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,20}$/.test(nickname);

  const handleNicknameClick = async () => {
    try {
      const success = await postNickname(nickname);
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
          onClick={handleNicknameClick}
        >
          다음
        </Button>
      </div>
    </>
  );
};
