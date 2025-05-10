import hmson from "@/assets/Images/hmson.png";
import { BasicMusic } from "@/assets/Images/BasicMusic";

export const MusicianCardItem = () => {
  return (
    <div
      className="relative w-[210px] h-[250px] rounded-[10px] overflow-hidden bg-[#222222]"
      style={{
        background:
          "background: linear-gradient(1.12deg, #222222 43.77%, rgba(136, 136, 136, 0) 97.49%)",
      }}
    >
      <div className="relative w-full h-[60%]">
        <img src={hmson} alt="프로필" className="w-full h-full object-cover" />
        <div className="absolute inset-0" />
      </div>

      <div className="absolute bottom-0 w-full p-3">
        <div className="text-white font-semibold text-base">Artist01</div>
        <div className="text-[#cccccc] text-xs mt-1">장르_ #Rap #base</div>
        <div className="text-[#cccccc] text-xs">분야_ #Rap #base</div>

        <div className="flex items-center gap-2 mt-3">
          <div className="flex flex-col">
            <div className="text-white text-xs">대표곡</div>
            <div className="flex flex-row gap-[6px] items-center">
              <div className="w-[45px] h-[45px] rounded-[4px] flex items-center justify-center">
                <BasicMusic />
              </div>
              <div className="text-white text-[10px]">Untitled01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
