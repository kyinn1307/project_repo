import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons/SearchIcon";

export function SearchBar() {
  return (
    <div className="relative w-full h-[22.5px]">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </div>
      <Input
        type="search"
        placeholder="새로운 사운드 찾기"
        className="w-full h-full pl-10 pr-3 bg-[#222222] text-white placeholder:text-[#777777] border-none rounded-[4px]"
      />
    </div>
  );
}
