import { useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";
import type { RemoteFile } from "@/types/feed";

interface MusicUploadSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  audioPreviewFiles?: RemoteFile[];
  serverRemoved?: boolean;
  onRemoveServerPreview?: () => void;
  isRequired?: boolean;
}

export const MusicUploadSection = ({
  files,
  setFiles,
  audioPreviewFiles = [],
  onRemoveServerPreview,
  isRequired,
}: MusicUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) setFiles([selected[0]]);
    e.target.value = "";
  };

  const hasLocal = files.length > 0;
  const hasServer = audioPreviewFiles.length > 0;
  const hasAny = hasLocal || hasServer;

  return (
    <div className="relative flex flex-col flex-1 h-30 bg-[#111111] p-[7.5px] pb-[30px] rounded-[3.75px]">
      <div className="flex flex-row justify-between mb-[7.5px]">
        <div className="text-white font-medium text-[10.5px]">음원</div>
        {isRequired && (
          <div className="text-[#0050ef] text-[9px]">필수항목</div>
        )}
      </div>

      {hasLocal
        ? files.map((f, i) => (
            <FileItem key={i} filename={f.name} onRemove={() => setFiles([])} />
          ))
        : audioPreviewFiles.map((f, i) => (
            <FileItem
              key={i}
              filename={f.originalFileName ?? "음원"}
              onRemove={onRemoveServerPreview}
            />
          ))}

      <div className="flex flex-col items-center justify-center">
        {hasAny ? (
          <Button
            className="absolute bottom-[7.5px] w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer"
            onClick={handleUpload}
          >
            컴퓨터에서 선택
          </Button>
        ) : (
          <>
            <FileUploadIcon />
            <Button
              className="w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer mt-[6px]"
              onClick={handleUpload}
            >
              컴퓨터에서 선택
            </Button>
            <span className="text-[9px] text-[#777777] mt-[6px]">
              지원 파일은 MP3, WAV, AAC, FLAC
            </span>
          </>
        )}
      </div>

      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
