import { ProfileMenu } from "@/components/ui/profile/ProfileMenu";
import { ProfileSideBar } from "@/components/ui/profile/ProfileSideBar";

export default function MyProfilePage() {
  return (
    <div className="w-full flex flex-col items-center text-white ">
      <div className="w-full">
        <div className="max-w-[1290px] h-[150px] bg-[#222222] text"></div>
      </div>
      <div className="flex flex-row gap-[100px] px-[10%] mt-[31px]">
        <ProfileMenu />
        <ProfileSideBar />
      </div>
    </div>
  );
}
