import { useState } from "react";
import { TagItemBtn } from "./TagItemBtn";

const tagList = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5",
  "tag6",
  "tag7",
  "tag8",
  "tag9",
  "tag10",
  "tag11",
  "tag12",
] as const;

type Tag = (typeof tagList)[number];

export const FeedTagSelector = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
            isSelected={selectedTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};
