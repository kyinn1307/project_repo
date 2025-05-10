import { AvatarDemo } from "../common/AvatarDemo";
import sample_post from "@/assets/Images/post_thumbnail.png";
import { Heart } from "lucide-react";
import { ChevronDown } from "lucide-react";
export const PostItem = () => {
  return (
    <div className="w-full p-3 flex flex-col gap-[15px] rounded-[15px] bg-[#111] mb-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-[15px] items-center text-[15px]">
          <AvatarDemo />
          <span className="">Makit</span>
          <span className="text-[#777777]">3일</span>
        </div>

        <div className="flex justify-center">
          <img
            src={sample_post}
            alt="포스트 썸네일"
            className="w-[225px] h-[225px]"
          />
        </div>

        <div className="flex flex-row justify-between">
          <span className="flex flex-row gap-2 items-center text-[13.5px] text-[#777777]">
            <Heart size={13.5} /> 2.1만명
          </span>
          <div className="flex flex-row gap-2 items-center text-[#ffffff]">
            <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
              Trap
            </span>
            <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
              HARD BEAT
            </span>
            <span className="h-4 px-1 text-[10.5px] bg-[#555555] rounded-[7.5px]">
              Dark
            </span>
            <span className="text-[#777777]">
              <ChevronDown />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[10.5px] text-[#ffffff]">
        <div className="font-bold">PRAY FOR ME</div>
        <div className="font-regular">
          안녕하세요 오는 9월 20일 저희 팀의 새 싱글 'makit'이 모든 스트리밍
          사이트에서 동시 공개 될 예정입니다. 많은 관심 부탁드려요!:)
        </div>
      </div>
    </div>
  );
};
