import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProjectContentItem } from "@/components/ui/serve-pages/ProjectContentItem";
import { Project, ProjectResponse } from "@/types/project";
import { getProjectSearch } from "@/apis/project";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "@/stores/useUserStore";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { useSearchParams } from "react-router-dom";

export const ProjectPage = () => {
  const { userId } = useUserStore();
  const size = 8;

  const [searchParams] = useSearchParams();

  // ✅ 실제 검색 기준은 URL만 사용
  const keywordFromUrl = searchParams.get("keyword") ?? "";

  // ✅ SearchBar에 표시될 입력 중 텍스트
  const [q, setQ] = useState(keywordFromUrl);

  // ✅ URL이 바뀌면 input도 동기화
  useEffect(() => {
    setQ(keywordFromUrl);
  }, [keywordFromUrl]);

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
    [string, string],
    number | undefined
  >({
    // ✅ keyword가 바뀔 때만 전체 페이지네이션 초기화
    queryKey: ["projects", keywordFromUrl],

    queryFn: ({ pageParam }) =>
      getProjectSearch({
        k: keywordFromUrl,
        cursorId: pageParam,
        size,
      }),

    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allProjects: Project[] =
    data?.pages.flatMap((page) => page.projects) ?? [];

  const { ref, inView } = useInView();

  // ✅ 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col pt-[38px] px-[5.2%] min-w-[1080px]">
      <section className="flex flex-col mb-[37.5px]">
        <div className="text-2xl text-white font-bold">프로젝트</div>

        <div className="relative flex flex-row mt-[22.5px] mb-[22.5px]">
          <div className="w-[50%]">
            <SearchBar
              placeholder="프로젝트 찾기"
              value="project"
              inputValue={q}
              onInputChange={setQ}
            />
          </div>
        </div>

        {isLoading && <div className="text-white">로딩 중...</div>}
        {isError && <div className="text-red-500">프로젝트 불러오기 실패</div>}

        {allProjects.length > 0 && (
          <div className="flex flex-wrap gap-x-[22.5px] gap-y-[18.75px] min-w-[1080px] max-w-[1490px]">
            <div className="grid grid-cols-4 gap-x-[22.5px] gap-y-[18.75px] w-full">
              {allProjects.map((project) => (
                <ProjectContentItem
                  key={project.id}
                  project={project}
                  isUser={userId !== project.creatorId}
                />
              ))}
            </div>
          </div>
        )}

        {/* ✅ 무한스크롤 관찰 대상 */}
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
