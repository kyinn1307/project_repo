export const TitleInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <div className="w-full bg-[#111111] rounded-[3.75px] p-[7.5px] ">
      <div className="flex flex-row justify-between">
        <div className="text-white text-[10.5px]">제목</div>
        <div className="text-[#0050EF] text-[9px]">필수항목</div>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full text-[10.5px] text-white placeholder-[#777777] focus:outline-none focus:ring-0 
             focus:border-none caret-white custom-scrollbar"
        placeholder="제목을 입력해주세요"
      />
    </div>
  );
};
