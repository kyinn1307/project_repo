import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { ProjectContentItem } from "@/components/ui/serve-pages/ProjectContentItem";
import { Project, ProjectResponse } from "@/types/project";
import { getAllProjects } from "@/apis/project";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "@/stores/useUserStore";

export const ProjectPage = () => {
  const { userId } = useUserStore();
  const size = 5;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    ProjectResponse,
    Error,
    InfiniteData<ProjectResponse>,
    [string],
    number | undefined
  >({
    queryKey: ["projects"],
    queryFn: ({ pageParam }) => getAllProjects(pageParam, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: ProjectResponse) => lastPage.nextCursor,
  });

  const allProjects: Project[] =
    data?.pages.flatMap((page) => page.projects) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        {allProjects && (
          <div className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px]">
            {allProjects.map((project) => (
              <ProjectContentItem
                key={project.id}
                project={project}
                isUser={userId === project.creatorId}
              />
            ))}
          </div>
        )}

        {/* 👇 관찰 대상 */}
        <div ref={ref} className="h-12 mt-6 text-center text-white">
          {isFetchingNextPage
            ? "다음 프로젝트 불러오는 중..."
            : hasNextPage
            ? "더 불러오는 중..."
            : ""}
        </div>
      </section>
    </div>
  );
};
