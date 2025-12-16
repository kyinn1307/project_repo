import { UserProfileMenu } from "@/components/ui/profile/UserProfileMenu";
import { UserProfileSidebar } from "@/components/ui/profile/UserProfileSideBar";

export default function UserProfilePage() {
  return (
    <div className="flex-1 flex-col items-center text-white pt-[30px]">
      <div className="flex flex-row gap-[100px] px-[10%] mt-6">
        <UserProfileMenu />
        <UserProfileSidebar />
      </div>
    </div>
  );
}
