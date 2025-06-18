import { TitleInput } from "./TitleInput";
import { Button } from "../button";
import { MusicUploadSection } from "../upload/MusicUploadSection";
import { ImageUploadSection } from "../upload/ImageUploadSection";

export const FeedDetailContent = () => {
  return (
    <div className="flex flex-col gap-[7.5px]">
      <div>
        <TitleInput />
      </div>

      <div className="flex flex-row h-[150px] gap-[7.5px]">
        <ImageUploadSection />
        <MusicUploadSection />
      </div>

      <div className="flex justify-center mt-[8.75px] mb-[70px]">
        <Button className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer">
          업로드
        </Button>
      </div>
    </div>
  );
};
