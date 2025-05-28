import { useState } from "react";
import { GenreItemBtn } from "./GenreItemBtn";

type Genre =
  | "팝"
  | "힙합"
  | "록"
  | "재즈"
  | "인디"
  | "R&B"
  | "클래식"
  | "트로트"
  | "컨트리"
  | "일렉트로닉"
  | "발라드"
  | "그 외";

const genreList: Genre[][] = [
  ["팝", "힙합", "록", "재즈", "인디", "R&B", "클래식", "트로트", "컨트리"],
  ["일렉트로닉", "발라드", "그 외"],
];

export const GenreSelector = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const handleGenreClick = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-[#ffffff] font-medium text-[10.5px]">장르</div>
      <div className="flex flex-col gap-[7.5px] mt-[7.5px]">
        {genreList.map((line, idx) => (
          <div key={idx} className="flex flex-row gap-[7.5px]">
            {line.map((genre) => (
              <GenreItemBtn
                key={genre}
                genre={genre}
                isSelected={selectedGenres.includes(genre)}
                onClick={() => handleGenreClick(genre)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
