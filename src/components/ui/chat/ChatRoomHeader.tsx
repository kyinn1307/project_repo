import { useState } from "react";
import sample from "@/assets/Images/hmson.png";
import { useUserStore } from "@/stores/useUserStore";
import { ExternalLink } from "lucide-react";
import { getUserProfile } from "@/apis/user";
import { Profile } from "@/types/my-profile";
import { UserListPopover } from "./ChatUserPopover";
import { useQuery } from "@tanstack/react-query";

interface ChatRoomHeaderProps {
  onSelectUser: (opponentId: number) => void;
}

export const ChatRoomHeader = ({ onSelectUser }: ChatRoomHeaderProps) => {
  const { userId } = useUserStore();
  const [open, setOpen] = useState(false);

  const { data: profile } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await getUserProfile(userId!);
      return res.data.data as Profile;
    },
    enabled: !!userId,
    staleTime: 60_000,
  });

  return (
    <div className="w-full flex flex-row justify-between mb-[7.5px] pt-[22.5px] px-[7.5px] pb-[7.5px] text-[18px] font-medium gap-[71.25px] border-b border-white">
      <div className="flex flex-row items-center h-[30px] gap-[7.5px] object-cover">
        <img
          src={profile?.profileImageUrl || sample}
          className="w-[30px] h-[30px] rounded-full"
        />
        <span>{profile?.nickname}</span>
      </div>

      <UserListPopover
        open={open}
        onOpenChange={setOpen}
        onSelectUser={onSelectUser}
        userId={userId || 0}
      >
        <ExternalLink size={22.5} className="cursor-pointer" />
      </UserListPopover>
    </div>
  );
};
