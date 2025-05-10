import { AdBanner } from "@/components/ui/main/AdBanner";
import { ContentSection } from "@/components/ui/ContentSection";
import { MusicianCardList } from "@/components/ui/main/MusicianCardList";
import { ProjectCardList } from "@/components/ui/main/ProjectCardList";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center text-white px-[10%]">
      <AdBanner />
      <ContentSection title="프로젝트">
        <ProjectCardList />
      </ContentSection>
      <ContentSection title="뮤지션">
        <MusicianCardList />
      </ContentSection>
    </div>
  );
}
