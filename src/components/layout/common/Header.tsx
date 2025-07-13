import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/main/SearchBar";
import { AlarmIcon } from "@/assets/Icons/AlarmIcon";
import { SetaLetterLogo } from "@/assets/SetaLetterLogo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { MypageIcon } from "@/assets/Icons/MypageIcon";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useUserStore } from "@/stores/useUserStore";

export const Header = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const { toggle } = useSidebarStore();

  const handleBtnClick = (route: string) => {
    if (isLoggedIn) {
      navigate(`/${route}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-9 bg-[#000000] border-b border-[#777777] z-50 px-[1.5vw] flex items-center justify-between">
      <div className="flex items-center gap-[1.12vw] min-w-max">
        <SidebarTrigger
          className="text-white hover:text-white hover:bg-transparent cursor-pointer"
          onClick={toggle}
        />
        <SetaLetterLogo onClick={() => handleBtnClick("")} />
      </div>

      <div className="mx-[0.5vw] flex-1 flex justify-center min-w-0">
        <div className="w-full max-w-[500px] min-w-[180px] transition-all duration-300">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-[1vw] min-w-max">
        {/* {isLoggedIn ? ( */}
        <>
          <div
            className="hidden lg:block"
            onClick={() => handleBtnClick("musician-register")}
          >
            <Button className="flex items-center w-[66px] h-[18px] bg-[#0050ef] text-white text-[10.25px] rounded-[3.75px] cursor-pointer whitespace-nowrap">
              뮤지션 등록
            </Button>
          </div>
          <div
            className="hidden md:block"
            onClick={() => handleBtnClick("alarm")}
          >
            <AlarmIcon />
          </div>
          <div
            className="hidden sm:block"
            onClick={() => handleBtnClick("my-profile")}
          >
            <MypageIcon />
          </div>
        </>

        {/* 약관 동의 페이지 우측 헤더 버튼 */}
        {/* <div className="flex gap-[1vw] mr-2">
          <span className="text-white text-sm cursor-pointer">로그인</ㄴ>
          <span className="text-white text-sm cursor-pointer">회원가입</span>
        </div> */}
      </div>
    </header>
  );
};
