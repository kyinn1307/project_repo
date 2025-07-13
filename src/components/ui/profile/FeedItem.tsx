import { useState } from "react";
import { AvatarDemo } from "../common/AvatarDemo";
// import sample_post from "@/assets/Images/post_thumbnail.png";
import { Heart } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { FeedMoreMenu } from "./FeedMoreMenu";
import type { Feed } from "@/types/feed";

interface FeedItemProps {
  feed: Feed;
}

export const FeedItem = ({ feed }: FeedItemProps) => {
  const {
    // id,
    title,
    description,
    imageUrl,
    creatorNickname,
    likeCount,
    tags,
  } = feed;

  const [isExpanded, setIsExpanded] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);
  const handleLike = () => setIsLiked((prev) => !prev);

  return (
    <div className="w-full p-3 flex flex-col gap-[15px] rounded-[15px] bg-[#111] mb-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="flex flex-row gap-[15px] items-center text-[15px]">
            <AvatarDemo />
            <span>{creatorNickname}</span>
            <span className="text-[#777777]">3일전</span>
          </span>
          <div className="flex items-start">
            <FeedMoreMenu />
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="포스트 썸네일"
            className="w-[225px] h-[225px]"
          />
        </div>

        <div className="flex flex-row justify-between">
          <span
            className="flex flex-row gap-2 items-center text-[13.5px] text-[#777777] cursor-pointer"
            onClick={handleLike}
          >
            <Heart
              size={13.5}
              fill={isLiked ? "red" : "none"}
              className={isLiked ? "text-red-500" : "text-[#777777]"}
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
