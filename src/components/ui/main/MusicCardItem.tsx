import type { Music } from "@/types/music";
import { useNavigate } from "react-router-dom";

export const MusicCardItem = ({ music }: { music: Music }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-[#111111] rounded-[15px] cursor-pointer"
      onClick={() => navigate("/music-video")}
    >
      <div className="flex flex-row gap-[22.5px]">
        <img
          src={music.imageUrl}
          alt="음악 재생"
          className="w-[75px] h-[75px] mr-[7.5px] rounded-[15px] object-cover"
        />
        <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
          <div className="text-[12px] h-[15px] font-bold">{music.title}</div>
          <div className="h-[11px] text-[9px]">
            <div>{music.creatorNickname}</div>
          </div>

          <div className="text-[#ffffff] mr-[11.12px] mt-[3.75px]">
            <div className="flex flex-row gap-[6.25px]">
              <span className="flex items-center h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Trap
              </span>
              <span className="flex items-center h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                HARD BEAT
              </span>
              <span className="flex items-center h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px]">
                Dark
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
