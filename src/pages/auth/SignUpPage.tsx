import { useState } from "react";
import SetaLogo from "@/assets/SetaLogo";
import { TermsStep } from "@/components/ui/signup/TermsStep";
import { EmailStep } from "@/components/ui/signup/EmailStep";
import { EmailAuthStep } from "@/components/ui/signup/EmailAuthStep";
import { PasswordStep } from "@/components/ui/signup/PasswordStep";
import { NumberStep } from "@/components/ui/signup/NumberStep";
import { NicknameStep } from "@/components/ui/signup/NicknameStep";
import FieldGenreSelector from "@/components/ui/signup/FieldGenreSelector";

export default function SignUpPage() {
  // 회원가입 단계 상태
  const [step, setStep] = useState<
    | "terms"
    | "email"
    | "emailAuth"
    | "password"
    | "nickname"
    | "number"
    | "field"
  >("terms");
  // 마지막 회원가입 api 요청용 email
  const [email, setEmail] = useState("");
  // 인증번호 timer 상태
  const [timer, setTimer] = useState("");

  return (
    <div className="flex flex-col items-center w-[300px] gap-[30px]">
      {/* 세타 로고 */}
      <div className="relative w-[89.66px] h-20">
        <SetaLogo />
      </div>
      {/* 회원가입 입력폼 */}
      <div className="relative flex flex-col w-100 rounded-[10px] bg-[#222222] py-10 px-[25px] box-border gap-10">
        {/* 약관 동의 단계 */}
        {step === "terms" && <TermsStep onNext={() => setStep("email")} />}

        {/* 이메일 입력 단계 */}
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
