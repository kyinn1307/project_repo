import { AtSignIcon } from "@/assets/Icons/AtSignIcon";
import { InfoIcon } from "@/assets/Icons/InfoIcon";
import { MusicIcon } from "@/assets/Icons/MusicIcon";
import hmson from "@/assets/Images/hmson.png";

export const HistoryProfile = () => {
  return (
    <div className="w-full box-border px-[30px] py-[15px] flex flex-row gap-[37.5px] rounded-[15px] bg-[#111111]">
      <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
        <img src={hmson} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-[15px]">
        <div className="text-[15px] text-[#ffffff] font-bold leading-[19px]">
          makit
        </div>
        <div className="flex flex-col gap-[4.5px] text-[9px] leading-[11.25px]">
          <span className="flex flex-row items-center gap-[7.5px]">
            <InfoIcon />
            mixing,rap
          </span>
          <span className="flex flex-row items-center gap-[7.5px]">
            <MusicIcon />
            hiphop,kpop
          </span>
          <span className="flex flex-row items-center gap-[7.5px]">
            <AtSignIcon />
            <a
              href="mailto:makit@makit.com"
              className="text-[#0050EF] underline"
            >
              makit@makit.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
