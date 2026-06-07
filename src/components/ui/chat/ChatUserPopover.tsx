import { useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { getFollowingList } from "@/apis/follower";
import { Follower } from "@/types/follower";
import sample from "@/assets/Images/sample-musician.png";
import { ChatUserCheckIcon } from "@/assets/Icons/chat/ChatUserCheckIcon";
import { Search, X } from "lucide-react";
import { Button } from "../shadcn/button";
import { useQuery } from "@tanstack/react-query";

interface UserListPopoverProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser: (userId: number) => void;
  userId: number;
}

export const UserListPopover = ({
  children,
  open,
  onOpenChange,
  onSelectUser,
  userId,
}: UserListPopoverProps) => {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  // 입력 디바운스
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data: users = [] } = useQuery<Follower[]>({
    queryKey: ["chat", "following", { open }],
    queryFn: async () => {
      const res = await getFollowingList(userId);
      return res.data.data as Follower[];
    },
    enabled: open,
    staleTime: 60_000,
  });

  const filtered = useMemo(() => {
    if (!debouncedQ) return users;
    const lower = debouncedQ.toLowerCase();
    return users.filter((u) => u.nickname?.toLowerCase().includes(lower));
  }, [users, debouncedQ]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-70 bg-[#222222] text-white rounded-[3.75px] p-[9px] border-none">
        <div className="flex justify-end mb-[15px]">
          <X
            size={18}
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          />
        </div>
        <div className="relative px-[7.5px] h-[25.5px] mb-[37.5px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="닉네임 검색"
            className="w-full h-full pl-[30px] flex items-center text-[13.5px] rounded-full border border-[#777777] text-white focus:outline-none focus:ring-0 focus:border-[#777777]"
          />
          <Search
            size={18}
            className="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-[#777777]"
          />
        </div>
        {filtered.map((user) => (
          <div
            key={user.userId}
            className="flex flex-row items-center p-[7.5px] justify-between hover:bg-[#0050EF]/20 cursor-pointer"
            onClick={() => {
              onSelectUser(user.userId);
              onOpenChange(false);
            }}
          >
            <div className="flex flex-row items-center gap-[7.5px]">
              <img
                src={sample}
                className="h-[25.5px] w-[25.5px] rounded-full object-cover"
              />
              <div className="cursor-pointer py-[4.25px] text-[13.5px] font-medium">
                {user.nickname}
              </div>
            </div>
            <div>
              <ChatUserCheckIcon />
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-[6px] px-[7.5px]">
          <Button className="flex h-[22.5px] px-[18.5px] text-xs font-medium rounded-full items-center bg-[#0050ef] text-white cursor-pointer">
            다음
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
