import { useParams } from "react-router-dom";
import { getProjectDetail } from "@/apis/project";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Clock, Download, Eye, File, Heart, Share2 } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const { userId } = useUserStore();

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectDetail(Number(id)),
  });

  if (isLoading) return <div className="text-white">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-white">에러 발생: {(error as Error).message}</div>
    );
  if (!project)
    return <div className="text-white">프로젝트 정보가 없습니다.</div>;

  return (
    <div className="flex flex-col text-white pl-[15%] xl:pr-[10%] pt-[25.5px]">
      {/* project detail header */}
      <div className="flex flex-row justify-between mb-[18.5px] py-[6px] items-end border-b border-[#0050ef]">
        <div className="text-[27px] font-medium">{project.title}</div>
        <div className="text-[9px] font-medium">등록일 : 2024.10.02</div>
      </div>

      {/* project detail content */}
      <div className="flex flex-row gap-[15px]">
        <div className="flex flex-2 min-w-[400px] flex-col gap-[15px]">
          {/* project creator info */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-[18px]">
              <img alt="프로필" />
              <div className="flex flex-col">
                <span className="font-bold text-[18px]">
                  {project.creatorNickname}
                </span>
                <span className="text-xs">
                  장르_{project.genres.join(", ")}
                </span>
                <span className="text-xs">
                  분야_{project.fields.join(", ")}
                </span>
              </div>
            </div>
            {/* 팔로우 메시지 버튼 */}
            {userId !== project.creatorId && (
              <div className="flex flex-row gap-[7.5px]">
                <Button className="w-15 h-[22.5px] text-xs font-medium bg-[#0050ef] cursor-pointer rounded-[3.75px]">
                  팔로우
                </Button>
                <Button className="w-15 h-[22.5px] text-xs font-medium bg-[#555555] cursor-pointer rounded-[3.75px]">
                  메시지
                </Button>
              </div>
            )}
          </div>
          {/* project description */}
          <div className="py-[15px] px-[11.25px] text-xs">
            {project.description}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-[15px]">
          <div className="flex flex-col p-[11.25px] gap-[15px]">
            <div className="flex flex-col gap-[7.5px]">
              <div className="w-fit px-[7.5px] py-[2.25px] text-[13.5px] font-bold bg-[#0050ef] rounded-[9px]">
                팀원 모집
              </div>
              <div className="flex flex-col pb-[15px] border-b border-white">
                <span className="text-xs">
                  장르_{project.genres.join(", ")}
                </span>
                <span className="text-xs">
                  분야_{project.fields.join(", ")}
                </span>
              </div>
            </div>

            <div className="flex flex-row px-[24.5px] gap-15 text-[10.5px]">
              <span className="flex flex-col gap-[7.5px] items-center">
                <Clock size={18} />
                14일전
              </span>
              <span className="flex flex-col gap-[7.5px] items-center">
                <Eye size={18} />
                {project.views}
              </span>
              <span className="flex flex-col gap-[7.5px] items-center">
                <Heart
                  size={18}
                  fill={project.liked ? "red" : "none"} // 빨간색 채우기 여부
                  stroke={project.liked ? "none" : "currentColor"} // 테두리 제거 또는 유지
                  className={project.liked ? "" : "text-white"} // liked=false면 흰색 테두리
                />

                {project.likeCount}
              </span>
            </div>

            <div className="flex flex-row items-center gap-[15px]">
              <Button className="w-[93.75px] bg-[#222222] rounded-[3.75px] cursor-pointer">
                <Share2 />
                공유하기
              </Button>
              <Button className="w-[168.75px] bg-[#0050ef] rounded-[3.75px] cursor-pointer">
                {userId === project.creatorId ? "수정하기" : "문의하기"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-[11.25px]">
            <span className="flex flex-row justify-between px-[7.5px] py-[6px] text-xs text-white bg-[#222222] rounded-[3.75px] gap-[9px]">
              <span className="flex flex-row items-center gap-[9px]">
                <File size={18} />
                파일.png
              </span>
              <span className="flex flex-row items-center gap-[7.5px]">
                <span className="text-xs text-[#888888]">00MB</span>
                <Download size={18} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
