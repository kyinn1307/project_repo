import { useRef, useState, useEffect } from "react";
import { MusicVideoContainer } from "@/components/ui/music-video/MusicVideoContainer";
import { VideoControlBtn } from "@/components/ui/music-video/VideoControlBtn";
import { mockVideoList } from "@/constants/mockVideoList";

export const MusicVideoPage = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < mockVideoList.length) {
      const target = videoRefs.current[index];
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // 현재 보이는 비디오 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const idx = videoRefs.current.findIndex(
            (el) => el === visibleEntry.target
          );
          if (idx !== -1) setCurrentIndex(idx);
        }
      },
      {
        threshold: 0.6, // 60% 이상 보여야 현재 영상으로 간주
      }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {mockVideoList.map((video, idx) => (
          <div
            key={video.id}
            ref={(el: HTMLDivElement | null) => {
              videoRefs.current[idx] = el;
            }}
            className="h-screen snap-start flex-shrink-0"
          >
            <MusicVideoContainer video={video} />
          </div>
        ))}
      </div>
      <VideoControlBtn
        currentIndex={currentIndex}
        total={mockVideoList.length}
        scrollToIndex={scrollToIndex}
      />
    </>
  );
};
