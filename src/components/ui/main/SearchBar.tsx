// components/ui/main/SearchBar.tsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { ChevronDown } from "@/assets/Icons/header/ChevronDown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Category = "musician" | "track" | "project" | "business";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "musician", label: "뮤지션" },
  { value: "track", label: "음원" },
  { value: "project", label: "프로젝트" },
  { value: "business", label: "비즈니스" },
];

export function SearchBar({
  placeholder,
  value,
  onCategoryChange,
  inputValue,
  onInputChange,
}: {
  placeholder: string;
  value?: Category;
  onCategoryChange?: (c: Category) => void;
  inputValue?: string;
  onInputChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>(value ?? "track");
  const [innerText, setInnerText] = useState(inputValue ?? "");

  useEffect(() => {
    if (value) setCategory(value);
  }, [value]);

  const label = CATEGORIES.find((c) => c.value === category)?.label ?? "음원";

  useEffect(() => {
    if (inputValue !== undefined) setInnerText(inputValue);
  }, [inputValue]);

  const handleTextChange = (v: string) => {
    if (onInputChange) onInputChange(v);
    else setInnerText(v);
  };

  const select = (c: Category) => {
    setCategory(c);
    onCategoryChange?.(c);
    setOpen(false);
  };

  return (
    <div className="relative w-full h-[22.5px]">
      {/* 좌측 검색 아이콘 */}
      <div className="absolute left-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon />
      </div>

      {/* 인풋 */}
      <Input
        type="search"
        placeholder={placeholder}
        value={inputValue ?? innerText}
        onChange={(e) => handleTextChange(e.target.value)}
        className="w-full h-full pl-10 pr-[72px] bg-[#222222] text-white placeholder:text-[#777777] border-none rounded-[4px] outline-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-search-cancel-button]:hidden"
      />

      {/* 우측 카테고리 셀렉터 (Popover Trigger) */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="absolute right-[15px] top-1/2 -translate-y-1/2 flex items-center gap-[7.5px] text-xs text-white cursor-pointer"
            aria-label="검색 종류 선택"
          >
            <span className="whitespace-nowrap">{label}</span>
            <ChevronDown />
          </button>
        </PopoverTrigger>

        {/* 팝오버 내용 */}
        <PopoverContent
          side="bottom"
          alignOffset={-15}
          sideOffset={6}
          align="end"
          className="px-0 py-[7.5px] w-[75px] bg-[#111111] border border-[#777777] rounded-[7.5px]"
        >
          <ul className="flex flex-col">
            {CATEGORIES.map((c) => {
              const active = c.value === category;
              return (
                <li
                  key={c.value}
                  className="px-[15px] py-[7.5px] hover:text-white hover:bg-white/5"
                >
                  <button
                    type="button"
                    onClick={() => select(c.value)}
                    className={[
                      "w-full h-[15px] flex justify-left items-center text-left whitespace-nowrap",
                      "text-[#999999]",
                      active ? "text-white" : "",
                      "text-xs leading-none",
                    ].join(" ")}
                  >
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
