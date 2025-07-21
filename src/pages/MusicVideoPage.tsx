import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getAllTracks, getTrackDetail } from "@/apis/music";
import { MusicVideoContainer } from "@/components/ui/music-video/MusicVideoContainer";
import type { Music, TrackResponse } from "@/types/music";

export const MusicVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentId = Number(id);

  const { data: track, isLoading: isTrackLoading } = useQuery({
    queryKey: ["trackDetail", currentId],
    queryFn: () => getTrackDetail(currentId),
    enabled: !!id,
  });

  const { data } = useInfiniteQuery<
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

  const trackList: Music[] = data?.pages.flatMap((page) => page.tracks) || [];
  const currentIndex = trackList.findIndex((t) => t.id === currentId);

  const getNextTrack = () => trackList[currentIndex + 1] || null;
  const getPrevTrack = () => trackList[currentIndex - 1] || null;

  // 스크롤 감지 및 트랜지션 시작
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;

      if (e.deltaY > 50) {
        const next = getNextTrack();
        if (next) triggerTransition("down", next.id);
      } else if (e.deltaY < -50) {
        const prev = getPrevTrack();
        if (prev) triggerTransition("up", prev.id);
      }
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("wheel", handleWheel, { passive: true });

    return () => wrapper?.removeEventListener("wheel", handleWheel);
  }, [trackList, currentIndex, isAnimating]);

  const triggerTransition = (direction: "up" | "down", targetId: number) => {
    setIsAnimating(true);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.style.transition = "transform 0.6s ease-in-out";
    wrapper.style.transform =
      direction === "down" ? "translateY(-100%)" : "translateY(100%)";

    // 애니메이션 끝나면 이동
    setTimeout(() => {
      wrapper.style.transition = "";
      wrapper.style.transform = "";
      setIsAnimating(false);
      navigate(`/music-video/${targetId}`);
    }, 600);
  };

  if (isTrackLoading || !track) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        로딩중..
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-full">
        <MusicVideoContainer track={track} />
      </div>
    </div>
  );
};
