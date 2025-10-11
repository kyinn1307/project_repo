import type { Music } from "@/types/music";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import DefaultMusic from "@/assets/Images/default-music.png";

export const MusicCardItem = ({ music }: { music: Music }) => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const imageUrl = music.imageFiles?.[0]?.url;
  const audioUrl = music.audioFiles?.[0]?.url;

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  return (
    <div
      className="relative min-w-[243.75px] flex flex-col overflow-hidden bg-[#111111] rounded-[15px] cursor-pointer"
      onClick={() => navigate(`/music-video/${music.id}`)}
    >
      <div className="flex flex-row gap-[22.5px]">
        <div
          className="relative w-[75px] h-[75px] mr-[7.5px] rounded-[15px] overflow-hidden group"
          onClick={handleTogglePlay}
        >
          <img
            src={imageUrl || DefaultMusic}
            alt="음악 재생"
            className="w-[75px] h-[75px] rounded-[15px] object-cover"
          />
          <button
            type="button"
            aria-label={isPlaying ? "일시정지" : "재생"}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
          >
            {isPlaying ? (
              <Pause size={20} color="white" />
            ) : (
              <Play size={20} color="white" />
            )}
          </button>
          {/* 실제 오디오 */}
          <audio ref={audioRef} src={audioUrl} />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-[7.5px] mt-[7.5px] text-white">
          <div className="text-[12px] h-[15px] font-bold line-clamp-1">
            {music.title}
          </div>
          <div className="h-[11px] text-[9px] text-[#ddd]">
            <div className="line-clamp-1">{music.creatorNickname}</div>
          </div>

          {Array.isArray(music.tags) && music.tags.length > 0 && (
            <div className="text-[#ffffff] mr-[11.12px] mt-[3.75px]">
              <div className="flex flex-row gap-[6.25px]">
                {music.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
