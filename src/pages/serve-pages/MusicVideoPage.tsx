import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getAllTracks } from "@/apis/music";
import { MusicVideoContainer } from "@/components/ui/music-video/MusicVideoContainer";
import type { Music } from "@/types/music";

export const MusicVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tracks"],
      queryFn: ({ pageParam = 0 }) => getAllTracks(pageParam, 1),
      initialPageParam: 606,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const trackList: Music[] = data?.pages.flatMap((page) => page.tracks) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const videoId = visible.target.getAttribute("data-id");
          if (videoId && videoId !== id) {
            navigate(`/music-video/${videoId}`, { replace: true });
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [trackList]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.9,
      }
    );

    const lastEl = containerRef.current?.querySelector("[data-last]");
    if (lastEl) observer.observe(lastEl);

    return () => {
      if (lastEl) observer.unobserve(lastEl);
    };
  }, [trackList, hasNextPage, isFetchingNextPage]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-36px)] overflow-y-scroll snap-y snap-mandatory"
    >
      {trackList.map((track, idx) => (
        <div
          key={track.id}
          data-id={track.id}
          data-last={idx === trackList.length - 1 ? "true" : undefined}
          className="snap-start h-[calc(100vh-36px)] flex items-center justify-center"
        >
          <MusicVideoContainer track={track} />
        </div>
      ))}
    </div>
  );
};
