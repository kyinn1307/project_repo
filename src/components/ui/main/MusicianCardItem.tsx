import hmson from "@/assets/Images/hmson.png";
import { BasicMusic } from "@/assets/Images/BasicMusic";

export const MusicianCardItem = () => {
  return (
    <div
      className="relative w-[217.5px] h-[255px] rounded-[15px] overflow-hidden border"
      style={{
        border: "0.75px solid #333333",
      }}
    >
      {/* 배경 이미지 */}
      <img
        src={hmson}
        alt="프로필"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 블렌드 그라디언트 오버레이 */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #000000 79.89%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* 콘텐츠 영역 */}
      <div className="absolute bottom-0 w-full px-[15px] py-[13.25px] text-white z-10">
        <div className="font-semibold text-base">Artist01</div>
        <div className="text-[#cccccc] text-xs mt-[3.75px]">
          장르_ #Rap #base
        </div>
        <div className="text-[#cccccc] text-xs mt-[3.75px]">
          분야_ #Rap #base
        </div>

        <div className="flex items-center gap-[4.5px] mt-[15px]">
          <div className="flex flex-col">
            <div className="text-[10.5px]">대표곡</div>
            <div className="flex flex-row gap-[6px] items-center">
              <div className="w-[45px] h-[45px] rounded-[4px] flex items-center justify-center bg-[#333333]">
                <BasicMusic />
              </div>
              <div className="text-[9px]">Untitled01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
