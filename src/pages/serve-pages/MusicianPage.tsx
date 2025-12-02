import { useState, useEffect } from "react";
import { InfiniteMusicianCardList } from "@/components/ui/main/InfiniteMusicianCardList";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { SearchBar } from "@/components/ui/main/SearchBar";

export const MusicianPage = () => {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div className="flex flex-col">
      <section className="flex flex-col mt-[52px] px-[5.2%] min-w-[1080px]">
        <div className="h-[30px] flex items-center text-2xl text-white font-bold">
          뮤지션
        </div>
        <div className="relative flex flex-row mt-[22.5px]">
          <span className="absolute left-[15px] top-[5.25px]">
            <SearchIcon />
          </span>
        </div>
        <div className="w-[50%]">
          <SearchBar
            placeholder="뮤지션 찾기"
            value="musician"
            inputValue={q} // 입력값을 상태와 연결
            onInputChange={setQ}
          />
        </div>
        <div className="mt-[22.5px] text-white">
          <InfiniteMusicianCardList searchTerm={debouncedQ} />
        </div>
      </section>
    </div>
  );
};
