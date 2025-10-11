import { MusicianCardItem } from "./MusicianCardItem";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getAllMusicians } from "@/apis/musician";
import type { Musician, MusicianResponse } from "@/types/musician";
import { useEffect, useRef } from "react";
import { getMusicianSearch } from "@/apis/musician";

type Props = { searchTerm?: string };

export const InfiniteMusicianCardList = ({ searchTerm = "" }: Props) => {
  const keyword = searchTerm.trim();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      MusicianResponse,
      Error,
      InfiniteData<MusicianResponse>,
      [string, string],
      number | undefined
    >({
      queryKey: ["musicians", keyword],
      queryFn: ({ pageParam }) =>
        keyword
          ? getMusicianSearch({
              nickname: keyword,
              cursorId: pageParam,
              size: 20,
            })
          : getAllMusicians(pageParam, 20),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver 등록
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const musicians: Musician[] = data?.pages.flatMap((page) => page.users) ?? [];
  return (
    <div>
      <div className="flex flex-wrap gap-[15px]">
        {musicians.map((musician) => (
          <MusicianCardItem key={musician.id} musician={musician} />
        ))}
      </div>

      <div ref={observerRef} className="h-6" />

      {isLoading && <p>검색 중...</p>}
      {isFetchingNextPage && <p>불러오는 중...</p>}
    </div>
  );
};
