import { getMusicianSearch } from "@/apis/musician";
import { Musician } from "@/types/musician";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AssignMemberSection = () => {
  const [selectedMembers, setSelectedMembers] = useState<Musician[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Musician[]>([]);
  const debounceRef = useRef<number | null>(null);

  const addMember = (u: Musician) => {
    setSelectedMembers((prev) => {
      if (prev.some((m) => m.id === u.id)) return prev;
      return [...prev, u];
    });
    setOpen(false);
  };

  const removeMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const data = await getMusicianSearch({ nickname: q, size: 10 });
        setResults(data.users ?? []);
        setOpen(true);
      } catch (e) {
        console.error(e);
        setResults([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300) as unknown as number;

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [q]);

  return (
    <div className="w-full min-h-[164.5px] flex flex-col bg-[#111111] rounded-[3.75px] pt-[7.5px] px-[7.5px] text-white">
      <div className="text-[10.5px] font-medium mb-[7.5px]">멤버추가</div>

      {/* 검색 바 */}
      <div className="relative w-[247.5px] h-[25.5px] flex items-center bg-[#1b1b1b] rounded-full px-3 border border-[#333]">
        <Search size={14} className="text-[#777]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          className="ml-2 w-full bg-transparent text-[10.5px] font-medium 
                     placeholder:text-[#777] placeholder:font-medium 
                     placeholder:text-[10.5px] caret-white focus:outline-none"
          placeholder="검색"
        />
        {open && (
          <div className="absolute top-5 z-10 mt-2 w-full max-h-40 overflow-auto rounded-[7px] border border-[#333] bg-[#1b1b1b]">
            {loading ? (
              <div className="p-3 text-[10.5px] text-[#aaa]">검색중…</div>
            ) : results.length === 0 ? (
              <div className="p-3 text-[10.5px] text-[#aaa]">
                검색 결과가 없어요
              </div>
            ) : (
              results.map((u) => (
                <button
                  key={u.id}
                  onClick={() => addMember(u)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-[#222]"
                >
                  <img
                    src={u.profileImageUrl || ""}
                    alt={u.nickname}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-[10.5px]">{u.nickname}</span>
                </button>
              ))
            )}
          </div>
        )}
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
              src={member.profileImageUrl || ""}
              alt={member.nickname}
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
              {member.nickname}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
