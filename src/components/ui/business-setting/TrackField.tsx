export const TrackField = ({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
}) => (
  <div className="flex gap-[7.5px]">
    <div className="w-[45px] text-left">{label}</div>
    <div className="flex flex-row gap-[7.5px] items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#444444] rounded text-white text-xs w-[90px]"
      />
      {unit && <span className="text-xs">{unit}</span>}
    </div>
  </div>
);
