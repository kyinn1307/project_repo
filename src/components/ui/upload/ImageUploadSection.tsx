import { useRef } from "react";
import { Button } from "../button";
import { FileItem } from "../profile-detail/FileItem";
import { FileUploadIcon } from "@/assets/Icons/FileUploadIcon";

interface ImageUploadSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  imagePreviewUrl?: string | null;
}

export const ImageUploadSection = ({
  file,
  setFile,
  imagePreviewUrl,
}: ImageUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const getFilenameFromUrl = (url: string) => {
    return decodeURIComponent(url.split("/").pop() || "이미지");
  };

  const renderFilePreview = () => {
    if (file) {
      return <FileItem filename={file.name} onRemove={() => setFile(null)} />;
    } else if (imagePreviewUrl) {
      return (
        <FileItem
          filename={getFilenameFromUrl(imagePreviewUrl)}
          onRemove={() => setFile(null)} // ❗️ 삭제하면 file만 null됨 → preview는 남겨둘 수도 있음
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
            지원 파일은 JPG, PNG, WEBP
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 h-30 bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
        이미지
      </div>
      {renderFilePreview()}
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
