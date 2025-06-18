import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { MusicTagSelector } from "@/components/ui/profile-detail/MusicTagSelector";
import { Button } from "@/components/ui/button";
import { TitleInput } from "@/components/ui/profile-detail/TitleInput";
import { LyricsInput } from "@/components/ui/upload/LyricsInput";
import { CommentInput } from "@/components/ui/upload/CommentInput";
import { MusicUploadSection } from "@/components/ui/upload/MusicUploadSection";
import { ImageUploadSection } from "@/components/ui/upload/ImageUploadSection";
import { AssignMemberSection } from "@/components/ui/upload/AssignMemberSection";

export const MusicEditPage = () => {
  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5.5px]">
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
    </div>
  );
};
