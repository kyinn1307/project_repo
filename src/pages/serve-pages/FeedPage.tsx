import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { FeedItem } from "@/components/ui/profile/FeedItem";
import { getAllFeeds } from "@/apis/feed";
import { useUserStore } from "@/stores/useUserStore";
import type { Feed, FeedResponse } from "@/types/feed";

export const FeedPage = () => {
  const { userId } = useUserStore();
  const size = 2;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    FeedResponse,
    Error,
    InfiniteData<FeedResponse>,
    [string],
    number | undefined
  >({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }) => getAllFeeds(pageParam, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allFeeds: Feed[] = data?.pages.flatMap((page) => page.feeds) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pl-[25%] pt-[30px] gap-[13.5px]">
      {isLoading && <div className="text-white">로딩 중...</div>}
      {isError && <div className="text-red-500">에러가 발생했습니다.</div>}

      {allFeeds.map((feed) => (
        <section key={feed.id} className="w-135 text-white">
          <FeedItem feed={feed} isUser={userId !== feed.creatorId} />
        </section>
      ))}

      <div ref={ref} className="h-12 mt-6 text-center text-white">
        {isFetchingNextPage
          ? "피드 불러오는 중..."
          : hasNextPage
          ? "더 불러오는 중..."
          : ""}
      </div>
    </div>
  );
};
