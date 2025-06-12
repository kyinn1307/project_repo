interface MusicDetailMenuBarProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
}

export const MusicVideoDetailMenuBar = ({ tab }: MusicDetailMenuBarProps) => {
  return (
    <div className="w-full flex flex-row gap-12 px-3 pt-[10.5px] text-[18px]">
      <span
        className={`w-15 text-center ${
          tab === "LYRICS"
            ? "text-white font-bold"
            : "text-[#777777] font-medium"
        }`}
      >
        가사
      </span>
      <span
        className={`w-15 text-center ${
          tab === "COMMENT"
            ? "text-white font-bold"
            : "text-[#777777] font-medium"
        }`}
      >
        코멘트
      </span>
      <span
        className={`w-15 text-center ${
          tab === "CREDIT"
            ? "text-white font-bold"
            : "text-[#777777] font-medium"
        }`}
      >
        크레딧
      </span>
    </div>
  );
};
