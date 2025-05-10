import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { YoutubeIcon } from "@/assets/Icons/YoutubeIcon";
import junseo from "@/assets/Images/junseo_lee.png";

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
          <Button
            variant="secondary"
            className="w-[70px] h-[20px] rounded-[3.75px] text-sm text-white bg-[#555555] cursor-pointer"
          >
            프로필편집
          </Button>
        </div>

        <div className="w-full flex flex-col gap-[10px] text-sm text-gray-400 mb-4">
          <div className="text-[#ffffff]">ⓘ 믹싱, 보컬</div>
          <div className="text-[#ffffff]">🎵 힙합, 팝</div>
          <a href="mailto:makit@makit.com" className="text-[#0050EF] underline">
            makit@makit.com
          </a>
        </div>

        <div className="w-full flex flex-col gap-5 mb-1">
          <div className="text-sm text-[#555555]">정보</div>
          <div className="flex flex-col gap-[10px] text-[#777777] mb-4">
            {["팔로워", "팔로잉", "음원", "게시물"].map((item) => (
              <div key={item} className="flex flex-row justify-between">
                <div
                  className={`text-xs ${
                    item === "팔로워" || item === "팔로잉"
                      ? "underline cursor-pointer"
                      : ""
                  }`}
                >
                  {item}
                </div>
                <div className="text-xs">0</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-4">
          <span className="text-sm text-[#555555]">링크</span>
          <div className="flex flex-row items-center gap-2 mt-4 text-[#777777]">
            <YoutubeIcon />
            <span className="cursor-pointer">YouTube</span>
          </div>
        </div>

        <div className="w-full">
          <span className="text-sm text-[#555555]">소개</span>
          <div className="flex flex-col gap-5">
            <p className="text-xs text-[#777777] mt-1">
              안녕하세요 저는 도봉구에 사는 켄드릭라마입니다. 편하게 연락주세요.
              카톡은 잘 안봐요zzz...
            </p>
            <div className="text-sm text-[#0050EF] mt-1 cursor-pointer">
              더보기
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
