interface MusicDetailMenuBarProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
  setTab: (tab: "LYRICS" | "COMMENT" | "CREDIT") => void;
}

export const MusicVideoDetailMenuBar = ({
  tab,
  setTab,
}: MusicDetailMenuBarProps) => {
  return (
    <div className="w-full flex flex-row gap-12 px-3 pt-[10.5px] text-[18px]">
      <span
        onClick={() => setTab("LYRICS")}
        className={`w-15 text-center cursor-pointer ${
          tab === "LYRICS"
            ? "text-white font-bold"
            : "text-[#777777] font-medium"
        }`}
      >
        가사
      </span>
      <span
        onClick={() => setTab("COMMENT")}
        className={`w-15 text-center cursor-pointer ${
          tab === "COMMENT"
            ? "text-white font-bold"
            : "text-[#777777] font-medium"
        }`}
      >
        코멘트
      </span>
      <span
        onClick={() => setTab("CREDIT")}
        className={`w-15 text-center cursor-pointer ${
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
