import { useState } from "react";
import { MusicActionBar } from "./MusicActionBar";
import sample from "@/assets/Images/sample.jpeg";
import { ArrowRight } from "lucide-react";
import { Progress } from "../progress";
import { MusicPlayIcon } from "@/assets/Icons/music-video/MusicPlayIcon";
import { PauseVideoIcon } from "@/assets/Icons/music-video/PauseVideoIcon";
import { Button } from "../button";
import hmson from "@/assets/Images/hmson.png";
import { MusicVideoDetailContainer } from "./MusicVideoDetailContainer";
interface Props {
  video: {
    title: string;
    genre: string;
    artist: string;
    tags: string[];
    image: string;
  };
}

export const MusicVideoContainer = ({ video }: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "LYRICS" | "COMMENT" | "CREDIT" | null
  >(null);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTabToggle = (tab: "LYRICS" | "COMMENT" | "CREDIT") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <>
      <div className="w-full flex flex-row justify-center text-white gap-[22.5px] snap-start flex-shrink-0">
        <div className="flex flex-col">
          <div className="flex px-[15.75px] h-[58px] items-center">
            {!isPlaying && <PauseVideoIcon />}
          </div>
          <div className="w-[525px] flex flex-col">
            <div
              className="relative w-full h-[525px]"
              onClick={handleTogglePlay}
            >
              {/* 실제 이미지 or 배경 */}
              <img
                src={sample}
                className="w-full h-full object-cover rounded-[3.75px]"
              />
              {/* 정지 버튼 아이콘 */}
              <div></div>
              {/* 재생횟수 */}
              <div className="absolute bottom-[15px] left-[27px] flex flex-row items-center gap-[7.5px] z-10">
                <MusicPlayIcon />
                <span className="text-white text-[13.5px] font-bold">
                  12만회
                </span>
              </div>
              {/* 그라디언트 오버레이 */}
              <div
                className="absolute bottom-0 left-0 w-full h-full rounded-[3.75px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 82.91%, #000000 101.45%)",
                }}
              />
            </div>

            <div className="flex flex-col px-[22.5px] gap-[15px] mt-[7.5px]">
              <button className="w-full h-[30px] flex flex-row justify-between items-center border-[1.5px] border-[#0050EF] rounded-[22.5px] px-3 py-1 w-fit text-white cursor-pointer">
                <div className="text-[10.5px] font-medium">프로필 가기</div>
                <ArrowRight size={16} />
              </button>

              <div className="flex flex-col gap-[7.5px]">
                <div className="flex flex-row gap-[7.5px] items-center">
                  <img
                    src={hmson}
                    className="w-[27px] h-[27px] object-cover rounded-full"
                  />
                  <div className="text-[13.5px] font-bold">{video.artist}</div>
                  <Button className="w-[47.25px] h-[27px] text-[10.5px] font-medium rounded-[22.5px] bg-[#0050ef] cursor-pointer">
                    팔로우
                  </Button>
                </div>
                <div className="text-xs font-bold flex flex-col gap-[7.5px]">
                  <div className="h-[17px]">{video.title}</div>
                  <div className="h-[17px]">{video.genre}</div>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-[7.5px]">
                  {video.tags.map((tag, idx) => (
                    <label
                      key={idx}
                      className="h-[21px] rounded-[7.5px] bg-[#777777] text-xs font-medium px-3 py-[3px]"
                    >
                      {tag}
                    </label>
                  ))}
                </div>
                <div className="w-full mt-[14px] mb-3">
                  <Progress value={60} className="h-[2px] bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[296px]">
          <MusicActionBar
            currentTab={activeTab}
            onTabChange={handleTabToggle}
          />
        </div>
        {activeTab && (
          <MusicVideoDetailContainer tab={activeTab} setTab={setActiveTab} />
        )}
      </div>
    </>
  );
};
