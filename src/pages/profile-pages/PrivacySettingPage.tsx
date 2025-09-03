import { getMyProfile } from "@/apis/my-profile";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/types/my-profile";
import { InfoIcon } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PrivacySettingPage = () => {
  const userId = useUserStore.getState().userId;
  const navigate = useNavigate();
  const [info, setInfo] = useState<Profile | null>(null);

  // 마이 프로필 정보 조회
  const handleMyProfile = async () => {
    if (userId === null) {
      console.log("userId가 없습니다.");
      return;
    }

    try {
      const res = await getMyProfile(userId);
      console.log(res.data.data);
      setInfo(res.data.data);
    } catch (err) {
      console.log("조회 실패.", err);
    }
  };

  useEffect(() => {
    handleMyProfile();
  }, []);

  return (
    <div className="flex flex-col w-[562.5px] text-white ml-[20%] pt-10 gap-[15px]">
      <div className="text-[16.5px] font-bold">개인정보관리</div>
      <div className="flex flex-col bg-[#111111] rounded-[3.75px] py-[15px] px-[11.25px] text-[10.5px] font-medium gap-[22.5px]">
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row gap-[7.5px] items-center">
            이메일
            <InfoIcon size={11.25} />
          </span>
          <div className="flex items-center w-[300px] h-[21px] border-[0.75px] px-[6px] text-[#999999] border-[#999999] rounded-[3.75px] gap-[7.5px]">
            <Mail size={15} className="text-white" />
            {info?.email}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row gap-[7.5px] items-center">
            전화번호
            <InfoIcon size={11.25} className="text-white" />
          </span>
          <div className="flex items-center w-[300px] h-[21px] px-[6px] text-[#999999] border-[0.75px] border-[#999999] rounded-[3.75px] gap-[7.5px]">
            <Phone size={15} />
            {info?.phoneNumber}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between bg-[#111111] rounded-[3.75px] py-[15px] px-[11.25px] text-[10.5px] font-medium">
        <span className="flex flex-row gap-[7.5px] items-center">
          비밀번호
          <InfoIcon size={11.25} />
        </span>
        <span
          className="text-[10.5px] text-[#0050ef] cursor-pointer"
          onClick={() => {
            navigate("/auth/pw");
          }}
        >
          재설정하기
        </span>
      </div>
    </div>
  );
};
