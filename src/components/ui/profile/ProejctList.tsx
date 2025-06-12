import { ProjectContentItem } from "../serve-pages/ProjectContentItem";

export const ProjectList = () => {
  return (
    <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
      <ProjectContentItem />
      <ProjectContentItem />
      <ProjectContentItem />
    </div>
  );
};
