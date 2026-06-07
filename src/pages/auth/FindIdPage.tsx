import { useState } from "react";

import { FindIdForm } from "@/components/ui/authSet/FindIdForm";
import { postFindId } from "@/apis/login";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
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
    <div className="flex flex-col items-center w-100 gap-10">
      <div className="w-[89.66px] h-20" onClick={() => navigate("/")}>
        <SetaLogo />
      </div>

      <div className="w-100 rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
        {submitted ? (
          <div className="flex flex-col gap-1">
            <span className="text-xl font-medium text-white">
              이메일 찾기 완료
            </span>
            <span className="text-base font-medium text-[#777777]">
              회원님의 이메일은
            </span>
            <div className="flex flex-row">
              <span className="text-white text-base font-medium">
                {foundEmail}
              </span>
              <span className="text-[#777777] text-base font-medium">
                입니다
              </span>
            </div>
            <Button
              className="h-10 bg-[#0050ef] text-white font-normal text-xl mt-5 cursor-pointer rounded-[5px]"
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
