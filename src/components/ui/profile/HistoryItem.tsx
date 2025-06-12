import { HistoryMoreMenu } from "./HistoryMoreMenu";

export const HistoryItem = () => {
  return (
    <div className="px-[11.25px] py-[7.5px] flex flex-row justify-between rounded-[15px] bg-[#111111]">
      <div className="flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[3.75px]">
          <span className="text-xs text-white font-bold leading-[15px]">
            제목 들어가는 자리
          </span>
          <span className="text-[10.5px] font-regular leading-[13px]">
            분야_프로듀서,비트메이커,보컬
          </span>
          <span className="text-[10.5px] font-regular leading-[13px] text-[#777777]">
            YYYY-MM~YYYY-MM
          </span>
        </div>
        <span className="text-[10.5px] text-white font-regular leading-[13px]">
          상세내역 들어가는 자리
        </span>
      </div>

      <div className="text-[#999999] cursor-pointer">
        <HistoryMoreMenu />
      </div>
    </div>
  );
};
