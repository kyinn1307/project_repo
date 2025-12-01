import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postNickname } from "@/apis/signup";

export const NicknameStep = ({ onNext }: { onNext: () => void }) => {
  const [nickname, setNickname] = useState("");
  const [showError, setShowError] = useState(false);

  const isNicknameValid =
    /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,20}$/.test(nickname);

  const handleNicknameClick = async () => {
    // 버튼 클릭 시 validation 체크
    if (!isNicknameValid) {
      setShowError(true);
      return;
    }

    try {
      const success = await postNickname(nickname);
      console.log("응답 성공:", success);

      if (success) {
        onNext();
      } else {
        alert("닉네임 등록에 실패했습니다.");
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
          onChange={(e) => {
            setShowError(false);
            setNickname(e.target.value.replace(/\s+/g, ""));
          }}
          placeholder="2~20자의 닉네임을 입력하세요"
          className={cn(
            "mt-[3px] h-9 w-full bg-[#111111] px-2 text-white text-sm border rounded-[5px]",
            showError && !isNicknameValid
              ? "border-[#e33629]"
              : "border-[#555555]"
          )}
        />

        {/* 닉네임 에러 케이스 처리 */}
        {showError && !isNicknameValid && (
          <div className="text-[#e33629] text-xs ml-1 mt-[3px] mb-[2px]">
            2~20자의 대/소문자, 숫자, 특수문자 사용가능
          </div>
        )}

        <Button
          className={cn(
            "mt-[10px] w-full h-10 text-sm font-normal cursor-pointer rounded-[5px] disabled:bg-[#555555] disabled:text-[#777777]",
            "bg-[#0050ef] text-white"
          )}
          disabled={!nickname}
          onClick={handleNicknameClick}
        >
          다음
        </Button>
      </div>
    </>
  );
};
