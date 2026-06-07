import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicVideoContainer } from "@/components/ui/music-video/MusicVideoContainer";
import { useQuery } from "@tanstack/react-query";
import { getAllTracks } from "@/apis/music";
import { VideoControlBtn } from "@/components/ui/music-video/VideoControlBtn";
import { Music } from "@/types/music";

export const MusicVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // cursorId = trackId + 1
  const [cursorId, setCursorId] = useState<number | null>(
    id ? Number(id) + 1 : null
  );

  const [trackId, setTrackId] = useState<number | null>(id ? Number(id) : null);
  const [nextTrack, setNextTrack] = useState<Music | null>();

  // 현재 트랙 조회
  const { data: trackResponse, isFetching } = useQuery({
    queryKey: ["track", cursorId],
    queryFn: () => getAllTracks(cursorId!, 1),
    enabled: cursorId !== null,
    refetchOnWindowFocus: false,
  });

  // 현재 트랙 변경 시 next 트랙 미리 로드를 진행
  useEffect(() => {
    const fetchNextTrack = async () => {
      const nextCursor = trackResponse?.nextCursor;
      if (!nextCursor) return setNextTrack(null);

      const res = await getAllTracks(nextCursor, 1);
      const next = res?.tracks?.[0];
      setNextTrack(next);
    };
    if (trackResponse) fetchNextTrack();
  }, [trackResponse]);

  // 데이터 도착 → trackId 갱신 + URL 갱신
  useEffect(() => {
    const newTrack = trackResponse?.tracks?.[0];
    if (newTrack) {
      setTrackId(newTrack.id);
    }
  }, [trackResponse]);

  // 아래 버튼 → nextCursor 로 이동
  const handlePrev = () => {
    const nextCursor = trackResponse?.nextCursor;
    if (!nextCursor) return;
    setCursorId(nextCursor);
    navigate(`/music-video/${nextTrack?.id}`);
  };

  // 위 버튼 → previousTrack API가 없으므로 "임의로 trackId+1" 사용
  const handleNext = () => {
    if (!trackResponse?.previousTrack) return;

    const nextId = trackResponse?.previousTrack;
    navigate(`/music-video/${nextId}`, { replace: true });
    setCursorId(nextId + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          handleNext();
        }
      },
      { root: container, threshold: 0.9 }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, [isFetching, trackResponse]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-36px)] overflow-y-scroll snap-y snap-mandatory"
    >
      <div className="min-h-[calc(100vh-36px)] flex items-center justify-center">
        {trackResponse && (
          <MusicVideoContainer
            track={trackResponse.tracks[0]}
            cursorId={cursorId || 0}
          />
        )}
      </div>

      <VideoControlBtn
        currentIndex={trackId ?? 1}
        onPrev={handlePrev}
        onNext={handleNext}
        previousTrack={trackResponse?.previousTrack || null}
      />
    </div>
  );
};
