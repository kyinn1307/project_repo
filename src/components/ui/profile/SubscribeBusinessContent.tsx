import { SetaBusinessLogo } from "@/assets/SetaBusinessLogo";

export const SubscribeBusinessContent = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-[150px]">
        <SetaBusinessLogo />
        <div className="text-xs text-[#777777] mt-[22.5px]">
          등록된 비즈니스가 없습니다.
        </div>
        <div className="text-xs mt-[7.5px] underline cursor-pointer">
          비즈니스 설정하기
        </div>
      </div>
    </div>
  );
};
