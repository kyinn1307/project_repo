import { MusicVideoDetailContent } from "./MusicVideoDetailContent";
import { MusicVideoDetailMenuBar } from "./MusicVideoDetailMenuBar";

interface MusicDetailContainerProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
  setTab: (tab: "LYRICS" | "COMMENT" | "CREDIT" | null) => void;
}

export const MusicVideoDetailContainer = ({
  tab,
  setTab,
}: MusicDetailContainerProps) => {
  return (
    <div className="w-[300px] bg-[#111111] mt-[58px] rounded-[7.5px]">
      <MusicVideoDetailMenuBar tab={tab} setTab={setTab} />
      <MusicVideoDetailContent tab={tab} />
    </div>
  );
};
