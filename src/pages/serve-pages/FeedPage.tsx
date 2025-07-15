import { useQuery } from "@tanstack/react-query";
import { FeedItem } from "@/components/ui/profile/FeedItem";
import { getAllFeeds } from "@/apis/feed";
import { Feed } from "@/types/feed";

export const FeedPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feeds"],
    queryFn: getAllFeeds,
  });

  if (isLoading) return <div className="text-white">로딩 중...</div>;
  if (isError) return <div className="text-red-500">에러가 발생했습니다.</div>;

  return (
    <div className="flex flex-col pl-[25%] pt-[30px] gap-[13.5px]">
      {data.feeds?.map((feed: Feed) => (
        <section key={feed.id} className="w-135 text-white">
          <FeedItem feed={feed} />
        </section>
      ))}
    </div>
  );
};
