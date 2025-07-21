import { Clock, Eye, Heart } from "lucide-react";
import { ProjectMoreMenu } from "../profile/ProjectMoreMenu";
import { UserProjectMoreMenu } from "../profile/UserProjectMoreMenu";
import type { Project } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectLike } from "@/apis/project";
interface ProjectContentItemProps {
  project: Project;
  isUser?: boolean;
}

export const ProjectContentItem = ({
  project,
  isUser,
}: ProjectContentItemProps) => {
  const { id, title, genres, fields, liked, likeCount } = project;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => toggleProjectLike(id),
    onSuccess: () => {
      console.log("좋아요 성공");
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
    },
    onError: (err) => {
      console.error("좋아요 실패", err);
      alert("좋아요 처리에 실패했습니다.");
    },
  });

  return (
    <div className="w-[262.5px] h-[157.5px] flex flex-col bg-[#111111] rounded-[22.5px] pt-[13.5px] px-[16.5px]">
      <div className="flex flex-row justify-between">
        <div className="h-[17px] text-[13.5px] mt-[3px] font-bold text-white">
          {"팀원모집"}
        </div>
        {isUser ? (
          // <UserProjectMoreMenu projectId={id} />
          <UserProjectMoreMenu />
        ) : (
          <ProjectMoreMenu projectId={id} />
        )}
      </div>
      <div className="flex flex-col gap-[7px] mt-[7px]">
        <div className="h-[17px] text-[13.5px] font-bold text-[#7CA8FF]">
          {title}
        </div>
        <div className="h-[14px] text-[11.25px] font-medium text-white">
          {fields.join(" | ")}
        </div>
      </div>
      <div className="h-[13px] mt-[30.25px] text-[10.5px] text-white mb-[8px]">
        {genres.join(", ")}
      </div>
      <div className="flex flex-row justify-between text-[#999999] text-[10.5px]">
        <div className="flex flex-row gap-[7.5px]">
          <span
            className="flex flex-row gap-[1.5px] items-center"
            onClick={() => mutate()}
          >
            <Heart
              size={13.5}
              className={liked ? "text-[#ff2b2b]" : "text-[#777777]"}
              fill={liked ? "#ff2b2b" : "none"}
            />
            {likeCount}
          </span>
          <span className="flex flex-row gap-[1.5px] items-center">
            <Eye size={13.5} />
            1000
          </span>
        </div>
        <span className="flex flex-row gap-[3.75px] items-center">
          <Clock size={13.5} />
          14일 전
        </span>
      </div>
    </div>
  );
};
