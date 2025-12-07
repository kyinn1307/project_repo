import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { MusicContentItem } from "@/components/ui/serve-pages/MusicContentItem";
import { getAllTracks, getTrackSearch } from "@/apis/music";
import type { Music, TrackResponse } from "@/types/music";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom"; // ✅ navigate 제거

export const MusicPage = () => {
  const [searchParams] = useSearchParams();

  // ✅ "실제 검색 기준"은 오직 URL 에서만 가져옴
  const keywordFromUrl = searchParams.get("keyword") ?? "";

  // ✅ SearchBar에 보여줄 "입력 중 값" (URL과 분리)
  const [q, setQ] = useState(keywordFromUrl);

  const pageSize = 15;

  // ✅ URL이 바뀌었을 때만 input 값 동기화
  useEffect(() => {
    setQ(keywordFromUrl);
  }, [keywordFromUrl]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      TrackResponse,
      Error,
      InfiniteData<TrackResponse>,
      [string, string],
      number | undefined
    >({
      queryKey: ["tracks", keywordFromUrl], // ✅ Enter로 바뀐 keyword만 반영
      queryFn: ({ pageParam }) =>
        keywordFromUrl
          ? getTrackSearch({
              k: keywordFromUrl,
              cursorId: pageParam,
              size: pageSize,
            })
          : getAllTracks(pageParam, pageSize),
      initialPageParam: undefined,
      getNextPageParam: (lastPage: TrackResponse) => lastPage.nextCursor,
    });

  const allTracks: Music[] = data?.pages.flatMap((page) => page.tracks) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-[38px] px-[5.2%]">
      <div className="h-[30px] flex items-center text-2xl text-white font-bold">
        음원
      </div>

      <div className="w-[50%] mt-[22.5px] min-w-[540px]">
        <SearchBar
          placeholder="음원 찾기"
          value="music"
          inputValue={q}
          onInputChange={setQ}
        />
      </div>

      <section
        className="
          grid 
          grid-cols-4 
          gap-x-[22.5px] 
          gap-y-[18.75px] 
          mt-[22.5px]
          min-w-[1080px]"
      >
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
