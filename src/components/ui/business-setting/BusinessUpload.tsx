import { BusinessUploadIcon } from "@/assets/Icons/BusinessUploadIcon";

interface BusinessUploadProps {
  onClick: () => void;
}

export const BusinessUpload = ({ onClick }: BusinessUploadProps) => {
  return (
    <div
      className="w-full h-36 bg-[#111111] flex flex-col items-center py-[30px] gap-[15px] rounded-[7.5px]"
      onClick={onClick}
    >
      <BusinessUploadIcon />
      <div className="font-medium text-xs text-[#ffffff]">
        비즈니스 등록하고 수익 얻기
      </div>
    </div>
  );
};
