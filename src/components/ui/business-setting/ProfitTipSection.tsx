import { ProfitTipList } from "./ProfitTipList";

export const ProfitTipSection = () => {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="font-bold text-xs text-[#ffffff]">수익 얻기 Tip</div>
      <ProfitTipList />
    </div>
  );
};
