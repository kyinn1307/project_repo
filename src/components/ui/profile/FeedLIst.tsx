import { FeedItem } from "./FeedItem";
import type { Feed } from "@/types/feed";

interface FeedListProps {
  list: Feed[];
}

export const FeedList = ({ list }: FeedListProps) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  console.log(list);
  return (
    <div className="flex flex-col">
      {list.map((feed) => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </div>
  );
};
