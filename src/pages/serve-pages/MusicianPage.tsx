import { InfiniteMusicianCardList } from "@/components/ui/main/InfiniteMusicianCardList";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { AdContent } from "@/components/ui/serve-pages/AdContent";
export const MusicianPage = () => {
  return (
    <div className="flex flex-col pt-[38px] px-[10%]">
      <AdContent />
      <section className="flex flex-col mt-[45px]">
        <div className="text-2xl text-white font-bold"> 뮤지션</div>
        <div className="relative flex flex-row mt-[22.5px]">
          <span className="absolute left-[15px] top-[5.25px]">
            <SearchIcon />
          </span>
          <input
            className="w-127 h-[22.5px] bg-[#222222] placeholder-[#777777] text-xs text-white pl-[34.5px] rounded outline-none ring-0 focus:ring-0 focus:outline-none"
            placeholder="뮤지션찾기"
          />
        </div>
        <div className="mt-[15px]">
          <InfiniteMusicianCardList />
        </div>
      </section>
    </div>
  );
};
