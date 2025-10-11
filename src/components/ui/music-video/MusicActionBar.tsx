import { Heart, Users } from "lucide-react";
import { KeyComment } from "@/assets/Icons/music-video/KeyComment";
import { LyricsIcon } from "@/assets/Icons/music-video/LyricsIcon";
import { Music } from "@/types/music";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTrackLike } from "@/apis/music";

interface Props {
  currentTab: "LYRICS" | "COMMENT" | "CREDIT" | null;
  onTabChange: (tab: "LYRICS" | "COMMENT" | "CREDIT") => void;
  track: Music;
}

export const MusicActionBar = ({ onTabChange, track }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => toggleTrackLike(track.id),

    // ✅ 낙관적 업데이트
    onMutate: async () => {
      // 1) 이 쿼리로 진행 중인 요청이 있으면 정지
      await queryClient.cancelQueries({ queryKey: ["track-detail", track.id] });

      // 2) 이전 데이터 백업
      const previous = queryClient.getQueryData<Music>([
        "track-detail",
        track.id,
      ]);

      // 3) 캐시 즉시 반영 (liked 토글 + likeCount 증감)
      if (previous) {
        const nextLiked = !previous.liked;
        const nextCount = Math.max(
          0,
          previous.likeCount + (nextLiked ? 1 : -1)
        );

        queryClient.setQueryData<Music>(["track-detail", track.id], {
          ...previous,
          liked: nextLiked,
          likeCount: nextCount,
        });
      }

      // 실패 시 롤백을 위해 context 반환
      return { previous };
    },

    // ❌ 실패 시 롤백
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["track-detail", track.id], ctx.previous);
      }
    },

    // 🎯 성공/실패와 무관하게 최종 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["track-detail", track.id] });
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
              track.liked ? "text-red-500" : "text-white"
            }`}
            fill={track.liked ? "currentColor" : "none"}
          />
        </button>
        <span className="text-[10.5px] mt-1">{track.likeCount}</span>
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
