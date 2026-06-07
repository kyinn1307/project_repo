import { useNavigate } from "react-router-dom";
import { Button } from "../shadcn/button";

export const PwResetComplete = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-white text-xl font-medium">비밀번호 재설정 완료</div>
      <div className="text-[#777777] text-base font-medium">
        로그인을 완료해주세요
      </div>

      <Button
        className="mt-6 w-[350px] h-10 bg-[#0050ef] text-white text-xl font-normal cursor-pointer"
        onClick={() => navigate("/")}
      >
        확인
      </Button>
    </>
  );
};
