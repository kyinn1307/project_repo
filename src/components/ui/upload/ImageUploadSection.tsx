import { useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";
import type { RemoteFile } from "@/types/feed";

interface ImageUploadSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviewFiles?: RemoteFile[];
  onRemoveServerPreview?: () => void;
  isRequired?: boolean;
}

export const ImageUploadSection = ({
  files,
  setFiles,
  imagePreviewFiles = [],
  onRemoveServerPreview,
  isRequired,
}: ImageUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) setFiles([selected[0]]);
    e.target.value = "";
  };

  const hasLocal = files.length > 0;
  const hasServer = imagePreviewFiles.length > 0;
  const hasAny = hasLocal || hasServer;

  console.log(files);
  return (
    <div className="relative flex flex-col flex-1 h-30 bg-[#111111] p-[7.5px] pb-[30px] rounded-[3.75px]">
      <div className="flex flex-row justify-between  mb-[7.5px]">
        <div className="text-white font-medium text-[10.5px]">이미지</div>
        {isRequired && (
          <div className="text-[#0050ef] text-[9px]">필수항목</div>
        )}
      </div>

      {/* 로컬 우선, 없으면 서버 프리뷰, 둘 다 없으면 빈 상태 */}
      {hasLocal ? (
        <FileItem filename={files[0].name} onRemove={() => setFiles([])} />
      ) : hasServer ? (
        <FileItem
          filename={imagePreviewFiles[0].originalFileName ?? "이미지"}
          onRemove={onRemoveServerPreview}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-[6px]">
          <FileUploadIcon />
          <Button
            className="w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
            onClick={handleUpload}
          >
            컴퓨터에서 선택
          </Button>
          <p className="text-[9px] text-[#777777]">
            지원 파일은 JPG, PNG, WEBP
          </p>
        </div>
      )}

      {/* 파일 있거나 서버 프리뷰 있을 때: 하단 중앙 고정 버튼 */}
      {hasAny && (
        <Button
          className="absolute bottom-[7.5px] left-1/2 -translate-x-1/2 w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
          onClick={handleUpload}
        >
          컴퓨터에서 선택
        </Button>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
