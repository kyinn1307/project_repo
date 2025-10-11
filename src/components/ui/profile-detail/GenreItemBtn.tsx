type GenreItemBtnProps = {
  genre: string;
  isSelected: boolean;
  onClick: () => void;
};

export const GenreItemBtn = ({
  genre,
  isSelected,
  onClick,
}: GenreItemBtnProps) => {
  return (
    <button
      className={`flex items-center text-[10.5px] h-[17.5px] text-[#ffffff] font-regular rounded-[20px] px-[7.5px] cursor-pointer ${
        isSelected ? "bg-[#0050ef] text-white" : "bg-[#333333] text-[#c4c4c4]"
      }`}
      onClick={onClick}
    >
      {genre}
    </button>
  );
};
