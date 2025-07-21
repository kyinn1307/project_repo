import { FeedItem } from "./FeedItem";
import type { Feed } from "@/types/feed";

interface FeedListProps {
  list: Feed[];
  isUser?: boolean;
}

export const FeedList = ({ list, isUser }: FeedListProps) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  console.log(list);
  return (
    <div className="flex flex-col">
      {list.map((feed) => (
        <FeedItem key={feed.id} feed={feed} isUser={isUser} />
      ))}
    </div>
  );
};
