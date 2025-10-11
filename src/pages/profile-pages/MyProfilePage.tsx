import { ProfileMenu } from "@/components/ui/profile/ProfileMenu";
import { ProfileSideBar } from "@/components/ui/profile/ProfileSideBar";

export default function MyProfilePage() {
  return (
    <div className="flex-1 flex-col items-center text-white pt-[30px]">
      <div className="w-full">
        <div className="flex-1 h-[150px] bg-[#222222]"></div>
      </div>
      <div className="flex flex-row gap-[100px] px-[10%] mt-[31px]">
        <ProfileMenu />
        <ProfileSideBar />
      </div>
    </div>
  );
}
