import { Info } from "lucide-react";

interface InfoHoverProps {
  content: React.ReactNode;
}

export const InfoHover = ({ content }: InfoHoverProps) => {
  return (
    <div className="relative group">
      <Info size={18} className="text-[#0050ef] cursor-pointer" />

      {/* Tooltip */}
      <div
        className="
          absolute left-full -top-1/2 translate-y-0 ml-[20px]
          hidden group-hover:block
          w-[340.5px]
          bg-[#111111]
          border border-[#222]
          rounded-[7.5px]
          p-[11.25px]
          text-[13.5px]
          text-white
          shadow-lg
          z-10
        "
      >
        {content}
      </div>
    </div>
  );
};
