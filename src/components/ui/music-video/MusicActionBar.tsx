import { Heart, Users } from "lucide-react";
import { KeyComment } from "@/assets/Icons/music-video/KeyComment";
import { LyricsIcon } from "@/assets/Icons/music-video/LyricsIcon";
import { Music, TrackResponse } from "@/types/music";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTrackLike } from "@/apis/music";

interface Props {
  currentTab: "LYRICS" | "COMMENT" | "CREDIT" | null;
  onTabChange: (tab: "LYRICS" | "COMMENT" | "CREDIT") => void;
  track: Music;
  cursorId: number;
}

export const MusicActionBar = ({ onTabChange, track, cursorId }: Props) => {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<TrackResponse>(["track", cursorId]);
  const liveTrack = cached?.tracks?.[0] ?? track;

  const { liked, likeCount } = liveTrack;

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => toggleTrackLike(track.id),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["track", cursorId],
      });

      const previous = queryClient.getQueryData<TrackResponse>([
        "track",
        cursorId,
      ]);

      if (previous?.tracks?.[0]) {
        const prevTrack = previous.tracks[0];

        queryClient.setQueryData(["track", cursorId], {
          ...previous,
          tracks: [
            {
              ...prevTrack,
              liked: !prevTrack.liked,
              likeCount: prevTrack.liked
                ? prevTrack.likeCount - 1
                : prevTrack.likeCount + 1,
            },
          ],
        });
      }

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["track", cursorId], ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["track"],
      });
    },
  });

  return (
    <div className="flex flex-col items-center gap-[15px] py-2">
      {/* 좋아요 */}
      <div className="flex flex-col items-center">
        <button
          className="w-[39px] h-[39px] bg-[#2D2D2D] rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => likeMutate()}
        >
          <Heart
            className={`w-[18px] h-[18px] ${
              liked ? "text-red-500" : "text-white"
            }`}
            fill={liked ? "currentColor" : "none"}
          />
        </button>
        <span className="text-[10.5px] mt-1">{likeCount}</span>
      </div>

      {/* 가사 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("LYRICS")}
          className="flex justify-center items-center w-[39px] h-[39px] rounded-full bg-[#2D2D2D] cursor-pointer"
        >
          <LyricsIcon />
        </button>
        <span className="text-[10.5px] mt-1">가사</span>
      </div>

      {/* 코멘트 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("COMMENT")}
          className="flex justify-center items-center w-[39px] h-[39px] rounded-full bg-[#2D2D2D] cursor-pointer"
        >
          <KeyComment />
        </button>
        <span className="text-[10.5px] mt-1">코멘트</span>
      </div>

      {/* 크레딧 */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onTabChange("CREDIT")}
          className="flex justify-center items-center w-[39px] h-[39px] rounded-full bg-[#2D2D2D] cursor-pointer"
        >
          <Users className="text-white w-[18px] h-[18px]" />
        </button>
        <span className="text-[10.5px] mt-1">크레딧</span>
      </div>
    </div>
  );
};
