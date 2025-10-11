import type { Genre } from "@/types/music";
import { GenreItemBtn } from "../profile-detail/GenreItemBtn";

const genreList: Genre[][] = [
  ["팝", "힙합", "록", "재즈", "인디", "R&B", "클래식", "트로트", "컨트리"],
  ["일렉트로닉", "발라드", "그 외"],
];

interface BusinessGenreSelectorProps {
  value: Genre | "";
  setValue: React.Dispatch<React.SetStateAction<Genre | "">>;
  isRequired: boolean;
}
export const BusinessGenreSelector = ({
  value,
  setValue,
  isRequired,
}: BusinessGenreSelectorProps) => {
  //   const handleGenreClick = (genre: Genre) => {
  //     setValue(
  //       value.includes(genre)
  //         ? value.filter((g) => g !== genre)
  //         : [...value, genre]
  //     );
  //   };

  const handleGenreClick = (genre: Genre) => {
    if (value === genre) {
      return;
    }
    setValue(genre); // 하나만 보관
  };

  return (
    <div className="w-full flex flex-col bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="flex flex-row justify-between">
        <div className="text-white font-medium text-[10.5px]">장르</div>
        {isRequired && (
          <div className="text-[#0050ef] text-[9px]">필수항목</div>
        )}
      </div>
      <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
        {genreList.map((line, idx) => (
          <div key={idx} className="flex flex-row gap-[7.5px]">
            {line.map((genre) => (
              <GenreItemBtn
                key={genre}
                genre={genre}
                // isSelected={value.includes(genre)}
                isSelected={value === genre}
                onClick={() => handleGenreClick(genre)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
