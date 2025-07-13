import { useState } from "react";
import { AxiosError } from "axios";
import SetaLogo from "@/assets/SetaLogo";
import { FindPwForm } from "@/components/ui/authSet/FindPwForm";
// import { PwResetForm } from "@/components/ui/authSet/PwResetForm";
import { SendEmailLinkForm } from "@/components/ui/authSet/SendEmailLinkForm";
// import axiosInstance from "@/apis/axiosInstance";
import { PwResetComplete } from "@/components/ui/authSet/PwResetComplete";
import { useNavigate } from "react-router-dom";
import { postSendPwLink } from "@/apis/login";

export default function PwSetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "sent" | "reset" | "complete">(
    "email"
  );
  const [email, setEmail] = useState("");
  // const [link, setLink] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

  const handlePwEmailSubmit = async () => {
    setEmailTouched(true);
    setErrorMessage("");

    if (!isEmailValid) {
      setErrorMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const res = await postSendPwLink(email);
      console.log(res.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setErrorMessage(
        axiosErr.response?.data?.message || "전송에 실패했습니다."
      );
    }
  };

  // const handlePasswordReset = async (
  //   email: string,
  //   link: string,
  //   password: string,
  //   confirmPassword: string
  // ) => {
  //   try {
  //     const res = await axiosInstance.post("/auth/password-reset/confirm", {
  //       email,
  //       password,
  //       confirmPassword,
  //     });

  //     if (res.status === 200) {
  //       setStep("complete");
  //     }
  //   } catch (err) {
  //     const axiosErr = err as AxiosError<{ message?: string }>;
  //     alert(axiosErr.response?.data?.message || "비밀번호 변경 실패");
  //   }
  // };

  return (
    <div className="flex flex-col items-center w-[400px] gap-[30px]">
      <div className="w-[89.66px] h-[80px]" onClick={() => navigate("/")}>
        <SetaLogo />
      </div>
      <div className="w-[300px] rounded-[7.5px] bg-[#222222] py-[30px] px-[18.75px] box-border">
        {step === "email" && (
          <FindPwForm
            email={email}
            setEmail={setEmail}
            emailTouched={emailTouched}
            isEmailValid={isEmailValid}
            onSubmit={handlePwEmailSubmit}
            errorMessage={errorMessage}
          />
        )}
        {step === "sent" && (
          <SendEmailLinkForm email={email} onConfirm={() => setStep("reset")} />
        )}
        {/* {step === "reset" && <PwResetForm onSubmit={handlePasswordReset} />} */}
        {step === "complete" && <PwResetComplete />}
      </div>
    </div>
  );
}
