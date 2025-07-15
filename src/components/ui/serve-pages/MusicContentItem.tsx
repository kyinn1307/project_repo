import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
import { useNavigate } from "react-router-dom";

interface MusicContentItemProps {
  track: {
    id: number;
    title: string;
    creatorNickname: string;
    genres: string[];
    imageUrl?: string;
  };
}

export const MusicContentItem = ({ track }: MusicContentItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-[#111111] rounded-[15px] cursor-pointer"
      onClick={() => navigate(`/music-video/${track.id}`)}
    >
      <div className="flex flex-row">
        <img
          src={track.imageUrl || MusicDefault}
          alt="음악 재생"
          className="w-[75px] h-[75px] mr-[7.5px] rounded-[15px]"
        />
        <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
          <div className="text-[12px] h-[15px] font-bold">{track.title}</div>
          <div className="h-[11px] text-[9px]">
            <div>{track.creatorNickname}</div>
          </div>

          <div className="text-[#ffffff] mr-[11.12px] mt-[3.75px]">
            <div className="flex flex-row gap-[6.25px]">
              {track.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="h-[15px] px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]"
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
