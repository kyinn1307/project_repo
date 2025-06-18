import { GenreSelector } from "@/components/ui/profile-detail/GenreSelector";
import { Button } from "@/components/ui/button";
import { MusicUploadSection } from "@/components/ui/upload/MusicUploadSection";
import { ProjectDetailInput } from "@/components/ui/upload/ProjectDetailInput";
import { FieldSelector } from "@/components/ui/upload/FieldSelector";
import { CollaborationTypeSelector } from "@/components/ui/upload/CollaborationTypeSelector";

export const ProjectEditPage = () => {
  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5.5px]">
      <div className="flex flex-col gap-[7.5px]">
        <div>
          <div className="w-full h-[22.5px] flex items-center bg-[#111111] rounded-[3.75px] px-[7.5px] py-[4.75px]">
            <input
              className="w-full text-[10.5px] text-white placeholder-[#777777] focus:outline-none focus:ring-0 
             focus:border-none caret-white custom-scrollbar"
              placeholder="제목을 입력해주세요"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <CollaborationTypeSelector />
        </div>
        <div className="flex flex-row">
          <GenreSelector />
        </div>
        <div className="flex flex-row">
          <FieldSelector />
        </div>
        <div className="flex flex-row">
          <ProjectDetailInput />
        </div>
        <div className="flex flex-row gap-[7.5px]">
          <MusicUploadSection />
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
