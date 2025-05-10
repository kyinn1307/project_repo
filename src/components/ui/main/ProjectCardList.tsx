import { ProjectCardItem } from "./ProjectCardItem";

export const ProjectCardList = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
      <ProjectCardItem />
      <ProjectCardItem />
      <ProjectCardItem />
    </div>
  );
};
