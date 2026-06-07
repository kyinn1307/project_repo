import type { Music } from "@/types/music";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import DefaultMusic from "@/assets/Images/logo_blue.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playTrack } from "@/apis/music";

export const MusicCardItem = ({ music }: { music: Music }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasReportedPlayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const imageUrl = music.imageFiles?.[0]?.url;
  const audioUrl = music.audioFiles?.[0]?.url;

  const { mutate: playMutate } = useMutation({
    mutationFn: () => playTrack(music.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track", music.id] });
    },
  });

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
    hasReportedPlayRef.current = false;
  }, [music.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!hasReportedPlayRef.current && audio.currentTime >= 10) {
        hasReportedPlayRef.current = true;
        playMutate();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [playMutate]);

  return (
    <div
      className="relative w-full flex flex-col bg-[#111111] rounded-[15px] cursor-pointer"
      onClick={() => navigate(`/music-video/${music.id}`)}
    >
      <div className="flex flex-row gap-[15px]">
        {/* 앨범 커버 */}
        <div
          className="relative w-[75px] h-[75px] rounded-[15px] overflow-hidden group shrink-0"
          onClick={handleTogglePlay}
        >
          <img
            src={imageUrl || DefaultMusic}
            alt="음악 재생"
            onError={(e) => {
              e.currentTarget.src = DefaultMusic;
            }}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            aria-label={isPlaying ? "일시정지" : "재생"}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition cursor-pointer group-hover:opacity-100"
          >
            {isPlaying ? (
              <Pause size={20} color="white" />
            ) : (
              <Play size={20} color="white" />
            )}
          </button>

          <audio ref={audioRef} src={audioUrl} />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-[6px] text-white flex-1 min-w-0">
          <div className="text-[12px] font-bold line-clamp-1">
            {music.title}
          </div>
          <div className="text-[9px] text-[#ddd] line-clamp-1">
            {music.creatorNickname}
          </div>

          {Array.isArray(music.tags) && music.tags.length > 0 && (
            <div className="flex flex-row gap-[6px] mt-[4px] flex-wrap">
              {music.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="h-[15px] px-[5px] text-[8.75px] bg-[#555555] rounded-[7.5px] flex items-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
