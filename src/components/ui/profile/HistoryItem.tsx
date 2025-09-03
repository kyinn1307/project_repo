// HistoryItem.tsx
import { HistoryMoreMenu } from "./HistoryMoreMenu";
import type { QueryKey } from "@tanstack/react-query";
import type { Career } from "@/types/career";

type Props = {
  career: Career;
  invalidateKey: QueryKey;
  onEdit: () => void; // ← 추가
};

export const HistoryItem = ({ career, invalidateKey, onEdit }: Props) => {
  return (
    <div className="px-[11.25px] py-[11.25px] flex flex-row justify-between rounded-[15px] bg-[#111111]">
      <div className="flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[3.75px]">
          <span className="text-xs text-white font-bold leading-[15px]">
            {career.title}
          </span>
          <span className="text-[10.5px] leading-[13px]">
            분야_{career.fields?.join(", ")}
          </span>
          <span className="text-[10.5px] leading-[13px] text-[#777777]">
            {career.startYm} ~ {career.endYm}
          </span>
        </div>
        <span className="text-[10.5px] text-white leading-[13px]">
          {career.detail}
        </span>
      </div>

      <div className="text-[#999999] cursor-pointer">
        <HistoryMoreMenu
          id={career.id}
          invalidateKey={invalidateKey}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};
