import { getAllProjects } from "@/apis/project";
import { useQuery } from "@tanstack/react-query";
import { ProjectContentItem } from "../serve-pages/ProjectContentItem";

export const MainProjectList = () => {
  const { data } = useQuery({
    queryKey: ["main-projects", 6],
    queryFn: () => getAllProjects(undefined, 6),
  });

  return (
    <div className="grid grid-cols-4 gap-[1%] gap-y-[30px] w-full">
      {data?.projects.map((project) => (
        <ProjectContentItem key={project.id} project={project} isUser={false} />
      ))}
    </div>
  );
};
