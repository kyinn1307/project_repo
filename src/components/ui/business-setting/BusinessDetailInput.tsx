interface BusinessDetailInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const BusinessDetailInput = ({
  value,
  setValue,
}: BusinessDetailInputProps) => {
  return (
    <div className="w-full h-26 bg-[#111111] rounded-[3.75px] p-[7.5px]">
      <div className="flex flex-row justify-between">
        <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
          상세내용
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none overflow-y-auto text-[10.5px] placeholder-[#777777] text-white focus:outline-none focus:ring-0 
               focus:border-none caret-white custom-scrollbar"
        placeholder="비즈니스를 설명해주세요"
      />
    </div>
  );
};
