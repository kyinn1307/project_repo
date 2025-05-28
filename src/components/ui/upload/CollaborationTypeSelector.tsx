import { useState } from "react";

export const CollaborationTypeSelector = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const typeList = ["팀원 모집", "프로젝트", "피드백", "외주 요청"];

  const handleClick = (label: string) => {
    setSelectedType((prev) => (prev === label ? null : label));
  };

  return (
    <div className="w-full bg-[#111111] p-[7.5px] rounded-[3.75px] text-white">
      <div className="text-[10.5px] font-medium mb-[6px]">콜라보레이션</div>
      <div className="flex flex-wrap gap-[7.5px]">
        {typeList.map((label) => {
          const isSelected = selectedType === label;
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`px-[7.5px] py-[2.25px] text-[10.5px] rounded-full cursor-pointer
                ${isSelected ? "bg-[#0050ef]" : "bg-[#333333] "}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
