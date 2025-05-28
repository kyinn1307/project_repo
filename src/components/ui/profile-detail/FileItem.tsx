import { X } from "lucide-react";

interface FileItemProps {
  filename: string;
  onRemove: () => void;
}

export const FileItem = ({ filename, onRemove }: FileItemProps) => {
  return (
    <div className="h-[25px] bg-[#1a1a1a] text-[#ffffff] text-[9px] px-[7.5px] py-[3.5px] rounded-[3.75px] flex items-center justify-between">
      <div>{filename}</div>
      <button
        className="text-white hover:opacity-70 cursor-pointer"
        onClick={onRemove}
      >
        <X className="w-[15px] h-[15px]" />
      </button>
    </div>
  );
};
