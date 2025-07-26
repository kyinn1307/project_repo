import { BusinessUploadSection } from "@/components/ui/business-setting/BusinessUploadSection";
import { ProfitTipSection } from "@/components/ui/business-setting/ProfitTipSection";

export const BusinessSettingPage = () => {
  return (
    <div className="flex flex-col mx-auto w-[540px] gap-[75px] pt-13">
      <BusinessUploadSection />
      <ProfitTipSection />
    </div>
  );
};
