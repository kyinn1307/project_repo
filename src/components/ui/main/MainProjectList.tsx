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
        setProjects(res.projects);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full">
      <ProjectList list={projects} />
    </div>
  );
};
