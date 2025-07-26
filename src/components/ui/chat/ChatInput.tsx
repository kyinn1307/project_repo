interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}

export const ChatInput = ({
  value,
  onChange,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: ChatInputProps) => {
  return (
    <div className="flex-1 h-6">
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        placeholder="메세지를 입력하세요"
        rows={1}
        className="w-full h-full resize-none rounded-full text-[13.5px] placeholder:text-[#777777] bg-[#222222] px-3 py-1 leading-tight outline-none"
      />
    </div>
  );
};
