import { useState } from "react";

const fieldList = [
  "작사",
  "작곡/편곡",
  "프로듀서",
  "믹싱",
  "마스터링",
  "비트메이커",
  "세션",
  "보컬",
  "앨범아트",
  "영상",
  "그 외",
];

export const FieldSelector = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleClick = (label: string) => {
    setSelectedFields((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="w-full bg-[#111111] p-[7.5px] rounded-md text-white">
      <div className="text-[10.5px] font-medium mb-[6px]">분야</div>
      <div className="flex flex-wrap gap-[7.5px]">
        {fieldList.map((label) => {
          const isSelected = selectedFields.includes(label);
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`px-[7.5px] py-[2.25px] text-[10.5px] rounded-full cursor-pointer
                ${isSelected ? "bg-[#0050ef]" : "bg-[#333333]"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
