import SetaLogo from "@/assets/SetaLogo";
import { Button } from "../button";

export const UnsubscribeBusinessContent = () => {
  return (
    <div className="bg-[linear-gradient(306.33deg,rgba(0,230,106,0)_74.5%,rgba(0,230,106,0.2)_97.13%),linear-gradient(208.16deg,rgba(255,77,77,0.2)_21.28%,rgba(0,0,0,0)_82.57%),linear-gradient(132.15deg,rgba(0,80,239,0.5)_-9.86%,#000000_53.66%)]">
      <div className="flex flex-col items-center px-[74px]">
        <div className="mt-[113.46px]">
          <SetaLogo />
        </div>
        <div className="text-white text-[27px] font-bold mt-[52.5px]">
          SETA에서 뮤지션 등록으로 더 많은 비즈니스 기회를 만나보세요.
        </div>
        <div className="text-white text-[15px] leading-[17px] mt-[30px]">
          ₩14,900/월 · VAT포함 · 언제든지 취소 가능
        </div>
        <div className="mt-[30px] mb-[112px]">
          <Button className="text-white rounded-[7.5px] bg-[#0057FF]">
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};
