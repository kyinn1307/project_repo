import { FeedDetailContent } from "@/components/ui/profile-detail/FeedDetailContent";

export const FeedEditPage = () => {
  return (
    <div className="w-[540px] bg-[#222222] px-[11.25px] py-[15px] rounded-[7.5px]">
      <div className="flex items-center mb-[7.5px]">
        <div className="inline-flex items-center rounded-[50px] bg-[rgba(255,255,255,0.39)] gap-[7.5px] px-[11.25px] py-[3px] text-[9px] font-medium">
          <div className="text-xs font-bold text-[#ffffff]">피드</div>
        </div>
      </div>

      <FeedDetailContent />
    </div>
  );
};
