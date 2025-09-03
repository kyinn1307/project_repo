import { Profile } from "@/types/my-profile";
import { ArrowLeft, Settings } from "lucide-react";

export const ChatHeader = ({ profile }: { profile: Profile }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center mb-[7.5px] pt-[22.5px] px-[7.5px] pb-[7.5px] text-[18px] font-medium gap-[71.25px] border-b-[0.75px] border-white">
      <div className="flex flex-row items-center h-[30px] gap-[7.5px] object-cover">
        <ArrowLeft size={22.5} className="cursor-pointer" />
        <span className="px-[9px] py-[2.25px] flex items-center bg-[#0050ef] text-[13.5px] font-medium rounded-full">
          {profile.nickname}
        </span>
      </div>

      <Settings size={22.5} className="cursor-pointer" />
    </div>
  );
};
