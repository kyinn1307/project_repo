import { useState } from "react";

import { FindIdForm } from "@/components/ui/authSet/FindIdForm";
import { postFindId } from "@/apis/login";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SetaLogo from "@/assets/SetaLogo";
export default function FindIdPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [foundEmail, setFoundEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isPhoneNumberValid = /^\d{10,11}$/.test(phoneNumber);

  const handleSubmit = async () => {
    if (!isPhoneNumberValid) {
      setErrorMessage("숫자만 입력해주세요.");
      return;
    }

    try {
      const res = await postFindId(phoneNumber);
      const email = res.data?.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] ?? "";
      console.log(email);
      setFoundEmail(email);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage("아이디를 찾을 수 없습니다.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[300px] gap-[30px]">
      <div className="w-[67.24px] h-[60px]" onClick={() => navigate("/")}>
        <SetaLogo />
      </div>

      <div className="w-[300px] rounded-[7.5px] bg-[#222222] py-[30px] px-[18.75px] box-border">
        {submitted ? (
          <div className="flex flex-col gap-[3px]">
            <span className="text-[15px] font-medium text-white">
              이메일 찾기 완료
            </span>
            <span className="text-xs text-[#777777]">회원님의 이메일은</span>
            <div className="flex flex-row text-xs">
              <span className="text-white text-xs font-medium">
                {foundEmail}
              </span>
              <span className="text-[#777777] text-sm font-medium">입니다</span>
            </div>
            <Button
              className="bg-[#0050ef] text-white font-normal text-[15px] mt-[15px] cursor-pointer rounded-[3.75px]"
              onClick={() => navigate("/auth")}
            >
              로그인하기
            </Button>
          </div>
        ) : (
          <FindIdForm
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            isPhoneNumberValid={isPhoneNumberValid}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
}
