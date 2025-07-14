import { Clock, Eye, Heart } from "lucide-react";
import { ProjectMoreMenu } from "../profile/ProjectMoreMenu";
import type { Project } from "@/types/project";

interface ProjectContentItemProps {
  project: Project;
}

export const ProjectContentItem = ({ project }: ProjectContentItemProps) => {
  const { id, title } = project;

  return (
    <div className="w-[262.5px] h-[157.5px] flex flex-col bg-[#111111] rounded-[22.5px] pt-[13.5px] px-[16.5px]">
      <div className="flex flex-row justify-between">
        <div className="h-[17px] text-[13.5px] mt-[3px] font-bold text-white">
          {"팀원모집"}
        </div>
        <ProjectMoreMenu projectId={id} />
      </div>
      <div className="flex flex-col gap-[7px] mt-[7px]">
        <div className="h-[17px] text-[13.5px] font-bold text-[#7CA8FF]">
          {title}
        </div>
        <div className="h-[14px] text-[11.25px] font-medium text-white">
          프로듀서 | 비트메이커 | 보컬
        </div>
      </div>
      <div className="h-[13px] mt-[30.25px] text-[10.5px] text-white mb-[8px]">
        랩,힙합,R&B
      </div>
      <div className="flex flex-row justify-between text-[#999999] text-[10.5px]">
        <div className="flex flex-row gap-[7.5px]">
          <span className="flex flex-row gap-[1.5px] items-center">
            <Heart size={13.5} />
            1000
          </span>
          <span className="flex flex-row gap-[1.5px] items-center">
            <Eye size={13.5} />
            1000
          </span>
        </div>
        <span className="flex flex-row gap-[3.75px] items-center">
          <Clock size={13.5} />
          14일 전
        </span>
      </div>
    </div>
  );
};
