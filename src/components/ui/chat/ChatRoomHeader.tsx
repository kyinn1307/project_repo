import sample from "@/assets/Images/hmson.png";
import { ExternalLink } from "lucide-react";

export const ChatRoomHeader = () => {
  return (
    <div className="w-full flex flex-row justify-between mb-[7.5px] pt-[22.5px] px-[7.5px] pb-[7.5px] text-[18px] font-medium gap-[71.25px] border-b border-white">
      <div className="flex flex-row items-center h-[30px] gap-[7.5px] object-cover">
        <img src={sample} className="w-[30px] h-[30px] rounded-full" />
        <span>닉네임블라블라</span>
      </div>
      <ExternalLink size={22.5} className="cursor-pointer" />
    </div>
  );
};
