import { useRef, useState, useEffect } from "react";

import MusicDefault from "@/assets/Images/MusicPlayDefault.png";
import { Heart } from "lucide-react";
import { PlayIcon } from "@/assets/Icons/my-profile/PlayIcon";
import { LyricsSmallIcon } from "@/assets/Icons/my-profile/LyricsSmallIcon";
import { MusicMoreMenu } from "./MusicMoreMenu";
import type { Music, TrackResponse } from "@/types/music";
import { playTrack, toggleTrackLike } from "@/apis/music";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Play, Pause } from "lucide-react";
import { UserMusicMoreMenu } from "./UserMusicMoreMenu";
interface MusicItemProps {
  music: Music;
  isUser?: boolean;
  userId?: number;
}

export const MusicItem = ({ music, isUser }: MusicItemProps) => {
  const {
    id,
    audioFiles,
    imageFiles,
    title,
    creatorNickname,
    playCount,
    tags = [],
  } = music;

  const queryClient = useQueryClient();

  const trackQueries = queryClient.getQueryCache().findAll({
    predicate: (query) => {
      const key = query.queryKey[0];
      return key === "myTracks" || key == "userTracks";
    },
  });

  let liveTrack: Music | undefined;

  for (const q of trackQueries) {
    const data = q.state.data as InfiniteData<TrackResponse> | undefined;
    if (!data || !("pages" in data)) continue;

    const found = data.pages.flatMap((p) => p.tracks).find((t) => t.id === id);

    if (found) {
      liveTrack = found;
      break;
    }
  }

  const { liked, likeCount } = liveTrack ?? music;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasReportedPlayRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutate: playMutate } = useMutation({
    mutationFn: () => playTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track", id] });
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => toggleTrackLike(id),

    onMutate: async () => {
      for (const q of trackQueries) {
        await queryClient.cancelQueries({ queryKey: q.queryKey });
      }

      const previousTracks = trackQueries.map((q) => ({
        key: q.queryKey,
        data: q.state.data as InfiniteData<TrackResponse> | undefined,
      }));

      for (const { key, data } of previousTracks) {
        if (!data || !("pages" in data)) continue;

        queryClient.setQueryData<InfiniteData<TrackResponse>>(key, {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            tracks: page.tracks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    liked: !t.liked,
                    likeCount: t.liked ? t.likeCount - 1 : t.likeCount + 1,
                  }
                : t
            ),
          })),
        });
      }

      return { previousTracks };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTracks) {
        for (const { key, data } of context.previousTracks) {
          queryClient.setQueryData(key, data);
        }
      }
    },

    onSettled: () => {
      for (const q of trackQueries) {
        queryClient.invalidateQueries({ queryKey: q.queryKey });
      }
    },
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const duration = audio.duration || 1;
      setProgress(audio.currentTime / duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };
  };

  useEffect(() => {
    hasReportedPlayRef.current = false;
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const duration = audio.duration || 1;
      const currentTime = audio.currentTime;

      // progress
      setProgress(currentTime / duration);

      // ✅ 10초 이상 재생 → play count 증가 (1번만)
      if (!hasReportedPlayRef.current && currentTime >= 5) {
        hasReportedPlayRef.current = true;
        playMutate();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [playMutate]);

  return (
    <div className="w-full flex flex-col pb-1 ">
      <div className="relative flex flex-col overflow-hidden bg-[#111111] rounded-[15px] mb-[8.75px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="relative w-[75px] h-[75px] mr-[7.5px] rounded-[15px] overflow-hidden group">
              <img
                src={imageFiles[0].url || MusicDefault}
                alt="음악 재생"
                className="w-[75px] h-[75px] mr-[7.5px] rounded-[15px] object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={handlePlay}
              >
                {isPlaying ? <Pause size={20} color="white" /> : <Play />}
              </button>
              <audio ref={audioRef} src={audioFiles[0].url} />
            </div>

            <div className="flex flex-col mt-[18.75px]">
              <div className="text-[15px] font-bold mb-[7.5px]">{title}</div>
              <div className="flex flex-col text-[9px]">
                <div>{creatorNickname}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-[#ffffff] mt-[3.44px] mr-[11.12px]">
            {isUser ? <UserMusicMoreMenu /> : <MusicMoreMenu musicId={id} />}

            <div className="flex flex-row gap-[7.5px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="h-4 px-[5px] py-[2px] text-[8.75px] bg-[#555555] rounded-[7.5px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ProgressBar */}
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
          className="absolute bottom-0 w-full h-1 bg-[#555555] cursor-pointer"
        />
      </div>

      <div className="flex flex-row justify-between text-[10.5px] px-[15px] mb-[22.5px]">
        <div className="flex flex-row gap-5 justify-between">
          <span
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => mutate()}
          >
            <Heart
              size={10.5}
              className={liked ? "text-[#ff2b2b]" : "text-[#777777]"}
              fill={liked ? "#ff2b2b" : "none"}
            />
            {likeCount}
          </span>
          <span className="flex flex-row gap-2 items-center">
            <PlayIcon /> {playCount}
          </span>
        </div>
        <span className="flex items-center">
          <LyricsSmallIcon />
        </span>
      </div>
    </div>
  );
};
