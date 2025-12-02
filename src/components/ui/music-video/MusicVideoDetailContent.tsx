import { getTrackDetail } from "@/apis/music";
import { Participant } from "@/types/musician";
import { useQuery } from "@tanstack/react-query";
import sample from "@/assets/Images/sample-musician.png";

interface MusicVideoDetailContentProps {
  tab: "LYRICS" | "COMMENT" | "CREDIT";
  trackId: number;
}

export const MusicVideoDetailContent = ({
  tab,
  trackId,
}: MusicVideoDetailContentProps) => {
  const { data } = useQuery({
    queryKey: ["track-detail", trackId],
    queryFn: () => getTrackDetail(trackId),
    enabled: Number.isFinite(trackId),
  });

  const lyrics = data.lyrics?.trim();
  const description = data.description?.trim();
  const participants = data.participants ?? [];

  const renderContent = () => {
    switch (tab) {
      case "LYRICS":
        return (
          <p className="max-w-[300px] text-[13.5px] font-medium whitespace-pre-wrap break-words">
            {lyrics}
          </p>
        );
      case "COMMENT":
        return (
          <div className="h-130 flex flex-col text-white text-sm px-2">
            <p className="whitespace-pre-wrap break-words">{description}</p>
          </div>
        );
      case "CREDIT":
        return (
          <div className="grid grid-cols-3 gap-2">
            {participants.map((p: Participant, idx: number) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={p.profileImageUrl || sample}
                  alt={p.nickname}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <span className="mt-1 text-[13px] text-white font-medium">
                  {p.nickname}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center px-[50px] mt-[50.5px] text-center text-white leading-relaxed overflow-y-auto max-h-[600px] lyrics-scrollbar">
      {renderContent()}
    </div>
  );
};
