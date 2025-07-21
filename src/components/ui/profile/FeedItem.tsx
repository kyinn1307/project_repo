import { useState } from "react";
import { AvatarDemo } from "../common/AvatarDemo";
import { Heart } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { FeedMoreMenu } from "./FeedMoreMenu";
import { UserFeedMoreMenu } from "./UserFeedMoreMenu";
import type { Feed } from "@/types/feed";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFeedLike } from "@/apis/feed";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
interface FeedItemProps {
  feed: Feed;
  isUser?: boolean;
}

export const FeedItem = ({ feed, isUser }: FeedItemProps) => {
  const { userId } = useUserStore();
  const {
    id,
    title,
    description,
    imageUrl,
    creatorId,
    creatorNickname,
    likeCount,
    liked,
    tags,
  } = feed;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(true);

  const { mutate } = useMutation({
    mutationFn: () => toggleFeedLike(id),
    onSuccess: () => {
      console.log("좋아요 성공");
      queryClient.invalidateQueries({ queryKey: ["myFeeds"] });
    },
    onError: (err) => {
      console.error("좋아요 실패", err);
      alert("좋아요 처리에 실패했습니다.");
    },
  });

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const handleUserClick = () => {
    if (userId === creatorId) {
      navigate("/my-profile");
    } else {
      navigate(`/user-profile/${creatorId}`);
    }
  };

  return (
    <div className="w-full p-3 flex flex-col gap-[15px] rounded-[15px] bg-[#111] mb-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="flex flex-row gap-[15px] items-center text-[15px]">
            <span className="cursor-pointer" onClick={handleUserClick}>
              <AvatarDemo />
            </span>
            <span className="cursor-pointer" onClick={handleUserClick}>
              {creatorNickname}
            </span>
            <span className="text-[#777777]">3일전</span>
          </span>
          <div className="flex items-start">
            {isUser ? (
              <UserFeedMoreMenu />
            ) : (
              // <UserFeedMoreMenu feedId={id} />
              <FeedMoreMenu feedId={id} />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="포스트 썸네일"
            className="w-[225px] h-[225px] object-cover"
          />
        </div>

        <div className="flex flex-row justify-between">
          <span
            className="flex flex-row gap-2 items-center text-[13.5px] text-[#777777] cursor-pointer"
            onClick={() => mutate()}
          >
            <Heart
              size={13.5}
              className={liked ? "text-[#ff2b2b]" : "text-[#777777]"}
              fill={liked ? "#ff2b2b" : "none"}
            />
            {likeCount}
          </span>
          <div className="flex flex-row gap-2 items-center text-[#ffffff]">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]"
              >
                {tag}
              </span>
            ))}
            <button onClick={handleToggle} className="text-[#777777]">
              <ChevronDown
                className={`transition-transform cursor-pointer ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-1 text-[10.5px] text-[#ffffff]">
          <div className="font-bold">{title}</div>
          <div className="font-regular whitespace-pre-line">{description}</div>
        </div>
      )}
    </div>
  );
};
