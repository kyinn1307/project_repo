interface FeedDescriptionInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const FeedDescriptionInput = ({
  value,
  setValue,
}: FeedDescriptionInputProps) => {
  return (
    <div className="w-full h-[77px] bg-[#111111] rounded-[3.75px] p-[7.5px]">
      <div className="flex flex-row justify-between">
        <div className="text-white font-medium text-[10.5px] mb-[7.5px]">
          상세내용
        </div>
        <div className="text-[#0050ef] text-[9px] mb-[7.5px]">필수항목</div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none overflow-y-auto text-[10.5px] placeholder-[#777777] text-white focus:outline-none focus:ring-0 
               focus:border-none caret-white custom-scrollbar"
        placeholder="제목을 입력해주세요"
      />
    </div>
  );
};
