import { useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";

interface MusicUploadSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  audioPreviewUrl?: string | null;
}

export const MusicUploadSection = ({
  file,
  setFile,
  audioPreviewUrl,
}: MusicUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click(); // input 클릭 트리거
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const getFilenameFromUrl = (url: string) => {
    return decodeURIComponent(url.split("/").pop() || "음원");
  };

  const renderFilePreview = () => {
    if (file) {
      return <FileItem filename={file.name} onRemove={() => setFile(null)} />;
    } else if (audioPreviewUrl) {
      return (
        <FileItem
          filename={getFilenameFromUrl(audioPreviewUrl)}
          onRemove={() => setFile(null)} // ❗️기존 URL 유지하고 싶다면 preview 상태도 따로 관리해야 함
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-[6px] mt-[5px]">
          <FileUploadIcon />
          <Button
            className="w-[94px] h-[22px] bg-[#0050ef] text-white text-[10.5px] font-medium cursor-pointer mt-[6.75px]"
            onClick={handleUpload}
          >
            컴퓨터에서 선택
          </Button>
          <p className="text-[9px] text-[#777777]">
            지원 파일은 MP3, WAV, AAC, FLAC
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 h-30 bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        음원
      </div>
      {renderFilePreview()}
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
