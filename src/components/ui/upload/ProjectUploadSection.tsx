import { useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";

interface ProjectUploadSectionProps {
  files: File[];
  setFiles: (files: File[]) => void;
  audioPreviewUrls?: string[];
}

export const ProjectUploadSection = ({
  files,
  setFiles,
  audioPreviewUrls = [],
}: ProjectUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles([...files, ...selectedFiles].slice(0, 5));
  };

  const getFilenameFromUrl = (url: string) => {
    return decodeURIComponent(url.split("/").pop() || "음원");
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const renderFileList = () => {
    if (files.length > 0) {
      return files.map((file, index) => (
        <FileItem
          key={file.name + index}
          filename={file.name}
          onRemove={() => handleRemoveFile(index)}
        />
      ));
    }

    if (audioPreviewUrls.length > 0) {
      return audioPreviewUrls.map((url, index) => (
        <FileItem
          key={url + index}
          filename={getFilenameFromUrl(url)}
          onRemove={() => setFiles([])}
        />
      ));
    }

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
          MP3, WAV, AAC, FLAC 파일을 최대 5개까지 업로드할 수 있어요
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        첨부파일
      </div>
      {renderFileList()}
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
