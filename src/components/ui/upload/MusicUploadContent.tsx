import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { TitleInput } from "../profile-detail/TitleInput";
import { LyricsInput } from "./LyricsInput";
import { CommentInput } from "./CommentInput";
import { MusicUploadSection } from "./MusicUploadSection";
import { ImageUploadSection } from "./ImageUploadSection";
import { AssignMemberSection } from "./AssignMemberSection";

export const MusicUploadContent = () => {
  return (
    <div className="flex flex-col gap-[7.5px]">
      <div>
        <TitleInput />
      </div>
      <div className="flex flex-row">
        <GenreSelector />
      </div>
      <div>
        <LyricsInput />
      </div>
      <div>
        <CommentInput />
      </div>
      <div className="flex flex-row gap-[7.5px]">
        <MusicUploadSection />
        <ImageUploadSection />
      </div>
      <div>
        <AssignMemberSection />
      </div>
      <div>
        <MusicTagSelector />
      </div>
      <div className="flex justify-center mb-[70px]">
        <Button className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer">
          업로드
        </Button>
      </div>
    </div>
  );
};
