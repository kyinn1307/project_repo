import { Business } from "@/types/business";
import { TrackField } from "./TrackField";

type Props = {
  name: string;
  track: Business;
  onChange: (patch: Partial<Business>) => void;
  onSave: () => void;
  onCancel: () => void;
};

export const TrackEditContent = ({
  name,
  track,
  onChange,
  onSave,
  onCancel,
}: Props) => {
  return (
    <div className="w-full bg-[#111111] rounded-[7.5px] p-[15px] text-white font-bold flex flex-col">
      <div className="flex justify-between items-start mb-[15px]">
        <div className="text-xs font-bold">{name}</div>
        <button className="text-[#0050ef] text-[10.5px]" onClick={onSave}>
          완료
        </button>
      </div>

      {/* 필드들 */}
      <div className="flex flex-col gap-[15px] text-[10.5px] font-medium">
        <TrackField
          label="장르"
          value={track.genre}
          onChange={(v) => onChange({ genre: v })}
        />
        <TrackField
          label="분야"
          value={track.field}
          onChange={(v) => onChange({ field: v })}
        />
        <TrackField
          label="가격"
          unit="원"
          value={track.price}
          onChange={(v) => onChange({ price: v })}
        />
        <TrackField
          label="작업일"
          unit="일"
          value={track.period}
          onChange={(v) => onChange({ period: v })}
        />
        <TrackField
          label="수정횟수"
          unit="회"
          value={track.editTime}
          onChange={(v) => onChange({ editTime: v })}
        />
      </div>

      {/* 설명 textarea */}
      <div className="flex flex-col gap-[7.5px] mt-[15px]">
        <div className="text-[10.5px]">설명</div>
        <textarea
          className="bg-[#444444] rounded-[7.5px] text-white p-[7.5px] text-[10.5px] resize-none h-[75px]"
          value={track.businessDescription}
          onChange={(e) => onChange({ businessDescription: e.target.value })}
        />
      </div>

      {/* 취소 버튼 필요하면 노출 */}
      <div className="mt-[10px]">
        <button className="text-xs text-[#999]" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};
