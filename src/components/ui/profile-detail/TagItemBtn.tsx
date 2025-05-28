interface TagItemBtnProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

export const TagItemBtn = ({ tag, isSelected, onClick }: TagItemBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-[10px] py-[3px] rounded-full text-[10.5px] font-medium transition-colors cursor-pointer
          ${
            isSelected
              ? "bg-[#0050ef] text-white"
              : "bg-[#333333] text-[#c4c4c4]"
          }`}
    >
      {tag}
    </button>
  );
};
