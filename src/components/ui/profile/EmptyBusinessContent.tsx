import { SetaBusinessLogo } from "@/assets/SetaBusinessLogo";
import { useNavigate } from "react-router-dom";

export const EmptyBusinessContent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/business-setting");
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-[67.24px] h-15">
        <SetaBusinessLogo />
      </div>

      <div
        className="text-xs mt-[22.5px] underline cursor-pointer"
        onClick={handleClick}
      >
        비즈니스 설정하기
      </div>
    </div>
  );
};
