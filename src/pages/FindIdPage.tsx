import { useState } from "react";
import { SetaLetterLogo } from "@/assets/SetaLetterLogo";
import { FindIdForm } from "@/components/ui/authSet/FindIdForm";
import axiosInstance from "@/apis/axiosInstance";

export default function FindIdPage() {
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
      const res = await axiosInstance.post("/auth/find-id", {
        phoneNumber,
      });
      setFoundEmail(res.data.email);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage("아이디를 찾을 수 없습니다.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[400px] gap-10">
      <SetaLetterLogo />
      <div className="w-[400px] rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
        {submitted ? (
          <div className="text-white text-sm">
            가입된 이메일: <span className="font-bold">{foundEmail}</span>
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
