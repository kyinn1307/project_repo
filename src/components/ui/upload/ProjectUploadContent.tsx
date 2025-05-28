import { Button } from "@/components/ui/button";
import { TitleInput } from "../profile-detail/TitleInput";
import { CollaborationTypeSelector } from "./CollaborationTypeSelector";
import { GenreSelector } from "../profile-detail/GenreSelector";
import { FieldSelector } from "./FieldSelector";
import { ProjectDetailInput } from "./ProjectDetailInput";
import { ProjectUploadSection } from "./ProjectUploadSection";

export const ProjectUploadContent = () => {
  return (
    <div className="flex flex-col gap-[7.5px]">
      <div>
        <TitleInput />
      </div>
      <div>
        <CollaborationTypeSelector />
      </div>
      <div>
        <GenreSelector />
      </div>
      <div>
        <FieldSelector />
      </div>
      <div>
        <ProjectDetailInput />
      </div>
      <div>
        <ProjectUploadSection />
      </div>

      <div className="flex justify-center mb-[70px]">
        <Button className="w-15 h-[22.5px] bg-[#0050ef] text-xs font-medium cursor-pointer">
          업로드
        </Button>
      </div>
    </div>
  );
};
