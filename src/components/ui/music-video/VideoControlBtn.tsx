import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
  currentIndex: number;
  total: number;
  scrollToIndex: (index: number) => void;
}

export const VideoControlBtn = ({
  currentIndex,
  total,
  scrollToIndex,
}: Props) => {
  return (
    <div className="fixed top-[358px] right-5 flex flex-col gap-[18.75px]">
      <button
        onClick={() => scrollToIndex(currentIndex - 1)}
        className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] transition-opacity cursor-pointer ${
          currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ArrowUp className="text-white" />
      </button>

      <button
        onClick={() => scrollToIndex(currentIndex + 1)}
        className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full bg-[#777777] transition-opacity cursor-pointer ${
          currentIndex === total - 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <ArrowDown className="text-white" />
      </button>
    </div>
  );
};
