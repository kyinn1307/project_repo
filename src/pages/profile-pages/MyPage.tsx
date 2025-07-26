import { LikePostMenu } from "@/components/ui/profile/LikePostMenu";
export const MyPage = () => {
  return (
    <div className="w-[562.5px] text-white ml-[20%] pt-10 ">
      <div className="flex flex-col gap-[15px] p-[11.25px]">
        <span className="flex h-[26px] items-center font-bold text-[16.5px]">
          좋아요
        </span>
        <LikePostMenu />
      </div>
    </div>
  );
};
