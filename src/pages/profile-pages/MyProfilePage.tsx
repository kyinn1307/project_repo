import { ProfileMenu } from "@/components/ui/profile/ProfileMenu";
import { ProfileSideBar } from "@/components/ui/profile/ProfileSideBar";

export default function MyProfilePage() {
  return (
    <div className="flex-1 flex-col items-center text-white pt-[30px]">
      <div className="flex flex-row gap-[100px] px-[10%] mt-6">
        <ProfileMenu />
        <ProfileSideBar />
      </div>
    </div>
  );
}
