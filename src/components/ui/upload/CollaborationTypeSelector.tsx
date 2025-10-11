interface Props {
  value: string; // 라벨 그대로
  setValue: (v: string) => void; // 라벨 그대로
}

const TYPE_LABELS = ["팀원 모집", "프로젝트", "피드백", "외주 요청"];

export const CollaborationTypeSelector = ({ value, setValue }: Props) => {
  const handleClick = (label: string) => {
    setValue(value === label ? "" : label); // 다시 클릭 시 선택 해제
  };

  return (
    <div className="w-full bg-[#111111] p-[7.5px] rounded-[3.75px] text-white">
      <div className="flex flex-row justify-between">
        <div className="text-[10.5px] font-medium mb-[6px]">콜라보레이션</div>
        <div className="text-[#0050ef] text-[9px] font-medium mb-[6px]">
          필수항목
        </div>
      </div>
      <div className="flex flex-wrap gap-[7.5px]">
        {TYPE_LABELS.map((label) => {
          const isSelected = value === label;
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
