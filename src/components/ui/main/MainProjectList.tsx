// MainProjectList.tsx
import { useEffect, useState } from "react";
import { ProjectList } from "../profile/ProejctList";
import { getAllProjects } from "@/apis/project";
import type { Project } from "@/types/project";

export const MainProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects(undefined, 6);
        console.log(res);
        setProjects(res.projects);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-[15px] gap-y-[10px]">
      <ProjectList list={projects} />
    </div>
  );
};
