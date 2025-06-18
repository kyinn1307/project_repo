import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
import { Heart } from "lucide-react";
import { PlayIcon } from "@/assets/Icons/my-profile/PlayIcon";
import { LyricsSmallIcon } from "@/assets/Icons/my-profile/LyricsSmallIcon";
import { MusicMoreMenu } from "./MusicMoreMenu";

export const MusicItem = () => {
  return (
    <div className="w-full flex flex-col pb-1 ">
      <div className="relative flex flex-col overflow-hidden bg-[#111111] rounded-[15px] mb-[8.75px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row ">
            <img
              src={MusicDefault}
              alt="음악 재생"
              className="w-[75px] h-[75px] mr-[7.5px] rounded-[15px]"
            />
            <div className="flex flex-col mt-[18.75px]">
              <div className="text-[15px] font-bold mb-[7.5px]">Makit</div>
              <div className="flex flex-col text-[9px]">
                <div>Kendrick lamar</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-[#ffffff] mt-[3.44px] mr-[11.12px]">
            <MusicMoreMenu />

            <div className="flex flex-row gap-[7.5px]">
              <span className="h-4 px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Trap
              </span>
              <span className="h-4 px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                HARD BEAT
              </span>
              <span className="h-4 px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Dark
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-1 bg-[#555555]"></div>
      </div>

      <div className="flex flex-row justify-between text-[10.5px] px-[15px] mb-[22.5px]">
        <div className="flex flex-row gap-5 justify-between">
          <span className="flex flex-row gap-2 items-center">
            <Heart size={10.5} className="text-[#777777]" /> 0
          </span>
          <span className="flex flex-row gap-2 items-center">
            <PlayIcon /> 0
          </span>
        </div>
        <span className="flex items-center">
          <LyricsSmallIcon />
        </span>
      </div>
    </div>
  );
};
