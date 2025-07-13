import { useState } from "react";
import SetaLetterLogo from "@/assets/SetaLogo";
import { TermsStep } from "@/components/ui/signup/TermsStep";
import { EmailStep } from "@/components/ui/signup/EmailStep";
import { EmailAuthStep } from "@/components/ui/signup/EmailAuthStep";
import { PasswordStep } from "@/components/ui/signup/\bPasswordStep";
import { NumberStep } from "@/components/ui/signup/NumberStep";
import { NicknameStep } from "@/components/ui/signup/NicknameStep";
import FieldGenreSelector from "@/components/ui/signup/FieldGenreSelector";

export default function SignUpPage() {
  const [step, setStep] = useState<
    | "terms"
    | "email"
    | "emailAuth"
    | "password"
    | "nickname"
    | "number"
    | "field"
  >("terms");

  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState("");

  return (
    <div className="flex flex-col items-center w-[400px] gap-10">
      <div className="relative w-[67.24px] h-15">
        <SetaLetterLogo />
      </div>
      <div className="relative flex flex-col w-[400px] rounded-[10px] bg-[#222222] py-10 px-[25px] box-border gap-10">
        {step === "terms" && <TermsStep onNext={() => setStep("email")} />}
        {step === "email" && (
          <EmailStep
            setTimer={(t) => setTimer(t)}
            onNext={(emailValue) => {
              setEmail(emailValue);
              setStep("emailAuth");
            }}
          />
        )}
        {step === "emailAuth" && (
          <EmailAuthStep
            timer={timer}
            email={email}
            onNext={() => {
              console.log("이메일 인증 완료, 다음 단계로 진행");
              setStep("password");
            }}
          />
        )}
        {step === "password" && (
          <PasswordStep onNext={() => setStep("nickname")} />
        )}
        {step === "nickname" && (
          <NicknameStep onNext={() => setStep("number")} />
        )}
        {step === "number" && <NumberStep onNext={() => setStep("field")} />}
        {step === "field" && (
          <>
            <FieldGenreSelector />
          </>
        )}
      </div>
    </div>
  );
}
