import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetail } from "@/apis/project";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Download,
  Eye,
  Heart,
  Music,
  Share2,
  Image,
} from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { RemoteFile } from "@/types/feed";
import { daysLeftFrom, formatYMDdot } from "@/utils/formatDate";
import sample from "@/assets/Images/sample-musician.png";

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const { userId } = useUserStore();
  const navigate = useNavigate();
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

  const handleDownload = async (file: RemoteFile) => {
    if (!file || !file.url) {
      alert("다운로드할 파일이 없습니다.");
      return;
    }

    // 파일명 결정
    const inferNameFromUrl = (u: string) => {
      try {
        const pathname = new URL(u, window.location.href).pathname;
        const last = pathname.split("/").pop() || "file";
        return last.split("?")[0];
      } catch {
        return "file";
      }
    };
    const filename =
      file.originalFileName ||
      (typeof file.url === "string" ? inferNameFromUrl(file.url) : "file");

    try {
      let objectUrl: string | null = null;
      let createdHere = false;
      const urlVal = file.url;

      if (typeof urlVal === "string") {
        if (urlVal.startsWith("blob:") || urlVal.startsWith("data:")) {
          objectUrl = urlVal;
        } else {
          const res = await fetch(urlVal, { credentials: "omit" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();
          objectUrl = URL.createObjectURL(blob);
          createdHere = true;
        }
      } else if (urlVal) {
        objectUrl = URL.createObjectURL(urlVal);
        createdHere = true;
      } else {
        throw new Error("지원하지 않는 url 타입입니다.");
      }

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (createdHere) URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Blob 저장 실패 → 링크 열기로 폴백:", err);
      if (typeof file.url === "string") {
        window.open(file.url, "_blank", "noopener,noreferrer");
      } else {
        alert("파일을 다운로드할 수 없습니다.");
      }
    }
  };

  const formatFileSizeMB = (bytes: number) => {
    if (!bytes || isNaN(bytes)) return "0 MB";
    return (bytes / (1024 * 1024)).toFixed(2); // MB 단위, 소수점 2자리
  };

  const leftDays = daysLeftFrom(project.createdAt, 14);

  return (
    <div className="flex flex-col text-white pl-[15%] xl:pr-[10%] pt-[25.5px] pr-[3%]">
      {/* project detail header */}
      <div className="flex flex-row justify-between mb-[18.5px] py-[6px] items-end border-b border-[#0050ef]">
        <div className="text-[27px] font-medium">{project.title}</div>
        <div className="text-[9px] font-medium">
          등록일 : {formatYMDdot(project.createdAt)}
        </div>
      </div>

      {/* project detail content */}
      <div className="flex flex-row gap-[15px]">
        <div className="flex flex-2 min-w-[400px] flex-col gap-[15px]">
          {/* project creator info */}
          <div className="flex flex-row p-[11.25px] justify-between items-center rounded-[15px] bg-[#111111]">
            <div className="flex flex-row gap-[18px]">
              <img
                src={project.creatorProfileImageUrl || sample}
                alt="프로필"
                className="w-[52.5px] h-[52.5px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-[2.5px]">
                <span className="h-[23px] flex items-center font-bold text-[18px]">
                  {project.creatorNickname}
                </span>
                <div>
                  <span className="h-[15px] flex items-center text-xs">
                    장르_{project.genres.join(", ")}
                  </span>
                  <span className="h-[15px] flex items-center text-xs">
                    분야_{project.fields.join(", ")}
                  </span>
                </div>
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
          <div className="py-[15px] px-[11.25px] text-xs rounded-[15px] bg-[#111111]">
            {project.description}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-[15px]">
          <div className="flex flex-col p-[11.25px] gap-[15px] rounded-[15px] bg-[#111111]">
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
              <span className="flex flex-col gap-[7.5px] items-center whitespace-nowrap">
                <Clock size={18} />
                {`${leftDays}일 전`}
              </span>
              <span className="flex flex-col gap-[7.5px] items-center whitespace-nowrap">
                <Eye size={18} />
                {project.views}
              </span>
              <span className="flex flex-col gap-[7.5px] items-center whitespace-nowrap">
                <Heart
                  size={18}
                  fill={project.liked ? "red" : "none"}
                  stroke={project.liked ? "none" : "currentColor"}
                  className={project.liked ? "" : "text-white"}
                />

                {project.likeCount}
              </span>
            </div>

            <div className="flex flex-row items-center gap-[15px]">
              <Button className="flex-1 bg-[#222222] rounded-[3.75px] cursor-pointer">
                <Share2 />
                공유하기
              </Button>
              <Button
                className="flex-2 bg-[#0050ef] rounded-[3.75px] cursor-pointer"
                onClick={() => {
                  if (userId === project.creatorId) {
                    navigate(`/upload/project-edit/${project.id}`);
                  } else {
                    navigate(`/chat/?userId=${project.creatorId}`);
                  }
                }}
              >
                {userId === project.creatorId ? "수정하기" : "문의하기"}
              </Button>
            </div>
          </div>

          {(project.audioFiles?.length > 0 ||
            project.imageFiles?.length > 0) && (
            <div className="flex flex-col p-[11.25px] rounded-[15px] bg-[#111111] gap-[9px]">
              {project.audioFiles?.map((f: RemoteFile) => (
                <span
                  key={f.fileId}
                  className="flex flex-row justify-between px-[7.5px] py-[6px] text-xs text-white bg-[#222222] rounded-[3.75px] gap-[9px]"
                >
                  <span className="flex flex-row items-center gap-[9px] whitespace-nowrap">
                    <Music size={18} />
                    <div className="truncate max-w-51 overflow-hidden">
                      {f.originalFileName}
                    </div>
                  </span>
                  <span
                    className="flex flex-row items-center gap-[7.5px]"
                    onClick={() => handleDownload(f)}
                  >
                    <span className="text-xs text-[#888888] whitespace-nowrap">
                      {formatFileSizeMB(f.fileSize)} MB
                    </span>
                    <Download size={18} />
                  </span>
                </span>
              ))}

              {project.imageFiles?.map((f: RemoteFile) => (
                <span
                  key={f.fileId}
                  className="flex flex-row justify-between px-[7.5px] py-[6px] text-xs text-white bg-[#222222] rounded-[3.75px] gap-[9px]"
                >
                  <span className="flex flex-row items-center gap-[9px] whitespace-nowrap">
                    <Image size={18} />
                    <div className="truncate max-w-51 overflow-hidden">
                      {f.originalFileName}
                    </div>
                  </span>
                  <span
                    className="flex flex-row items-center gap-[7.5px]"
                    onClick={() => handleDownload(f)}
                  >
                    <span className="text-xs text-[#888888] whitespace-nowrap">
                      {formatFileSizeMB(f.fileSize)} MB
                    </span>
                    <Download size={18} />
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
