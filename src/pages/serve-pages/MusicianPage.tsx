import { InfiniteMusicianCardList } from "@/components/ui/main/InfiniteMusicianCardList";
import { SearchIcon } from "@/assets/Icons/SearchIcon";

export const MusicianPage = () => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col mt-[52px] pl-[10%]">
        <div className="h-[30px] flex items-center text-2xl text-white font-bold">
          뮤지션
        </div>
        <div className="relative flex flex-row mt-[22.5px]">
          <span className="absolute left-[15px] top-[5.25px]">
            <SearchIcon />
          </span>
          <input
            className="w-127 h-[22.5px] bg-[#222222] placeholder-[#777777] text-xs text-white pl-[34.5px] rounded outline-none ring-0 focus:ring-0 focus:outline-none"
            placeholder="뮤지션찾기"
          />
        </div>
        <div className="mt-[22.5px] text-white">
          <InfiniteMusicianCardList />
        </div>
      </section>
    </div>
  );
};
