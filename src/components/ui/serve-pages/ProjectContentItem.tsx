import { Clock, Eye, Heart } from "lucide-react";
import { ProjectMoreMenu } from "../profile/ProjectMoreMenu";
import { UserProjectMoreMenu } from "../profile/UserProjectMoreMenu";
import type { Project, ProjectResponse } from "@/types/project";
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { toggleProjectLike } from "@/apis/project";
import { useNavigate } from "react-router-dom";
import { daysLeftFrom } from "@/utils/formatDate";

interface ProjectContentItemProps {
  project: Project;
  isUser?: boolean;
}

export const ProjectContentItem = ({
  project,
  isUser,
}: ProjectContentItemProps) => {
  const navigate = useNavigate();
  const { id, title, genres, fields, views, collaboration } = project;

  const queryClient = useQueryClient();

  const projectQueries = queryClient.getQueryCache().findAll({
    predicate: (query) => {
      const key = query.queryKey[0];
      return key === "projects" || key === "main-projects";
    },
  });

  let liveProject: Project | undefined;

  for (const q of projectQueries) {
    const data = q.state.data as
      | InfiniteData<ProjectResponse>
      | ProjectResponse
      | undefined;

    if (!data) continue;

    // ✅ Infinite Query인 경우
    if ("pages" in data) {
      const found = data.pages
        .flatMap((p) => p.projects)
        .find((p) => p.id === id);

      if (found) {
        liveProject = found;
        break;
      }
    }

    // ✅ 일반 Query (main-projects)
    if ("projects" in data) {
      const found = data.projects.find((p) => p.id === id);

      if (found) {
        liveProject = found;
        break;
      }
    }
  }

  // ✅ fallback
  const { liked, likeCount, createdAt } = liveProject ?? project;

  // ✅ ✅ 낙관적 업데이트 (완전체)
  const { mutate } = useMutation({
    mutationFn: () => toggleProjectLike(id),

    onMutate: async () => {
      // ✅ 관련 쿼리 전부 중단
      for (const q of projectQueries) {
        await queryClient.cancelQueries({ queryKey: q.queryKey });
      }
      await queryClient.cancelQueries({ queryKey: ["myProjects"] });

      // ✅ 이전 값 스냅샷 저장 (Infinite + 일반 혼합)
      const previousProjectsList = projectQueries.map((q) => ({
        key: q.queryKey,
        data: q.state.data as
          | InfiniteData<ProjectResponse>
          | ProjectResponse
          | undefined,
      }));

      const previousMyProjects = queryClient.getQueryData<Project[]>([
        "myProjects",
      ]);

      const previousMain = queryClient.getQueryData<ProjectResponse>([
        "main-projects",
        6,
      ]);

      // ✅ ✅ 1️⃣ main-projects (일반 Query) 낙관적 업데이트
      if (previousMain) {
        queryClient.setQueryData<ProjectResponse>(["main-projects", 6], {
          ...previousMain,
          projects: previousMain.projects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  liked: !p.liked,
                  likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
                }
              : p
          ),
        });
      }

      // ✅ ✅ 2️⃣ projects (Infinite Query 전부)
      for (const { key, data } of previousProjectsList) {
        if (!data || !("pages" in data)) continue;

        queryClient.setQueryData<InfiniteData<ProjectResponse>>(key, {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            projects: page.projects.map((p) =>
              p.id === id
                ? {
                    ...p,
                    liked: !p.liked,
                    likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
                  }
                : p
            ),
          })),
        });
      }

      // ✅ ✅ 3️⃣ myProjects 낙관적 업데이트
      if (previousMyProjects) {
        queryClient.setQueryData<Project[]>(
          ["myProjects"],
          previousMyProjects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  liked: !p.liked,
                  likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
                }
              : p
          )
        );
      }

      // ✅ ✅ 롤백 데이터 반환
      return {
        previousProjectsList,
        previousMyProjects,
        previousMain,
      };
    },

    // ✅ ✅ 에러 발생 시 전부 롤백
    onError: (_err, _vars, context) => {
      if (context?.previousProjectsList) {
        for (const { key, data } of context.previousProjectsList) {
          queryClient.setQueryData(key, data);
        }
      }

      if (context?.previousMyProjects) {
        queryClient.setQueryData(["myProjects"], context.previousMyProjects);
      }

      if (context?.previousMain) {
        queryClient.setQueryData(["main-projects", 6], context.previousMain);
      }
    },

    // ✅ ✅ 서버 동기화
    onSettled: () => {
      for (const q of projectQueries) {
        queryClient.invalidateQueries({ queryKey: q.queryKey });
      }
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
    },
  });

  const handleCardClick = () => navigate(`/project-detail/${id}`);
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const leftDays = daysLeftFrom(createdAt, 14);

  return (
    <div
      onClick={handleCardClick}
      className="w-full aspect-[5/3] flex flex-col bg-[#111111] rounded-[22.5px] py-[13.5px] px-[16.5px] cursor-pointer"
    >
      <div className="flex flex-col justify-between h-full">
        {/* 🔹 상단 */}
        <div>
          <div className="flex flex-row justify-between">
            <div className="h-[17px] text-[13.5px] mt-[3px] font-bold text-white">
              {collaboration}
            </div>

            <div onClick={stop} onMouseDown={stop}>
              {isUser ? (
                <UserProjectMoreMenu />
              ) : (
                <ProjectMoreMenu projectId={id} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[7px] mt-[7px]">
            <div className="h-[17px] text-[13.5px] font-bold text-[#7CA8FF]">
              {title}
            </div>
            <div className="h-[14px] text-[11.25px] font-medium text-white">
              분야_{fields.join(", ")}
            </div>
          </div>
        </div>

        {/* 🔹 하단 */}
        <div>
          <div className="h-[13px] text-[10.5px] text-white mb-[8px]">
            장르_{genres.join(", ")}
          </div>

          <div className="flex flex-row justify-between text-[#999999] text-[10.5px]">
            <div className="flex flex-row gap-[7.5px]">
              <span className="flex flex-row gap-[1.5px] items-center">
                <Heart
                  size={13.5}
                  className={liked ? "text-[#ff2b2b]" : "text-[#777777]"}
                  fill={liked ? "#ff2b2b" : "none"}
                  onClick={(e) => {
                    e.stopPropagation();
                    mutate();
                  }}
                />
                {likeCount}
              </span>

              <span className="flex flex-row gap-[1.5px] items-center">
                <Eye size={13.5} />
                {views}
              </span>
            </div>

            <span className="flex flex-row gap-[3.75px] items-center">
              <Clock size={13.5} />
              {`${leftDays}일 전`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
