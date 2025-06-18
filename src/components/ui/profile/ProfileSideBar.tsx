import { Card, CardContent } from "@/components/ui/card";
import { ProfileEditModal } from "./ProfileEditModal";
import { YoutubeIcon } from "@/assets/Icons/profile-sidebar/YoutubeIcon";
import junseo from "@/assets/Images/junseo_lee.png";
import { EmailIcon } from "@/assets/Icons/profile-sidebar/EmailIcon";
import { MusicIcon } from "@/assets/Icons/MusicIcon";
import { InstagramIcon } from "@/assets/Icons/profile-sidebar/InstagramIcon";

export function ProfileSideBar() {
  return (
    <Card className="w-[300px] rounded-[15px] bg-[#111] text-white border-none ">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-[75px] h-[75px] rounded-full overflow-hidden mb-[30px]">
          <img
            src={junseo}
            alt="이준서 군"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex w-full justify-between items-center mb-5">
          <span className="text-xl font-bold">makit</span>
          <ProfileEditModal />
        </div>

        <div className="w-full flex flex-col gap-[4.5px] text-[9px] text-gray-400 mb-4">
          <div className="flex flex-row gap-[7.5px] text-[#ffffff]">
            <span>ⓘ</span>믹싱, 보컬
          </div>
          <div className="flex flex-row items-center h-[11px] text-[#ffffff] gap-[7.5px]">
            <MusicIcon />
            hiphop, kpop
          </div>
          <div className="flex flex-row gap-[7.5px] h-[11px] items-center">
            <EmailIcon />
            <a
              href="mailto:makit@makit.com"
              className="text-[#0050EF] underline"
            >
              makit@makit.com
            </a>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[15px]">
          <div className="text-[10.5px] text-[#555555]">정보</div>
          <div className="flex flex-col gap-[7.5px] text-[#777777] mb-[22.5px]">
            {["팔로워", "팔로잉", "음원", "게시물"].map((item) => (
              <div key={item} className="flex flex-row justify-between">
                <div
                  className={`text-[10.5px] ${
                    item === "팔로워" || item === "팔로잉"
                      ? "cursor-pointer"
                      : ""
                  }`}
                >
                  {item}
                </div>
                <div className="text-[10.5px]">0</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4 text-[10.5px]">
          <span className="text-[#555555]">링크</span>
          <div className="flex flex-col gap-[7.5px] mt-[15px]">
            <div className="flex flex-row items-center gap-2 text-[#777777]">
              <InstagramIcon />
              <span className="cursor-pointer">Instagram</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-[#777777]">
              <YoutubeIcon />
              <span className="cursor-pointer">YouTube</span>
            </div>
          </div>
        </div>

        <div className="w-full text-[10.5px]">
          <span className="text-[#555555]">소개</span>
          <div className="flex flex-col gap-[22.5px]">
            <p className="text-[9px] text-[#777777] mt-[15px]">
              안녕하세요 저는 도봉구에 사는 켄드릭라마입니다. 편하게 연락주세요.
              카톡은 잘 안봐요zzz...
            </p>
            <div className="text-[#0050EF] mt-1 cursor-pointer">더보기</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
