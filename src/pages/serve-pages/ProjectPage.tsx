import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { ProjectContentItem } from "@/components/ui/serve-pages/ProjectContentItem";
import { Project } from "@/types/project";
import { getAllProjects } from "@/apis/project";

export const ProjectPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const projects = data?.projects ?? [];

  const hasProjects = projects && projects.length > 0;

  return (
    <div className="flex flex-col pt-[38px] px-[15%]">
      <div className="w-[832px] h-[75px] flex justify-center items-center bg-white text-black font-bold text-[24px] rounded-[7.5px]">
        프로젝트 찾고 업로드 하기
      </div>

      <div className="relative flex flex-row mt-[75px]">
        <span className="absolute left-[15px] top-[5.25px]">
          <SearchIcon />
        </span>
        <input
          className="w-127 h-[22.5px] bg-[#222222] placeholder-[#777777] text-xs text-white pl-[34.5px] rounded outline-none ring-0 focus:ring-0 focus:outline-none"
          placeholder="프로젝트찾기"
        />
      </div>
      <section className="flex flex-col mt-[37.5px] mb-[37.5px]">
        <div className="text-2xl text-white font-bold mb-[15px]">프로젝트</div>
        {isLoading && <div className="text-white">로딩 중...</div>}
        {isError && <div className="text-red-500">프로젝트 불러오기 실패</div>}
        {hasProjects && (
          <div className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px]">
            {projects?.map((project: Project) => (
              <ProjectContentItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
