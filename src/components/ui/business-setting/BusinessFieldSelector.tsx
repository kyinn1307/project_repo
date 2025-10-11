interface BusinessFieldSelectorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isRequired: boolean;
}
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

export const BusinessFieldSelector = ({
  value,
  setValue,
  isRequired,
}: BusinessFieldSelectorProps) => {
  //   const handleClick = (label: string) => {
  //     setValue((prev) =>
  //       prev.includes(label)
  //         ? prev.filter((item) => item !== label)
  //         : [...prev, label]
  //     );
  //   };
  const handleClick = (label: string) => {
    if (value === label) {
      if (!isRequired) setValue(""); // 선택 해제 허용
      return;
    }
    setValue(label); // 항상 하나만 보관
  };

  return (
    <div className="w-full bg-[#111111] p-[7.5px] rounded-[5px] text-white">
      <div className="flex flex-row justify-between">
        <div className="text-[10.5px] font-medium mb-[6px]">분야</div>
        {isRequired && (
          <div className="text-[9px] text-[#0050ef] mb-[6px]">필수항목</div>
        )}
      </div>
      <div className="flex flex-wrap gap-[7.5px]">
        {fieldList.map((label) => {
          //   const isSelected = value.includes(label);
          const isSelected = value === label;
          return (
            // <button
            //   key={label}
            //   onClick={() => handleClick(label)}
            //   className={`px-[7.5px] py-[2.25px] text-[10.5px] rounded-full cursor-pointer
            //       ${isSelected ? "bg-[#0050ef]" : "bg-[#333333]"}`}
            // >
            <button
              key={label}
              type="button"
              onClick={() => handleClick(label)}
              className={`px-[7.5px] py-[2.25px] text-[10.5px] rounded-full
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
