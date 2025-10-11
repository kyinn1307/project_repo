// import { AdBanner } from "@/components/ui/main/AdBanner";
import { ContentSection } from "@/components/ui/ContentSection";
import { MusicianCardList } from "@/components/ui/main/MusicianCardList";
import { loginCheck } from "@/apis/login";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { MusicCardList } from "@/components/ui/main/MusicCardList";
import { MainProjectList } from "@/components/ui/main/MainProjectList";
import { IntroductionBanner } from "@/components/ui/main/IntroductionBanner";
import { SearchBar } from "@/components/ui/main/SearchBar";

export default function MainPage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const handleIsLogin = async () => {
    try {
      const res = await loginCheck();
      const userIdMatch = res.data.message.match(/\d+/);

      if (userIdMatch) {
        const userId = parseInt(userIdMatch[0], 10);
        useUserStore.getState().setLoggedIn(true);
        useUserStore.getState().setUserId(userId);
      } else {
        throw new Error("userId not found in message");
      }
    } catch (error) {
      console.log(error);
      useUserStore.getState().setLoggedIn(false);
      useUserStore.getState().setUserId(0);
    }
  };

  useEffect(() => {
    handleIsLogin();
  }, []);

  return (
    <div className="flex flex-col items-center text-white">
      {!isLoggedIn && (
        <div className="w-full pt-[37.5px] shrink-0">
          <IntroductionBanner />
        </div>
      )}

      <div className="w-full ml-[10%]">
        <ContentSection title="뮤지션">
          <div className="max-w-[540px]">
            <SearchBar placeholder="뮤지션 찾기" value="musician" />
          </div>
          <MusicianCardList />
        </ContentSection>
        <ContentSection title="음원">
          <div className="max-w-[540px]">
            <SearchBar placeholder="음원 찾기" value="track" />
          </div>
          <MusicCardList />
        </ContentSection>
        <ContentSection title="프로젝트">
          <div className="max-w-[540px]">
            <SearchBar placeholder="프로젝트 찾기" value="project" />
          </div>
          <MainProjectList />
        </ContentSection>
      </div>
    </div>
  );
}
