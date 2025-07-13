interface CommentInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const CommentInput = ({ value, setValue }: CommentInputProps) => {
  return (
    <div className="w-full h-[77px] flex flex-col bg-[#111111] rounded-[3.75px] pt-[7.5px] px-[7.5px] text-[#ffffff]">
      <div className="text-[10.5px] font-medium mb-[7.5px]">코멘트</div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full resize-none overflow-y-auto text-[10.5px] font-medium placeholder-[#777] 
               placeholder:font-medium placeholder:text-[10.5px] focus:outline-none focus:ring-0 
               focus:border-none caret-white custom-scrollbar"
        placeholder="코멘트를 입력해주세요"
      />
    </div>
  );
};
