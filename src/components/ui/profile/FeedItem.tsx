import { useEffect, useRef, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { FeedMoreMenu } from "./FeedMoreMenu";
import { UserFeedMoreMenu } from "./UserFeedMoreMenu";
import type { Feed, FeedResponse } from "@/types/feed";
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { toggleFeedLike } from "@/apis/feed";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { formatYMDdot } from "@/utils/formatDate";
import sample from "@/assets/Images/sample-musician.png";

interface FeedItemProps {
  feed: Feed;
  isUser?: boolean;
}

export const FeedItem = ({ feed, isUser }: FeedItemProps) => {
  const { userId } = useUserStore();
  const {
    id,
    imageFiles,
    createdAt,
    creatorId,
    creatorNickname,
    creatorProfileImageUrl,
    tags,
  } = feed;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(720);

  // ✅ ✅ ✅ InfiniteQuery에서 최신 feed 상태 가져오기
  const cachedFeeds = queryClient.getQueryData<InfiniteData<FeedResponse>>([
    "feeds",
  ]);

  const liveFeed =
    cachedFeeds?.pages.flatMap((page) => page.feeds).find((f) => f.id === id) ??
    feed;

  const { liked, likeCount, title, description } = liveFeed;

  // ✅ ✅ ✅ 낙관적 업데이트
  const { mutate } = useMutation({
    mutationFn: () => toggleFeedLike(id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["feeds"] });

      const previous = queryClient.getQueryData<InfiniteData<FeedResponse>>([
        "feeds",
      ]);

      if (!previous) return { previous };

      queryClient.setQueryData<InfiniteData<FeedResponse>>(["feeds"], {
        ...previous,
        pages: previous.pages.map((page) => ({
          ...page,
          feeds: page.feeds.map((f) =>
            f.id === id
              ? {
                  ...f,
                  liked: !f.liked,
                  likeCount: f.liked ? f.likeCount - 1 : f.likeCount + 1,
                }
              : f
          ),
        })),
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["feeds"], context.previous);
      }
      alert("좋아요 처리 실패");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  const handleUserClick = () => {
    if (userId === creatorId) navigate("/my-profile");
    else navigate(`/user-profile/${creatorId}`);
  };

  const updateWidth = () => {
    if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const calcMinHeight = (w: number) => {
    const baseWidth = 720;
    const baseHeight = isExpanded
      ? imageFiles?.length > 0
        ? 450
        : 100
      : imageFiles?.length > 0
      ? 400
      : 98;
    return (w / baseWidth) * baseHeight;
  };

  return (
    <div
      ref={cardRef}
      className="w-full p-3 flex flex-col rounded-[15px] bg-[#111] mb-[30px]"
      style={{ minHeight: calcMinHeight(cardWidth) }}
    >
      <div className="flex justify-between">
        <span className="flex gap-[15px] items-center text-[15px]">
          <img
            onClick={handleUserClick}
            src={creatorProfileImageUrl || sample}
            className="w-[30px] h-[30px] rounded-full object-cover cursor-pointer"
          />
          <span className="cursor-pointer" onClick={handleUserClick}>
            {creatorNickname}
          </span>
          <span className="text-[#777777]">{formatYMDdot(createdAt)}</span>
        </span>
        {isUser ? <UserFeedMoreMenu /> : <FeedMoreMenu feedId={id} />}
      </div>

      {imageFiles?.length > 0 && (
        <div className="flex justify-center my-4">
          <img
            src={imageFiles[0]?.url}
            className="w-[41.6%] object-cover aspect-square"
          />
        </div>
      )}

      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <span
            className="flex gap-2 items-center text-[13.5px] text-[#777777] cursor-pointer"
            onClick={() => mutate()}
          >
            <Heart
              size={13.5}
              className={liked ? "text-[#ff2b2b]" : "text-[#777777]"}
              fill={liked ? "#ff2b2b" : "none"}
            />
            {likeCount}
          </span>

          <div className="flex gap-2 items-center">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-[7.5px] text-[10.5px] bg-[#555555] rounded-[7.5px]"
              >
                {tag}
              </span>
            ))}

            <button onClick={() => setIsExpanded((p) => !p)}>
              <ChevronDown
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-[10px] text-[10.5px] text-white">
            <div className="font-bold">{title}</div>
            <div className="whitespace-pre-line">{description}</div>
          </div>
        )}
      </div>
    </div>
  );
};
