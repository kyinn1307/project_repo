import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { MusicContentItem } from "@/components/ui/serve-pages/MusicContentItem";
import { getAllTracks, getTrackSearch } from "@/apis/music";
import type { Music, TrackResponse } from "@/types/music";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { Loader2 } from "lucide-react";

export const MusicPage = () => {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q]);

  const k = debouncedQ; // 실제 쿼리는 디바운스된 값 사용
  const pageSize = 15;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      TrackResponse,
      Error,
      InfiniteData<TrackResponse>,
      [string, string], // ⬅️ queryKey 타입에 검색어 포함
      number | undefined
    >({
      queryKey: ["tracks", k], // ⬅️ 검색어 포함 → 검색 변경 시 페이지네이션 초기화
      queryFn: ({ pageParam }) =>
        k
          ? getTrackSearch({ k, cursorId: pageParam, size: pageSize })
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
    <div className="flex flex-col pt-[38px] pl-[10%]">
      <div className="h-[30px] flex items-center text-2xl text-white font-bold">
        음원
      </div>
      <div className="w-[540px] mt-[22.5px]">
        <SearchBar
          placeholder="음원 찾기"
          value="track"
          inputValue={q}
          onInputChange={setQ}
        />
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
