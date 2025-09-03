import { useRef } from "react";
import clsx from "clsx";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";
import { RemoteFile } from "@/types/feed";

interface ProjectUploadSectionProps {
  files: File[];
  setFiles: (files: File[]) => void;
  audioPreviewFiles?: RemoteFile[]; // 서버에 이미 있는 파일 목록
  onRemoveServerPreview?: (index: number) => void; // ✅ 개별 삭제로 변경
  maxCount?: number; // 기본 5
}

export const ProjectUploadSection = ({
  files,
  setFiles,
  audioPreviewFiles = [],
  onRemoveServerPreview,
  maxCount = 5,
}: ProjectUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalCount = (audioPreviewFiles?.length ?? 0) + files.length; // ✅ 합계
  const remain = Math.max(0, maxCount - totalCount);

  const handleUpload = () => {
    if (remain <= 0) return; // 꽉 차면 막기
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (!selected.length) return;

    if (remain <= 0) {
      alert(`최대 ${maxCount}개의 파일 첨부가 가능합니다.`);
      return;
    }

    const onlyAudio = selected.filter((f) => f.type.startsWith("audio/"));
    const next = [...files, ...onlyAudio.slice(0, remain)];
    setFiles(next);

    if (onlyAudio.length > remain) {
      alert(
        `최대 ${maxCount}개까지 업로드 가능해요. ${remain}개만 추가되었습니다.`
      );
    }
  };

  const handleRemoveLocal = (index: number) => {
    const next = [...files];
    next.splice(index, 1);
    setFiles(next);
  };

  const combinedList = [
    ...(audioPreviewFiles ?? [])
      .filter((f): f is RemoteFile => !!f && !!f.originalFileName)
      .map((f, idx) => ({
        id: `server-${f.fileId}`,
        filename: f.originalFileName || "서버 파일",
        isServer: true as const,
        index: idx,
      })),
    ...(files ?? [])
      .filter((f): f is File => !!f && !!f.name)
      .map((f, idx) => ({
        id: `local-${idx}`,
        filename: f.name || "로컬 파일",
        isServer: false as const,
        index: idx,
      })),
  ];

  // console.log(combinedList);
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-[6px]">
      <FileUploadIcon />
      <Button
        className="w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
        onClick={handleUpload}
        disabled={remain <= 0}
      >
        컴퓨터에서 선택
      </Button>
      <p className="text-[9px] text-[#777777]">
        지원 파일은 MP3, WAV, AAC, FLAC, JPG, PNG, SVG
      </p>
      <p className="text-[9px] text-[#777777]">
        첨부된 파일은 사용자들에게 공유됩니다.
      </p>
    </div>
  );

  return (
    <div
      className={clsx(
        "relative flex flex-col flex-1 bg-[#111111] p-[7.5px] rounded-[3.75px]",
        totalCount > 0 ? "min-h-[160px]" : "min-h-[132px]"
      )}
    >
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        첨부파일
      </div>
      {/* 미리보기 영역: 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto pr-[2px]">
        {totalCount > 0 ? (
          <div>
            <div className="flex flex-col overflow-y-auto max-h-[88px] gap-1">
              {combinedList.map((item) => (
                <FileItem
                  key={item.id}
                  filename={item.filename}
                  onRemove={() => {
                    if (item.isServer) {
                      onRemoveServerPreview?.(item.index);
                    } else {
                      handleRemoveLocal(item.index);
                    }
                  }}
                />
              ))}
            </div>
            <Button
              className="absolute bottom-[7.5px] left-1/2 -translate-x-1/2 w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
              onClick={handleUpload}
            >
              컴퓨터에서 선택
            </Button>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
      <input
        type="file"
        accept="audio/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
