import { useState, useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";

export const MusicUploadSection = () => {
  const [files, setFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click(); // input 클릭 트리거
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const fileNames = selectedFiles.map((file) => file.name);
    setFiles((prev) => [...prev, ...fileNames]);
  };

  const renderEmptyState = () => (
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

  const renderFileList = () => (
    <div className="flex flex-col mt-[7.5px] gap-[7.5px] max-h-[120px] overflow-y-auto pr-[2px]">
      {files.map((filename, index) => (
        <FileItem
          key={index}
          filename={filename}
          onRemove={() => {
            setFiles((prev) => prev.filter((_, i) => i !== index));
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 h-30 bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        음원
      </div>
      {files.length === 0 ? renderEmptyState() : renderFileList()}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
