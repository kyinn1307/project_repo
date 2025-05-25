import { useState } from "react";

import { MusicUploadContent } from "@/components/ui/upload/MusicUploadContent";
import { FeedUploadContent } from "@/components/ui/upload/FeedUploadContent";
import { ProjectUploadContent } from "@/components/ui/upload/ProjectUploadContent";

const MENU = ["음원", "피드", "프로젝트"] as const;
type UploadTab = (typeof MENU)[number];

export const UploadPage = () => {
  const [activeTab, setActiveTab] = useState<UploadTab>("음원");

  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px]">
      <div className="flex items-center mb-[7.5px]">
        <div className="inline-flex items-center rounded-[50px] bg-[rgba(255,255,255,0.1)] gap-[7.5px] px-[11.25px] py-[3px] text-[9px] font-regular">
          {MENU.map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveTab(menu)}
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
