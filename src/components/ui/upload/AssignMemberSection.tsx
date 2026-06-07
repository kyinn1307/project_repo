import { getMusicianSearch } from "@/apis/musician";
import { Musician } from "@/types/musician";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlusBtn from "@/assets/Icons/upload/plus-button.svg?react";
import DeleteBtn from "@/assets/Icons/upload/delete-button.svg?react";
import sample from "@/assets/Images/sample-musician.png";
interface MemberInputProps {
  value: Musician[];
  setValue: React.Dispatch<React.SetStateAction<Musician[]>>;
}

export const AssignMemberSection = ({ value, setValue }: MemberInputProps) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Musician[]>([]);
  const debounceRef = useRef<number | null>(null);

  const addMember = (u: Musician) => {
    setValue((prev) => {
      if (prev.some((m) => m.id === u.id)) return prev;
      return [...prev, u];
    });
  };

  const removeMember = (id: number) => {
    setValue((prev) => prev.filter((m) => m.id !== id));
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
    <div className="w-full min-h-[164.5px] flex flex-col bg-[#111111] rounded-[3.75px] py-[7.5px] px-[7.5px] text-white">
      <div className="text-[10.5px] font-medium mb-[7.5px]">멤버추가</div>

      <div className="flex flex-row">
        {/* 검색 바 */}
        <div className="relative w-[247.5px] h-[25.5px] flex items-center bg-[#1b1b1b] rounded-full mb-[7.5px] px-3 border border-[#333]">
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

          <div className="absolute left-0 top-5 z-10 mt-[13.5px] w-full min-h-20 max-h-[90px] overflow-auto border-r border-[#444444] no-scrollbar">
            {open && (
              <>
                {loading ? (
                  <div className="p-3 text-[10.5px] text-[#aaa]">검색중…</div>
                ) : results.length === 0 ? (
                  <div className="p-3 text-[10.5px] text-[#aaa]">
                    검색 결과가 없어요
                  </div>
                ) : (
                  results.map((u) => (
                    <div className="flex flex-row justify-between items-center p-[7.5px] hover:bg-[#222]">
                      <button
                        key={u.id}
                        className="w-full flex items-center gap-[7.5px]"
                      >
                        <img
                          src={u.profileImageUrl || sample}
                          alt={u.nickname}
                          className="w-[25.5px] h-[25.5px] rounded-full object-cover"
                        />
                        <span className="text-[10.5px]">{u.nickname}</span>
                      </button>
                      <div
                        onClick={() => addMember(u)}
                        className="cursor-pointer"
                      >
                        <PlusBtn />
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* 선택된 멤버 리스트 */}
        <div className="flex-1 flex flex-col max-h-24 overflow-auto ml-[7.5px] mt-[33px]">
          {value.map((u) => (
            <div className="flex flex-row justify-between items-center p-[7.5px] ">
              <button
                key={u.id}
                className="w-full flex items-center gap-[7.5px]"
              >
                <img
                  src={u.profileImageUrl || sample}
                  alt={u.nickname}
                  className="w-[25.5px] h-[25.5px] rounded-full object-cover"
                />
                <span className="text-[10.5px]">{u.nickname}</span>
              </button>
              <div
                onClick={() => removeMember(u.id)}
                className="cursor-pointer"
              >
                <DeleteBtn />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
