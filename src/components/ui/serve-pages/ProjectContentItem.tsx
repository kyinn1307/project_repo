import { Clock, Eye, Heart } from "lucide-react";
import { ProjectMoreMenu } from "../profile/ProjectMoreMenu";
import { UserProjectMoreMenu } from "../profile/UserProjectMoreMenu";
import type { Project } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { id, title, genres, fields, liked, likeCount, views, collaboration } =
    project;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => toggleProjectLike(id),
    onSuccess: () => {
      console.log("좋아요 성공");
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      console.error("좋아요 실패", err);
      alert("좋아요 처리에 실패했습니다.");
    },
  });

  const handleCardClick = () => {
    navigate(`/project-detail/${id}`);
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const leftDays = daysLeftFrom(project.createdAt, 14);

  return (
    <div
      onClick={handleCardClick}
      className="w-[262.5px] h-[157.5px] flex flex-col bg-[#111111] rounded-[22.5px] pt-[13.5px] px-[16.5px] cursor-pointer"
    >
      <div className="flex flex-row justify-between">
        <div className="h-[17px] text-[13.5px] mt-[3px] font-bold text-white">
          {collaboration}
        </div>
        <div onClick={stop} onMouseDown={stop}>
          {isUser ? (
            // <UserProjectMoreMenu projectId={id} />
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
      <div className="h-[13px] mt-[30.25px] text-[10.5px] text-white mb-[8px]">
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
  );
};
