import { ClockIcon } from "@/assets/Icons/ClockIcon";
import { HeartIcon } from "@/assets/Icons/HeartIcon";
import { Button } from "@/components/ui/button";
import temp from "@/assets/Images/TempProfile.png";
export const ProjectCardItem = () => {
  return (
    <div className="relative flex flex-col justify-between w-full h-[189px] bg-[#222222] rounded-[20px] p-5 text-white">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm">
            <img src={temp} alt="프로필" className="w-5 h-5 rounded-full" />

            <span>artist1</span>
          </div>
          <div className="text-[18px] font-semibold">악기 구함</div>
        </div>

        <div className="flex flex-col items-end text-right text-xs text-[#999999]">
          <div className="flex items-center gap-1 text-white text-sm mb-[2px]">
            <ClockIcon />
            <span>마감 2주전</span>
          </div>
          <span>등록일자 2024.10.02</span>
        </div>
      </div>

      <div className="text-sm mt-2 leading-[22px]">
        <p>장르_ 랩, 힙합, R&B</p>
        <p>분야_ 프로듀서, 비트메이커, 보컬</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-1 text-sm">
          <HeartIcon />
          <span>0</span>
        </div>
        <Button className="bg-[#0050ef] text-white text-sm px-3 py-[2px] rounded-[5px] h-7 cursor-pointer">
          문의하기
        </Button>
      </div>
    </div>
  );
};
