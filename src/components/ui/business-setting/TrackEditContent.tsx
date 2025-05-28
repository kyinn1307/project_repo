import { TrackField } from "./TrackField";

type Props = {
  name: string;
  onComplete: () => void;
};

export const TrackEditContent = ({ name, onComplete }: Props) => {
  return (
    <div className="w-full bg-[#111111] rounded-[7.5px] p-[15px] text-white font-bold flex flex-col">
      <div className="flex justify-between items-start mb-[15px]">
        <div className="text-xs font-bold">{name}</div>
        <button className="text-[#0050ef] text-[10.5px]" onClick={onComplete}>
          완료
        </button>
      </div>

      {/* 필드들 */}
      <div className="flex flex-col gap-[15px] text-[10.5px] font-medium">
        <TrackField label="장르" />
        <TrackField label="분야" />
        <TrackField label="가격" unit="원" />
        <TrackField label="작업일" unit="일" />
        <TrackField label="수정횟수" unit="회" />
      </div>

      {/* 설명 textarea */}
      <div className="flex flex-col gap-[7.5px] mt-[15px]">
        <div className="text-[10.5px]">설명</div>
        <textarea className="bg-[#444444] rounded-[7.5px] text-white p-[7.5px] text-[10.5px] resize-none h-[75px]" />
      </div>
    </div>
  );
};
