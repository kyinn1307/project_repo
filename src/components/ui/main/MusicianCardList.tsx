import { useEffect, useState, useRef, useCallback } from "react";
import { MusicianCardItem } from "./MusicianCardItem";

export const MusicianCardList = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const totalData = Array.from({ length: 100 });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && visibleCount < totalData.length) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 10, totalData.length));
          setLoading(false);
        }, 800);
      }
    },
    [loading, visibleCount, totalData.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-8 justify-start">
      {totalData.slice(0, visibleCount).map((_, index) => (
        <div
          key={index}
          className="min-w-[200px] max-w-[220px] flex-1 basis-[20%]"
        >
          <MusicianCardItem />
        </div>
      ))}

      {visibleCount < totalData.length && (
        <div
          ref={loadMoreRef}
          className="w-full flex justify-center items-center mt-6"
        >
          {loading && (
            <div className="w-6 h-6 border-2 border-t-transparent border-[#cccccc] rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};
