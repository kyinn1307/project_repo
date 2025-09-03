import { useState, useEffect } from "react";
import sample from "@/assets/Images/hmson.png";
import { useUserStore } from "@/stores/useUserStore";
import { ExternalLink } from "lucide-react";
import { getUserProfile } from "@/apis/user";
import { Profile } from "@/types/my-profile";
import { UserListPopover } from "./ChatUserPopover";

interface ChatRoomHeaderProps {
  onSelectUser: (opponentId: number) => void;
}

export const ChatRoomHeader = ({ onSelectUser }: ChatRoomHeaderProps) => {
  const { userId } = useUserStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const data = await getUserProfile(userId);
        console.log(data.data.data);
        setProfile(data.data.data);
      } catch (err) {
        console.error("프로필 불러오기 실패", err);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="w-full flex flex-row justify-between mb-[7.5px] pt-[22.5px] px-[7.5px] pb-[7.5px] text-[18px] font-medium gap-[71.25px] border-b border-white">
      <div className="flex flex-row items-center h-[30px] gap-[7.5px] object-cover">
        <img
          src={profile?.profileImageUrl || sample}
          className="w-[30px] h-[30px] rounded-full"
        />
        <span>{profile?.nickname}</span>
      </div>
      {/* ✅ Popover로 유저 리스트 열기 */}
      <UserListPopover
        open={open}
        onOpenChange={setOpen}
        onSelectUser={onSelectUser}
      >
        <ExternalLink size={22.5} className="cursor-pointer" />
      </UserListPopover>
    </div>
  );
};
