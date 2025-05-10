import { Heart, MessageSquare, Play } from "lucide-react";
import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
export const MusicItem = () => {
  return (
    <div className="w-full flex flex-col border-b border-b-[#777777] pb-1">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-row">
          <img
            src={MusicDefault}
            alt="음악 재생"
            className="w-[75px] h-[75px] mr-[30px]"
          />
          <div className="flex flex-col mt-1">
            <div className="text-xs mb-[15px]">Makit</div>
            <div className="flex flex-col gap-[6px] text-[9px] text-[#777777]">
              <div>Kendrick lamar</div>
              <div className="flex flex-row gap-1">
                <span>genre</span>
                <span>genre</span>
                <span>genre</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 text-[#ffffff] mt-1">
          <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
            Trap
          </span>
          <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
            HARD BEAT
          </span>
          <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
            Dark
          </span>
        </div>
      </div>

      <div className="w-full h-1 bg-[#555555] mb-2"></div>
      <div className="flex flex-row justify-between text-[10.5px]">
        <div className="flex flex-row gap-5 justify-between">
          <span className="flex flex-row gap-2 items-center">
            <Heart size={10.5} /> 0
          </span>
          <span className="flex flex-row gap-2 items-center">
            <Play size={10.5} /> 0
          </span>
        </div>
        <span className="flex items-center">
          <MessageSquare size={10.5} />
        </span>
      </div>
    </div>
  );
};
