import { MusicVideoDetailContent } from "./MusicVideoDetailContent";
import { MusicVideoDetailMenuBar } from "./MusicVideoDetailMenuBar";

interface MusicDetailContainerProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
}
export const MusicVideoDetailContainer = ({
  tab,
}: MusicDetailContainerProps) => {
  return (
    <div className="w-[300px] bg-[#111111] mt-[58px] rounded-[7.5px]">
      <MusicVideoDetailMenuBar tab={tab} />
      <MusicVideoDetailContent />
    </div>
  );
};
