import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"; // 👈 추가
import { AdContent } from "@/components/ui/serve-pages/AdContent";
import { MusicContentItem } from "@/components/ui/serve-pages/MusicContentItem";
import { getAllTracks } from "@/apis/music";
import type { Music, TrackResponse } from "@/types/music";

export const MusicPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    TrackResponse,
    Error,
    InfiniteData<TrackResponse>,
    [string],
    number
  >({
    queryKey: ["tracks"],
    queryFn: ({ pageParam = 1 }) => getAllTracks(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TrackResponse) => lastPage.nextCursor,
  });

  // 올 트랙 합치기
  const allTracks: Music[] = data?.pages.flatMap((page) => page.tracks) ?? [];

  const { ref, inView } = useInView();

  // 👇 inView가 true이면 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-[38px] pl-[10%]">
      <AdContent />
      <section className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px] mt-[53.25px]">
        {isLoading && <div className="text-white">로딩 중...</div>}
        {isError && <div className="text-red-500">트랙 불러오기 실패</div>}

        {allTracks.map((track) => (
          <div key={track.id} className="w-[243.75px] text-white">
            <MusicContentItem track={track} />
          </div>
        ))}
      </section>

      {/* 👇 관찰용 div */}
      <div ref={ref} className="h-12 mt-10 text-center text-white">
        {isFetchingNextPage
          ? "다음 곡 불러오는 중..."
          : hasNextPage
          ? "더 불러오는 중..."
          : ""}
      </div>
    </div>
  );
};
