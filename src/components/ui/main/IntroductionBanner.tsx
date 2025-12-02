import { SetaLetterLogo } from "@/assets/SetaLetterLogo";
import sampleImg from "@/assets/Images/sample-musician.png";
import { SearchBar } from "./SearchBar";
import { ArrowRight } from "lucide-react";

export const IntroductionBanner = () => {
  return (
    <div className="relative flex-1 h-[262.5px] flex flex-row min-w-230">
      {/* seta 소개 */}
      <div className="flex flex-col gap-15 pl-[5.2%] z-10">
        <div className="flex flex-col gap-[30px] pt-[25.75px]">
          <div className="w-[243.21px] h-[45pxw]">
            <SetaLetterLogo />
          </div>
          <div className="flex flex-col font-medium text-lg gap-[10px]">
            <span className="flex items-center h-[23px]">
              콜라보가 일상이 되는 플랫폼 SETA
            </span>
            <span className="flex items-center h-[23px]">
              프로젝트 구인부터 아티스트 탐색까지, 음악인을 위한 네트워크.
            </span>
          </div>
        </div>
        {/* 뮤지션 탐색 search bar section */}
        <div className="h-[22.5px] flex flex-row items-center gap-[21.46px]">
          <SearchBar placeholder="뮤지션 찾기" />
          <div className="flex flex-row text-[15px] font-medium text-[#0050EF] whitespace-nowrap gap-[3px] cursor-pointer">
            탐색하기 <ArrowRight size={18.75} />
          </div>
        </div>
      </div>
      <div className="absolute right-0 h-full">
        <img src={sampleImg} className="h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_0%,#000000_42%,transparent_100%)]"></div>
      </div>
    </div>
  );
};
