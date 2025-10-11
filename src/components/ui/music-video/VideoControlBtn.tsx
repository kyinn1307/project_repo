import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  currentIndex: number;
  scrollToIndex: (index: number) => void;
  total?: number; // 지금은 안 씀
}

export const VideoControlBtn = ({ currentIndex, scrollToIndex }: Props) => {
  return (
    <div className="fixed top-[358px] right-5 flex flex-col gap-[18.75px]">
      {/* 위 버튼: +1 */}
      <button
        onClick={() => scrollToIndex(currentIndex + 1)}
        className="w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] cursor-pointer"
      >
        <ArrowUp className="text-white" />
      </button>

      {/* 아래 버튼: -1, 단 currentIndex === 1 이면 숨김 */}
      <button
        onClick={() => scrollToIndex(currentIndex - 1)}
        className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] cursor-pointer ${
          currentIndex === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ArrowDown className="text-white" />
      </button>
    </div>
  );
};
