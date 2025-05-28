export const TrackField = ({
  label,
  unit,
}: {
  label: string;
  unit?: string;
}) => (
  <div className="flex gap-[7.5px]">
    <div className="w-[45px] text-left">{label}</div>
    <div className="flex flex-row gap-[7.5px] items-center">
      <input
        type="text"
        className="bg-[#444444] rounded text-white text-xs w-[90px]"
      />
      {unit && <span className="text-xs">{unit}</span>}
    </div>
  </div>
);
