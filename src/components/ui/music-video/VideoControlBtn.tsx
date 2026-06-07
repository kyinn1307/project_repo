import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  onPrev: () => void; // 위 방향
  onNext: () => void; // 아래 방향
  currentIndex: number;
  previousTrack: number | null;
}

export const VideoControlBtn = ({
  onPrev,
  onNext,
  currentIndex,
  previousTrack,
}: Props) => {
  return (
    <div className="fixed top-[358px] right-5 flex flex-col gap-[18.75px]">
      {/* 위 버튼 */}
      <button
        onClick={onNext}
        className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] cursor-pointer ${
          previousTrack ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp className="text-white" />
      </button>
      {/* 아래 버튼 */}
      <button
        onClick={onPrev}
        className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] cursor-pointer ${
          currentIndex === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ArrowDown className="text-white" />
      </button>
    </div>
  );
};
