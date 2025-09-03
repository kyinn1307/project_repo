import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { MusicContentItem } from "@/components/ui/serve-pages/MusicContentItem";
import { getAllTracks } from "@/apis/music";
import type { Music, TrackResponse } from "@/types/music";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { Loader2 } from "lucide-react";

export const MusicPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      TrackResponse,
      Error,
      InfiniteData<TrackResponse>,
      [string],
      number | undefined // ✅ pageParam이 undefined일 수 있음
    >({
      queryKey: ["tracks"],
      queryFn: ({ pageParam }) => getAllTracks(pageParam, 15),
      initialPageParam: undefined,
      getNextPageParam: (lastPage: TrackResponse) => lastPage.nextCursor, // ✅ 서버에서 주는 nextCursor 사용
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
      <div className="h-[30px] flex items-center text-2xl text-white font-bold">
        음원
      </div>
      <div className="w-[540px] mt-[22.5px]">
        <SearchBar placeholder="음원 찾기" />
      </div>
      <section className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px] mt-[22.5px]">
        {isLoading && <div className="text-white">로딩 중...</div>}

        {allTracks.map((track) => (
          <div key={track.id} className="text-white">
            <MusicContentItem track={track} />
          </div>
        ))}
      </section>

      <div ref={ref} className="h-12 mt-10 flex justify-center items-center">
        {isFetchingNextPage && (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        )}
      </div>
    </div>
  );
};
