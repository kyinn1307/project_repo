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

  // ✅ ✅ 핵심 1: 현재 활성화된 projects 쿼리 전부 가져오기 (검색 포함)
  const projectQueries = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["projects"] });

  // ✅ ✅ 핵심 2: 화면에 쓰이는 실시간 프로젝트 찾기
  let liveProject: Project | undefined;

  for (const q of projectQueries) {
    const data = q.state.data as InfiniteData<ProjectResponse> | undefined;
    const found = data?.pages
      .flatMap((p) => p.projects)
      .find((p) => p.id === id);

    if (found) {
      liveProject = found;
      break;
    }
  }

  // ✅ fallback
  const { liked, likeCount, createdAt } = liveProject ?? project;

  // ✅ ✅ 낙관적 업데이트
  const { mutate } = useMutation({
    mutationFn: () => toggleProjectLike(id),

    onMutate: async () => {
      // ✅ 모든 projects 쿼리 중단
      for (const q of projectQueries) {
        await queryClient.cancelQueries({ queryKey: q.queryKey });
      }

      await queryClient.cancelQueries({ queryKey: ["myProjects"] });

      const previousProjectsList = projectQueries.map((q) => ({
        key: q.queryKey,
        data: q.state.data as InfiniteData<ProjectResponse>,
      }));

      const previousMyProjects = queryClient.getQueryData<Project[]>([
        "myProjects",
      ]);

      // ✅ ✅ projects (검색 포함 전부 반영)
      for (const { key, data } of previousProjectsList) {
        if (!data) continue;

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

      // ✅ ✅ myProjects 반영
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

      return { previousProjectsList, previousMyProjects };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousProjectsList) {
        for (const { key, data } of context.previousProjectsList) {
          queryClient.setQueryData(key, data);
        }
      }

      if (context?.previousMyProjects) {
        queryClient.setQueryData(["myProjects"], context.previousMyProjects);
      }

      alert("좋아요 처리에 실패했습니다.");
    },

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
