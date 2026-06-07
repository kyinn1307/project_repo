import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetaLetterLogo } from "@/assets/SetaLetterLogo";
import { SearchBar } from "./SearchBar";
import { ArrowRight } from "lucide-react";

export const IntroductionBanner = () => {
  const navigate = useNavigate();

  // 검색어 상태를 여기서 직접 관리
  const [q, setQ] = useState("");

  // 탐색하기 버튼 클릭 시 이동 로직
  const handleExplore = () => {
    const keyword = q.trim();

    // 검색어 없으면 그냥 musician 메인으로
    if (!keyword) {
      navigate("/musician");
      return;
    }

    // 검색어 있으면 검색 결과로 이동
    navigate(`/musician?keyword=${encodeURIComponent(keyword)}`);
  };

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
          <SearchBar
            placeholder="뮤지션 찾기"
            value="musician"
            isCategoryFixed={true}
            inputValue={q} // 외부 상태 연결
            onInputChange={setQ} // 타이핑 상태 상위로 끌어올림
          />

          {/* 탐색하기 버튼 */}
          <div
            onClick={handleExplore}
            className="flex flex-row text-[15px] font-medium text-[#0050EF] whitespace-nowrap gap-[3px] cursor-pointer"
          >
            탐색하기 <ArrowRight size={18.75} />
          </div>
        </div>
      </div>
    </div>
  );
};
