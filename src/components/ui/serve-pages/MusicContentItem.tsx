import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
import { Music } from "@/types/music";
import { useNavigate } from "react-router-dom";

interface MusicContentItemProps {
  track: Music;
}

export const MusicContentItem = ({ track }: MusicContentItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-w-[262.5px] flex flex-col overflow-hidden bg-[#111111] rounded-[15px] cursor-pointer"
      onClick={() => navigate(`/music-video/${track.id}`)}
    >
      <div className="flex flex-row gap-[22.5px]">
        <img
          src={track.imageFiles[0].url || MusicDefault}
          alt="음악 재생"
          className="w-[75px] h-[75px] rounded-[15px] object-cover"
        />
        <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
          <div className="flex items-center text-[12px] h-[15px] font-bold">
            {track.title}
          </div>
          <div className="flex items-center h-[11px] text-[9px]">
            <div>{track.creatorNickname}</div>
          </div>

          <div className="flex items-center text-[#ffffff] mt-[3.75px]">
            <div className="flex flex-row gap-[6.25px]">
              {track.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="flex items-center h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
