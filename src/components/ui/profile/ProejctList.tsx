import { ProjectContentItem } from "../serve-pages/ProjectContentItem";
import type { Project } from "@/types/project";

interface ProjectListProps {
  list: Project[];
  isUser?: boolean;
}

export const ProjectList = ({ list, isUser }: ProjectListProps) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
      {list.map((project) => (
        <ProjectContentItem
          key={project.id}
          project={project}
          isUser={isUser}
        />
      ))}
    </div>
  );
};
