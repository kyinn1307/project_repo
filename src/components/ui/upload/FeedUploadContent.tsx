import { TitleInput } from "../profile-detail/TitleInput";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { ImageUploadSection } from "./ImageUploadSection";
import { MusicUploadSection } from "./MusicUploadSection";
import { LyricsInput } from "./LyricsInput";

export const FeedUploadContent = () => {
  return (
    <div className="flex flex-col gap-[7.5px]">
      <div>
        <TitleInput />
      </div>
      <div>
        <LyricsInput />
      </div>
      <div className="flex flex-row gap-[7.5px]">
        <MusicUploadSection />
        <ImageUploadSection />
      </div>

      <div>
        <MusicTagSelector />
      </div>
      <div className="flex justify-center mb-26">
        <Button className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer">
          업로드
        </Button>
      </div>
    </div>
  );
};
