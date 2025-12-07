import { useState, useEffect, useRef } from "react";
import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
import { MusicActionBar } from "./MusicActionBar";
import { ArrowRight } from "lucide-react";
import { MusicPlayIcon } from "@/assets/Icons/music-video/MusicPlayIcon";
import { PauseVideoIcon } from "@/assets/Icons/music-video/PauseVideoIcon";
import { Button } from "../button";
import { MusicVideoDetailContainer } from "./MusicVideoDetailContainer";
import { Music } from "@/types/music";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playTrack } from "@/apis/music";

export const MusicVideoContainer = ({
  track,
  cursorId,
}: {
  track: Music;
  cursorId?: number;
}) => {
  const { userId } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "LYRICS" | "COMMENT" | "CREDIT" | null
  >(null);

  const coverUrl = track.imageFiles?.[0]?.url || "";
  const audioUrl = track.audioFiles?.[0]?.url || "";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const listenedSecRef = useRef(0); // 누적 재생 시간(초)
  const lastTimeRef = useRef<number | null>(null); // 이전 timeupdate 시점
  const countedRef = useRef(false); // playMutate 1회만

  const { mutate: playMutate } = useMutation({
    mutationFn: () => playTrack(track.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track", track.id] });
    },
  });

  // 재생 상태 핸들링
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTabToggle = (tab: "LYRICS" | "COMMENT" | "CREDIT") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const handleUserClick = () => {
    if (userId === track.creatorId) {
      navigate("/my-profile");
    } else {
      navigate(`/user-profile/${track.creatorId}`);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const handleTimeUpdate = () => {
      const duration = audio.duration || 1;
      setProgress(audio.currentTime / duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    // 초기화 (트랙 바뀔 때마다)
    listenedSecRef.current = 0;
    lastTimeRef.current = null;
    countedRef.current = false;

    const handleTimeUpdate = () => {
      if (audio.paused) return;

      const t = audio.currentTime;
      if (lastTimeRef.current == null) {
        lastTimeRef.current = t;
        return;
      }

      // 앞으로 진행한 구간만 누적(되감기/탐색은 누적 제외)
      const delta = t - lastTimeRef.current;
      if (delta > 0) {
        listenedSecRef.current += delta;
      }
      lastTimeRef.current = t;

      // 10초 도달 시 1회만 카운트 증가
      if (!countedRef.current && listenedSecRef.current >= 5) {
        countedRef.current = true;
        playMutate();
      }
    };

    const handlePlayPauseSeekAlign = () => {
      // 탐색/일시정지/재생 시 기준점을 현재 시각으로 맞춰
      // 다음 timeupdate에서 delta가 비정상적으로 커지는 것 방지
      lastTimeRef.current = audio.currentTime;
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      lastTimeRef.current = null;
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlayPauseSeekAlign);
    audio.addEventListener("pause", handlePlayPauseSeekAlign);
    audio.addEventListener("seeked", handlePlayPauseSeekAlign);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlayPauseSeekAlign);
      audio.removeEventListener("pause", handlePlayPauseSeekAlign);
      audio.removeEventListener("seeked", handlePlayPauseSeekAlign);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl, playMutate]);

  // 기존 progress bar 업데이트 effect는 그대로 유지 (아래 예시처럼)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const handleTimeUpdateForUI = () => {
      const duration = audio.duration || 1;
      setProgress(audio.currentTime / duration);
    };
    audio.addEventListener("timeupdate", handleTimeUpdateForUI);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdateForUI);
  }, [audioUrl]);

  return (
    <>
      <div className="w-full flex flex-row justify-center text-white gap-[22.5px] snap-start flex-shrink-0">
        <div className="flex flex-col">
          <div className="flex px-[15.75px] h-[50px] items-center">
            {!isPlaying && <PauseVideoIcon />}
          </div>
          <div className="w-[525px] flex flex-col">
            <div
              className="relative w-full h-[525px]"
              onClick={handleTogglePlay}
            >
              {/* 실제 이미지 or 배경 */}
              <img
                src={coverUrl}
                onError={(e) => {
                  e.currentTarget.src = MusicDefault;
                }}
                className="w-full h-full object-cover rounded-[3.75px]"
              />

              {/* 오디오 태그 */}
              {audioUrl && <audio ref={audioRef} src={audioUrl} autoPlay />}

              {/* 재생횟수 */}
              <div className="absolute bottom-[15px] left-[27px] flex flex-row items-center gap-[7.5px] z-10">
                <MusicPlayIcon />
                <span className="text-white text-[13.5px] font-bold">
                  {track.playCount}
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
              <button
                className="w-full h-[30px] flex flex-row justify-between items-center border-[1.5px] border-[#0050EF] rounded-[22.5px] px-3 py-1 text-white cursor-pointer"
                onClick={handleUserClick}
              >
                <div className="text-[10.5px] font-medium">프로필 가기</div>
                <ArrowRight size={16} />
              </button>

              <div className="flex flex-col gap-[7.5px]">
                <div
                  className="flex flex-row gap-[7.5px] items-center cursor-pointer"
                  onClick={handleUserClick}
                >
                  <img
                    src={track.creatorProfileImageUrl}
                    className="w-[27px] h-[27px] object-cover rounded-full"
                  />
                  <div
                    className="text-[13.5px] font-bold cursor-pointer"
                    onClick={handleUserClick}
                  >
                    {track.creatorNickname}
                  </div>
                  <Button className="w-[47.25px] h-[27px] text-[10.5px] font-medium rounded-[22.5px] bg-[#0050ef] cursor-pointer">
                    팔로우
                  </Button>
                </div>
                <div className="text-xs font-bold flex flex-col gap-[7.5px]">
                  <div className="h-[17px]">{track.title}</div>
                  <div className="h-[17px]"> {track.genres.join(" / ")}</div>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-[7.5px]">
                  {track.tags.map((tag, idx) => (
                    <label
                      key={idx}
                      className="flex items-center h-[21px] rounded-[7.5px] bg-[#777777] text-xs font-medium px-3"
                    >
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={progress}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                const audio = audioRef.current;
                if (audio) {
                  audio.currentTime = value * (audio.duration || 0);
                  setProgress(value);
                }
              }}
              className="w-[525px] h-0.5 m-3 bg-[#555555] cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-[296px]">
          <MusicActionBar
            currentTab={activeTab}
            onTabChange={handleTabToggle}
            track={track}
            cursorId={cursorId!}
          />
        </div>
        {activeTab && (
          <MusicVideoDetailContainer
            tab={activeTab}
            setTab={setActiveTab}
            trackId={track.id}
          />
        )}
      </div>
    </>
  );
};
