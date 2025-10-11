// pages/edit-pages/UploadPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MusicUploadContent } from "@/components/ui/upload/MusicUploadContent";
import { FeedUploadContent } from "@/components/ui/upload/FeedUploadContent";
import { ProjectUploadContent } from "@/components/ui/upload/ProjectUploadContent";

const MENU = ["음원", "피드", "프로젝트"] as const;
type UploadTab = (typeof MENU)[number];

type UploadTabKey = "track" | "feed" | "project";

const KEY_TO_LABEL: Record<UploadTabKey, UploadTab> = {
  track: "음원",
  feed: "피드",
  project: "프로젝트",
};
const LABEL_TO_KEY: Record<UploadTab, UploadTabKey> = {
  음원: "track",
  피드: "feed",
  프로젝트: "project",
};

export const UploadPage = ({ tab }: { tab?: UploadTabKey }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<UploadTab>(
    tab ? KEY_TO_LABEL[tab] : "음원"
  );

  useEffect(() => {
    if (tab) setActiveTab(KEY_TO_LABEL[tab]);
  }, [tab]);

  const handleClick = (menu: UploadTab) => {
    if (tab) {
      const key = LABEL_TO_KEY[menu];
      navigate(`/upload/${key}`);
    } else {
      setActiveTab(menu);
    }
  };

  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px] mt-[5px]">
      <div className="flex items-center mb-[7.5px]">
        <div className="inline-flex items-center rounded-[50px] bg-[rgba(255,255,255,0.1)] gap-[7.5px] px-[11.25px] py-[3px] text-[9px] font-regular">
          {MENU.map((menu) => (
            <button
              key={menu}
              onClick={() => handleClick(menu)}
              className={`px-[7.5px] py-[3px] rounded-[15px] ${
                activeTab === menu
                  ? "text-[#ffffff] font-bold"
                  : "text-[#777777]"
              }`}
            >
              {menu}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "음원" && <MusicUploadContent />}
      {activeTab === "피드" && <FeedUploadContent />}
      {activeTab === "프로젝트" && <ProjectUploadContent />}
    </div>
  );
};
