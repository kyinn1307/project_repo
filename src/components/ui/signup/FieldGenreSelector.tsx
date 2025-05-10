import { useState } from "react";
import { Button } from "@/components/ui/button";

const FIELD_OPTIONS = [
  "작사",
  "믹싱",
  "비트메이커",
  "프로듀서",
  "작곡/편곡",
  "마스터링",
  "앨범아트",
  "세션",
  "보컬",
  "영상",
  "그 외",
];

const GENRE_OPTIONS = [
  "팝",
  "힙합",
  "록",
  "재즈",
  "인디",
  "R&B",
  "클래식",
  "트로트",
  "컨트리",
  "일렉트로닉",
  "발라드",
  "그 외",
];

function SelectableTag({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`my-[3px] px-[10px] py-[7px] h-8 rounded-[5px] text-sm font-medium transition-colors duration-150 cursor-pointer
        ${
          selected ? "bg-[#0050ef] text-white" : "bg-[#111111] text-[#777777]"
        }`}
    >
      {label}
    </button>
  );
}

export default function FieldGenreSelector({
  onSubmit,
}: {
  onSubmit: (data: { fields: string[]; genres: string[] }) => void;
}) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else if (list.length < 3) {
      setList([...list, item]);
    }
  };

  const isNextEnabled = selectedFields.length > 0 || selectedGenres.length > 0;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-base font-semibold text-white">
          분야 및 장르를 선택해주세요.{" "}
          <span className="text-sm">(최대 3개)</span>
        </p>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div>
          <p className="text-xs font-medium mb-[3px] text-white">분야</p>
          <div className="flex flex-wrap gap-x-[5px]">
            {FIELD_OPTIONS.map((field) => (
              <SelectableTag
                key={field}
                label={field}
                selected={selectedFields.includes(field)}
                onClick={() =>
                  toggleSelection(field, selectedFields, setSelectedFields)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium mb-[3px] text-white">장르</p>
          <div className="flex flex-wrap gap-[5px]">
            {GENRE_OPTIONS.map((genre) => (
              <SelectableTag
                key={genre}
                label={genre}
                selected={selectedGenres.includes(genre)}
                onClick={() =>
                  toggleSelection(genre, selectedGenres, setSelectedGenres)
                }
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={!isNextEnabled}
        className={`w-full h-10 text-sm transition-colors duration-200
          ${
            isNextEnabled
              ? "bg-[#0050ef] text-white"
              : "bg-[#555555] text-[#777777]"
          }`}
        onClick={() =>
          onSubmit({ fields: selectedFields, genres: selectedGenres })
        }
      >
        완료
      </Button>
    </div>
  );
}
