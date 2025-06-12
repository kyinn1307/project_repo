import { useState } from "react";
import { Heart, Users } from "lucide-react";
import { KeyComment } from "@/assets/Icons/music-video/KeyComment";
import { LyricsIcon } from "@/assets/Icons/music-video/LyricsIcon";

interface Props {
  currentTab: "LYRICS" | "COMMENT" | "CREDIT" | null;
  onTabChange: (tab: "LYRICS" | "COMMENT" | "CREDIT") => void;
}

export const MusicActionBar = ({ onTabChange }: Props) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-[15px] py-2">
      {/* 좋아요 */}
      <div className="flex flex-col items-center">
        <button
          className="w-[39px] h-[39px] bg-[#2D2D2D] rounded-full flex items-center justify-center cursor-pointer"
          onClick={toggleLike}
        >
          <Heart
            className={`w-[18px] h-[18px] ${
              liked ? "text-red-500" : "text-white"
            }`}
            fill={liked ? "currentColor" : "none"}
          />{" "}
        </button>
        <span className="text-[10.5px] mt-1">12</span>
      </div>

      {/* 가사 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("LYRICS")}
          className={`w-[39px] h-[39px] rounded-full flex items-center justify-center cursor-pointer bg-[#2D2D2D]`}
        >
          <LyricsIcon />
        </button>
        <span className="text-[10.5px] mt-1">가사</span>
      </div>

      {/* 코멘트 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("COMMENT")}
          className={`w-[39px] h-[39px] rounded-full flex items-center justify-center cursor-pointer bg-[#2D2D2D]`}
        >
          <KeyComment />
        </button>
        <span className="text-[10.5px] mt-1">코멘트</span>
      </div>

      {/* 크레딧 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("CREDIT")}
          className={`w-[39px] h-[39px] rounded-full flex items-center justify-center cursor-pointer bg-[#2D2D2D]`}
        >
          <Users className="text-white w-[18px] h-[18px]" />
        </button>
        <span className="text-[10.5px] mt-1">크레딧</span>
      </div>
    </div>
  );
};
