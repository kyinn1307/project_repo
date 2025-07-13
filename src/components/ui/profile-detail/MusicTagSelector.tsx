import { TagItemBtn } from "./TagItemBtn";
import type { EmotionTag } from "@/types/music";
import { tagList } from "@/constants/tagList";
interface MusicTagSelectorProps {
  value: EmotionTag[];
  setValue: (tags: EmotionTag[]) => void;
}

export const MusicTagSelector = ({
  value,
  setValue,
}: MusicTagSelectorProps) => {
  const toggleTag = (tag: EmotionTag) => {
    setValue(
      value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#111111] p-[7.5px] rounded-[3.75px]">
      <div className="text-[#ffffff] font-medium text-[10.5px]">태그</div>
      <div className="flex flex-wrap gap-x-[7.5px] gap-y-[10px] mt-[15px]">
        {tagList.map((tag) => (
          <TagItemBtn
            key={tag}
            tag={tag}
            isSelected={value.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};
