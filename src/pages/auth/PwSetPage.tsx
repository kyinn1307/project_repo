import { useState } from "react";
import { AxiosError } from "axios";
import SetaLogo from "@/assets/SetaLogo";
import { FindPwForm } from "@/components/ui/authSet/FindPwForm";
import { PwResetForm } from "@/components/ui/authSet/PwResetForm";
import { SendEmailLinkForm } from "@/components/ui/authSet/SendEmailLinkForm";
import axiosInstance from "@/apis/axiosInstance";
import { PwResetComplete } from "@/components/ui/authSet/PwResetComplete";

export default function PwSetPage() {
  const [step, setStep] = useState<"email" | "sent" | "reset" | "complete">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

  const handleEmailSubmit = async () => {
    setEmailTouched(true);
    setErrorMessage("");

    if (!isEmailValid) {
      setErrorMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/password-reset", { email });
      if (res.status === 200) {
        setStep("sent");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setErrorMessage(
        axiosErr.response?.data?.message || "전송에 실패했습니다."
      );
    }
  };

  const handlePasswordReset = async (
    password: string,
    confirmPassword: string
  ) => {
    try {
      const res = await axiosInstance.post("/auth/password-reset/confirm", {
        email,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        setStep("complete");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "비밀번호 변경 실패");
    }
  };

  return (
    <div className="flex flex-col items-center w-[400px] gap-10">
      <SetaLogo />
      <div className="w-[400px] rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
        {step === "email" && (
          <FindPwForm
            email={email}
            setEmail={setEmail}
            emailTouched={emailTouched}
            isEmailValid={isEmailValid}
            onSubmit={handleEmailSubmit}
            errorMessage={errorMessage}
          />
        )}
        {step === "sent" && (
          <SendEmailLinkForm email={email} onConfirm={() => setStep("reset")} />
        )}
        {step === "reset" && <PwResetForm onSubmit={handlePasswordReset} />}
        {step === "complete" && <PwResetComplete />}
      </div>
    </div>
  );
}
