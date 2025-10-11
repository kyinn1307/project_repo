interface LyricsInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const LyricsInput = ({ value, setValue }: LyricsInputProps) => {
  return (
    <div className="w-full h-[77px] flex flex-col bg-[#111111] rounded-[3.75px] pt-[7.5px] px-[7.5px] text-[#ffffff]">
      <div className="flex flex-row justify-between">
        <div className="text-[10.5px] font-medium mb-[7.5px]">가사</div>
        <div className="text-[#0050ef] text-[9px]">필수항목</div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none overflow-y-auto text-[10.5px] font-medium placeholder-[#777] 
             placeholder:font-medium placeholder:text-[10.5px] focus:outline-none focus:ring-0 
             focus:border-none caret-white custom-scrollbar"
        placeholder="제목을 입력해주세요"
      />
    </div>
  );
};
