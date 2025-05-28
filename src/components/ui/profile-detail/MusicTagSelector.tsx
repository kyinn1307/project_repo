import { useState } from "react";
import { TagItemBtn } from "./TagItemBtn";

type EmotionTag =
  | "bouncy"
  | "dark"
  | "energetic"
  | "soulful"
  | "inspiring"
  | "confident"
  | "sad"
  | "calm"
  | "angry"
  | "happy"
  | "relaxed"
  | "epic"
  | "determined"
  | "crazy"
  | "intense"
  | "loved"
  | "dirty"
  | "depressed"
  | "lonely"
  | "hyper"
  | "evil"
  | "peaceful"
  | "grateful"
  | "gloomy"
  | "anxious"
  | "powerful"
  | "adored"
  | "scary"
  | "enraged"
  | "lazy"
  | "romantic"
  | "disappointed"
  | "scared"
  | "frantic"
  | "exciting"
  | "tense"
  | "dramatic";

const tagList: EmotionTag[] = [
  "bouncy",
  "dark",
  "energetic",
  "soulful",
  "inspiring",
  "confident",
  "sad",
  "calm",
  "angry",
  "happy",
  "relaxed",
  "epic",
  "determined",
  "crazy",
  "intense",
  "loved",
  "dirty",
  "depressed",
  "lonely",
  "hyper",
  "evil",
  "peaceful",
  "grateful",
  "gloomy",
  "anxious",
  "powerful",
  "adored",
  "scary",
  "enraged",
  "lazy",
  "romantic",
  "disappointed",
  "scared",
  "frantic",
  "exciting",
  "tense",
  "dramatic",
];

export const MusicTagSelector = () => {
  const [selectedTags, setSelectedTags] = useState<EmotionTag[]>([]);

  const toggleTag = (tag: EmotionTag) => {
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
