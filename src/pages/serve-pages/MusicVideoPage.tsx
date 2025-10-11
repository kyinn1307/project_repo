import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicVideoContainer } from "@/components/ui/music-video/MusicVideoContainer";
import type { Music } from "@/types/music";
import { useQuery } from "@tanstack/react-query";
import { getTrackDetail } from "@/apis/music";
import { VideoControlBtn } from "@/components/ui/music-video/VideoControlBtn";

export const MusicVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [trackId, setTrackId] = useState<number | null>(id ? Number(id) : null);

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["tracks"],
  //     queryFn: ({ pageParam = 0 }) => getAllTracks(pageParam, 1),
  //     initialPageParam: Number(id),
  //     getNextPageParam: (lastPage) => lastPage.nextCursor,
  //   });

  // const trackList: Music[] = data?.pages.flatMap((page) => page.tracks) || [];

  // 현재 트랙 조회
  const { data: track, isFetching } = useQuery<Music>({
    queryKey: ["track-detail", trackId],
    queryFn: () => getTrackDetail(trackId!),
    enabled: trackId !== null,
  });

  // URL 변경 시 trackId 동기화
  useEffect(() => {
    if (id && Number(id) !== trackId) {
      setTrackId(Number(id));
    }
  }, [id]);

  // trackId 변경 시 URL replace
  useEffect(() => {
    if (trackId && String(trackId) !== id) {
      navigate(`/music-video/${trackId}`, { replace: true });
    }
  }, [trackId]);

  // 스크롤로 다음 트랙 id 변경
  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    // ✅ id가 1이면 아래 스크롤 막기(관찰 X)
    if (trackId === null || trackId <= 1) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setTrackId((prev) => (prev && prev > 1 ? prev - 1 : prev));
        }
      },
      { root: container, threshold: 0.9 }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [isFetching, trackId]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-36px)] overflow-y-scroll snap-y snap-mandatory"
    >
      <div className="min-h-[calc(100vh-36px)] flex items-center justify-center">
        {track && <MusicVideoContainer track={track} />}
      </div>
      {trackId && trackId > 1 && <div ref={sentinelRef} className="h-1" />}

      <VideoControlBtn
        currentIndex={trackId ?? 1}
        scrollToIndex={(next) => {
          if (!next || next < 1) return;
          setTrackId(next);
        }}
      />
    </div>
  );
};
