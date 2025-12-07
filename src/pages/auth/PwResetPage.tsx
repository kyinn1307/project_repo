import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
import SetaLogo from "@/assets/SetaLogo";
import { PwResetForm } from "@/components/ui/authSet/PwResetForm";
import { PwResetComplete } from "@/components/ui/authSet/PwResetComplete";

export default function PasswordResetPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<"reset" | "complete">("reset");

  const handlePasswordReset = async (
    password: string,
    confirmPassword: string
  ) => {
    try {
      const res = await axiosInstance.post(
        `/reset/updatePassword`,
        {
          password,
          confirmPassword,
        },
        {
          params: {
            token: token,
          },
        }
      );

      if (res.status === 200) {
        setStep("complete");
      }
    } catch (err) {
      console.log("에러 발생", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-[400px] gap-[30px]">
      <div className="w-[89.66px] h-[80px]" onClick={() => navigate("/")}>
        <SetaLogo />
      </div>

      <div className="w-100 rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
        {step === "reset" && (
          <PwResetForm onSubmit={(pw, cpw) => handlePasswordReset(pw, cpw)} />
        )}

        {step === "complete" && <PwResetComplete />}
      </div>
    </div>
  );
}
