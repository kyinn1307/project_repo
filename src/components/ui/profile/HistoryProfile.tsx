import { getUserProfile } from "@/apis/user";
import { AtSignIcon } from "@/assets/Icons/AtSignIcon";
import { InfoIcon } from "@/assets/Icons/InfoIcon";
import { MusicIcon } from "@/assets/Icons/MusicIcon";

import { Profile } from "@/types/my-profile";
import { useEffect, useState } from "react";

export const HistoryProfile = ({ userId }: { userId: number }) => {
  const [info, setInfo] = useState<Profile | null>(null);

  // 마이 프로필 정보 조회
  const handleUserProfile = async () => {
    if (userId === null) {
      console.log("userId가 없습니다.");
      return;
    }

    try {
      const res = await getUserProfile(userId);
      console.log(res.data.data);
      setInfo(res.data.data);
    } catch (err) {
      console.log("조회 실패.", err);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  return (
    <div className="w-full box-border px-[30px] py-[15px] flex flex-row gap-[37.5px] rounded-[15px] bg-[#111111]">
      <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
        {info?.profileImageUrl && (
          <img
            src={info.profileImageUrl}
            alt="유저 프로필"
            className={`w-full h-full object-cover`}
          />
        )}
      </div>

      <div className="flex flex-col gap-[15px]">
        <div className="text-[15px] text-[#ffffff] font-bold leading-[19px]">
          {info?.nickname}
        </div>
        <div className="flex flex-col gap-[4.5px] text-[9px] leading-[11.25px]">
          <span className="flex flex-row items-center gap-[7.5px]">
            <InfoIcon />
            {info?.fields.join(", ")}
          </span>
          <span className="flex flex-row items-center gap-[7.5px]">
            <MusicIcon />
            {info?.genres.join(", ")}
          </span>
          <span className="flex flex-row items-center gap-[7.5px]">
            <AtSignIcon />
            <a
              href="mailto:makit@makit.com"
              className="text-[#0050EF] underline"
            >
              {info?.email}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
