import { Search, X } from "lucide-react";
import { useState } from "react";
import JunseoAvatar from "@/assets/Images/hmson.png";

const dummyMembers = [
  {
    id: 1,
    name: "선택된 유저",
    avatar: JunseoAvatar,
  },
  {
    id: 2,
    name: "선택된 유저",
    avatar: JunseoAvatar,
  },
  {
    id: 3,
    name: "선택된 유저",
    avatar: JunseoAvatar,
  },
];

export const AssignMemberSection = () => {
  const [selectedMembers, setSelectedMembers] = useState(dummyMembers);

  const removeMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="w-full min-h-[164.5px] flex flex-col bg-[#111111] rounded-[3.75px] pt-[7.5px] px-[7.5px] text-white">
      <div className="text-[10.5px] font-medium mb-[7.5px]">멤버추가</div>

      {/* 검색 바 */}
      <div className="w-[247.5px] h-[25.5px] flex items-center bg-[#1b1b1b] rounded-full px-3 border border-[#333]">
        <Search size={14} className="text-[#777]" />
        <input
          type="text"
          className="ml-2 w-full bg-transparent text-[10.5px] font-medium 
                     placeholder:text-[#777] placeholder:font-medium 
                     placeholder:text-[10.5px] caret-white focus:outline-none"
          placeholder="검색"
        />
      </div>

      {/* 선택된 멤버 리스트 */}
      <div className="flex flex-row gap-[15px] mt-[15px]">
        {selectedMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center relative w-[52px]"
          >
            {/* 프로필 이미지 */}
            <img
              src={member.avatar}
              alt={member.name}
              className="w-[52px] h-[52px] rounded-full object-cover"
            />

            {/* 삭제 버튼 (오른쪽 위) */}
            <button
              onClick={() => removeMember(member.id)}
              className="absolute top-0 right-0 bg-black rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white"
            >
              <X size={10} className="text-white" />
            </button>

            {/* 이름 */}
            <div className="mt-[5px] text-[10.5px] text-center">
              {member.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
