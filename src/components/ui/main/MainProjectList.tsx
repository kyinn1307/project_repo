import { ProjectList } from "../profile/ProejctList";
import { getAllProjects } from "@/apis/project";
import { useQuery } from "@tanstack/react-query";

export const MainProjectList = () => {
  const { data } = useQuery({
    queryKey: ["projects", 6],
    queryFn: () => getAllProjects(undefined, 6),
  });

  return (
    <div className="w-full">
      {data && <ProjectList list={data?.projects} />}
    </div>
  );
};
