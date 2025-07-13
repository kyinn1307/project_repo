// import { AdBanner } from "@/components/ui/main/AdBanner";
import { ContentSection } from "@/components/ui/ContentSection";
import { MusicianCardList } from "@/components/ui/main/MusicianCardList";
import { ProjectCardList } from "@/components/ui/main/ProjectCardList";
import { loginCheck } from "@/apis/login";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { MusicCardList } from "@/components/ui/main/MusicCardList";

export default function MainPage() {
  const handleIsLogin = async () => {
    try {
      const res = await loginCheck();
      const userIdMatch = res.data.message.match(/\d+/); // 정규식으로 숫자 추출

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
      useUserStore.getState().setUserId(null);
    }
  };

  useEffect(() => {
    handleIsLogin();
  });

  return (
    <div className="flex flex-col items-center text-white px-[10%]">
      {/* <AdBanner /> */}
      <ContentSection title="뮤지션">
        <MusicianCardList />
      </ContentSection>
      <ContentSection title="음원">
        <MusicCardList />
      </ContentSection>

      <ContentSection title="프로젝트">
        <ProjectCardList />
      </ContentSection>
    </div>
  );
}
