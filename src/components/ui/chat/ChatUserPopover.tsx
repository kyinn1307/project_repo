import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFollowingList } from "@/apis/follower";
import { Follower } from "@/types/follower";
import sample from "@/assets/Images/hmson.png";
import { ChatUserCheckIcon } from "@/assets/Icons/chat/ChatUserCheckIcon";
import { Search, X } from "lucide-react";
import { Button } from "../button";

interface UserListPopoverProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser: (userId: number) => void;
}

export const UserListPopover = ({
  children,
  open,
  onOpenChange,
  onSelectUser,
}: UserListPopoverProps) => {
  const [users, setUsers] = useState<Follower[]>([]);

  useEffect(() => {
    if (!open) return;
    const fetchUsers = async () => {
      try {
        const res = await getFollowingList(1); // 전체 유저 API
        console.log(res.data.data);
        setUsers(res.data.data);
      } catch (err) {
        console.error("유저 목록 불러오기 실패", err);
      }
    };

    fetchUsers();
  }, [open]);

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
          <input className="w-full h-full pl-[30px] flex items-center text-[13.5px] rounded-full border border-[#777777] text-[#777777] focus:outline-none focus:ring-0 focus:border-[#777777]" />
          <Search
            size={18}
            className="absolute left-[15px] top-1/2 transform -translate-y-1/2 text-[#777777]"
          />
        </div>
        {users.map((user) => (
          <div
            key={user.userId}
            className="flex flex-row items-center p-[7.5px] justify-between hover:bg-[#0050EF]/20 cursor-pointer"
          >
            <div className="flex flex-row items-center gap-[7.5px]">
              <img
                src={sample}
                className="h-[25.5px] w-[25.5px] rounded-full object-cover"
              />
              <div
                className="cursor-pointer py-[4.25px] text-[13.5px] font-medium"
                onClick={() => {
                  onSelectUser(user.userId);
                  onOpenChange(false);
                }}
              >
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
