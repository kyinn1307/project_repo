import { useState } from "react";
import SetaLetterLogo from "@/assets/SetaLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import GoogleBtn from "@/assets/GoogleBtn";
import VerificationCodeInput from "@/components/ui/signup/VerificationCodeInput";
import { PasswordBtn } from "@/assets/PasswordBtn";
import FieldGenreSelector from "@/components/ui/signup/FieldGenreSelector";
import { postTerms } from "@/apis/signup";
import { sendEmailCode } from "@/apis/email";
import { validateAuthCode } from "@/apis/email";
import { resendEmailCode } from "@/apis/email";
import axios from "axios";

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

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    age: false,
    tos: false,
    privacy: false,
    policy: false,
    marketing: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const isNicknameValid =
    /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{2,20}$/.test(nickname);
  const [phoneNumber, setPhoneNumber] = useState("");
  const isPhoneNumberValid = /^\d{10,11}$/.test(phoneNumber);

  const isPasswordValid =
    password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const doPasswordsMatch = password === confirmPassword;
  const isPasswordStepValid = isPasswordValid && doPasswordsMatch;
  const [emailTouched, setEmailTouched] = useState(false);
  const [authCode, setAuthCode] = useState("");

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

  const showEmailError = emailTouched && (email === "" || !isEmailValid);

  const isAllRequiredChecked =
    checkedItems.age &&
    checkedItems.tos &&
    checkedItems.privacy &&
    checkedItems.policy;

  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setCheckedItems({
      age: newState,
      tos: newState,
      privacy: newState,
      policy: newState,
      marketing: newState,
    });
  };

  const handleItemCheck = (key: keyof typeof checkedItems) => {
    const newState = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newState);
    const allTrue = Object.values(newState).every(Boolean);
    setAllChecked(allTrue);
  };

  return (
    <div className="flex flex-col items-center w-[400px] gap-10">
      <div className="relative">
        <SetaLetterLogo />
      </div>
      <div className="relative flex flex-col w-[400px] rounded-[10px] bg-[#222222] py-10 px-[25px] box-border gap-10">
        {step === "terms" && (
          <>
            <div className="text-white text-[18px] font-medium ml-4">
              약관 동의
            </div>
            <div>
              <div className="flex flex-row gap-[10px] ml-4">
                <Input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={allChecked}
                  onChange={handleAllCheck}
                />
                <div className="text-white text-[14px]">전체동의</div>
              </div>
              <Separator className="bg-white h-px w-[350px] my-5" />
              <div className="flex flex-col gap-[10px] ml-4">
                {[
                  { key: "age", label: "[필수] 만 14세 이상" },
                  { key: "tos", label: "[필수] 서비스 이용약관" },
                  { key: "privacy", label: "[필수] 개인정보 수집 및 이용" },
                  { key: "policy", label: "[필수] 개인정보처리방침" },
                  {
                    key: "marketing",
                    label: "[선택] 개인정보 수집 및 이용(이벤트)",
                  },
                ].map(({ key, label }) => (
                  <div key={key} className="flex flex-row gap-[10px]">
                    <Input
                      type="checkbox"
                      className="w-5 h-5 rounded"
                      checked={checkedItems[key as keyof typeof checkedItems]}
                      onChange={() =>
                        handleItemCheck(key as keyof typeof checkedItems)
                      }
                    />
                    <div className="text-white text-[14px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className="mt-3 w-[350px] h-10 bg-[#0050ef] text-white text-sm cursor-pointer"
              disabled={!isAllRequiredChecked}
              onClick={async () => {
                try {
                  await postTerms({
                    isOver14: checkedItems.age,
                    termsOfService: checkedItems.tos,
                    privacyConsent: checkedItems.privacy,
                    privacyPolicy: checkedItems.policy,
                    optionalPrivacyConsent: checkedItems.marketing,
                  });
                  console.log("약관동의 성공");
                  setStep("email");
                } catch (error) {
                  console.error("약관 동의 실패:", error);
                }
              }}
            >
              다음
            </Button>
          </>
        )}

        {step === "email" && (
          <div>
            <div className="text-white text-[20px] font-bold">
              Start Ego, it’s Time to Awake up
            </div>
            <div className="text-white text-base font-medium mt-1">
              당신의 음악, SETA와 함께
            </div>
            <div className="flex flex-col mt-10">
              <Label htmlFor="email" className="text-white text-xs">
                이메일
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className={cn(
                  "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
                  showEmailError
                    ? "border-red-500"
                    : emailTouched && isEmailValid
                    ? "border-[#0050ef]"
                    : "border-[#555555]",
                  "focus:outline-none"
                )}
              />
              {showEmailError && (
                <div className="text-red-500 text-xs mt-1 ml-1">
                  올바른 이메일 주소를 입력하세요
                </div>
              )}
              <Button
                className={cn(
                  "mt-3 w-[350px] h-10 text-sm cursor-pointer",
                  email === ""
                    ? "bg-[#555555] text-[#777777]"
                    : "bg-[#0050ef] text-white"
                )}
                disabled={email === ""}
                onClick={async () => {
                  setEmailTouched(true);
                  if (isEmailValid) {
                    try {
                      console.log("인증번호를 이메일로 보냈습니다");
                      await sendEmailCode(email);
                      setStep("emailAuth");
                    } catch (error) {
                      console.error("이메일 전송 실패:", error);
                    }
                  }
                }}
              >
                다음
              </Button>
            </div>
            <div className="flex flex-row items-center gap-2 mt-9 mb-5">
              <div className="w-[155px] border-t border-white" />
              <span className="text-white text-xs">또는</span>
              <div className="w-[155px] border-t border-white" />
            </div>
            <div className="mb-8 cursor-pointer">
              <GoogleBtn />
            </div>
          </div>
        )}

        {step === "emailAuth" && (
          <>
            <div>
              <div className="text-white text-base font-medium mb-5">
                {email}로
                <br />
                발송된 인증번호를 입력해주세요.
              </div>
              <VerificationCodeInput onComplete={setAuthCode} />
              <div className="flex justify-center items-center text-white text-xs mt-[12.25px]">
                30초
              </div>
              <Button
                className={cn(
                  "mt-3 w-[350px] h-10 text-sm cursor-pointer mt-[4.89px]",
                  authCode.length < 6
                    ? "bg-[#555555] text-[#777777]"
                    : "bg-[#0050ef] text-white"
                )}
                disabled={authCode.length < 6}
                onClick={async () => {
                  try {
                    await validateAuthCode(email, authCode);
                    setStep("password");
                  } catch (error) {
                    console.log("❌ 인증 실패 요청 값:", { email, authCode });

                    if (axios.isAxiosError(error)) {
                      console.error(
                        "❌ 인증 실패:",
                        error.response?.data || error.message
                      );
                      alert(
                        typeof error.response?.data?.message === "string"
                          ? error.response.data.message
                          : "인증에 실패했습니다."
                      );
                    } else {
                      console.error("❌ 예기치 못한 에러:", error);
                      alert("알 수 없는 오류가 발생했습니다.");
                    }
                  }
                }}
              >
                다음
              </Button>

              <div className="flex justify-center items-center text-white text-xs mt-[3px]">
                인증번호를 못받으셨나요?
                <span
                  className="underline cursor-pointer ml-1"
                  onClick={async () => {
                    try {
                      await resendEmailCode(email);
                      alert("인증번호가 다시 발송되었습니다.");
                    } catch (error) {
                      console.error("인증번호 재전송 실패:", error);
                      alert(
                        "인증번호 재전송에 실패했습니다. 잠시 후 다시 시도해주세요."
                      );
                    }
                  }}
                >
                  인증번호 다시 받기
                </span>
              </div>
            </div>
          </>
        )}

        {step === "password" && (
          <>
            <div className="text-white text-base font-medium">
              비밀번호를 입력해주세요.
            </div>
            <div className="flex flex-col">
              {/* 비밀번호 */}
              <div className="flex flex-col">
                <div className="text-xs text-white">비밀번호</div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자리 이상, 특수문자 포함"
                    className={cn(
                      "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm pr-10 border",
                      !isPasswordValid && password !== ""
                        ? "border-red-500"
                        : "border-[#555555]",
                      "focus:outline-none"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <PasswordBtn />
                  </button>
                </div>
                {!isPasswordValid && password !== "" && (
                  <div className="text-red-500 text-xs ml-1 mt-[2px]">
                    8자리 이상, 특수문자를 포함해야 합니다.
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="flex flex-col mt-4">
                <div className="text-xs text-white">비밀번호 확인</div>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className={cn(
                      "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm pr-10 border",
                      confirmPassword !== "" && !doPasswordsMatch
                        ? "border-red-500"
                        : "border-[#555555]",
                      "focus:outline-none"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <PasswordBtn />
                  </button>
                </div>
                {confirmPassword !== "" && !doPasswordsMatch && (
                  <div className="text-red-500 text-xs ml-1 mt-[2px]">
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>

              {/* 다음 버튼 */}
              <Button
                className={cn(
                  "mt-5 w-[350px] h-10 text-sm cursor-pointer",
                  isPasswordStepValid
                    ? "bg-[#0050ef] text-white"
                    : "bg-[#555555] text-[#777777]"
                )}
                disabled={!isPasswordStepValid}
                onClick={() => setStep("nickname")}
              >
                다음
              </Button>
            </div>
          </>
        )}

        {step === "nickname" && (
          <>
            <div className="text-white text-base font-medium">
              닉네임을 입력해주세요.
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-white">닉네임</div>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="2~20자의 닉네임을 입력하세요"
                className={cn(
                  "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
                  nickname !== "" && !isNicknameValid
                    ? "border-red-500"
                    : "border-[#555555]",
                  "focus:outline-none"
                )}
              />
              {nickname !== "" && !isNicknameValid && (
                <div className="text-red-500 text-xs ml-1 mt-[2px]">
                  2~20자의 한글, 영문, 숫자, 특수문자를 사용할 수 있습니다.
                </div>
              )}
              <Button
                className={cn(
                  "mt-5 w-[350px] h-10 text-sm cursor-pointer",
                  isNicknameValid
                    ? "bg-[#0050ef] text-white"
                    : "bg-[#555555] text-[#777777]"
                )}
                disabled={!isNicknameValid}
                onClick={() => setStep("number")}
              >
                다음
              </Button>
            </div>
          </>
        )}

        {step === "number" && (
          <>
            <div className="text-white text-base font-medium">
              전화번호를 입력해주세요.
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-white">전화번호</div>
              <Input
                id="phone-number"
                type="text"
                inputMode="numeric"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="숫자만 입력 (예: 01012345678)"
                className={cn(
                  "mt-1 h-9 w-[350px] bg-[#111111] text-white text-sm border",
                  phoneNumber !== "" && !isPhoneNumberValid
                    ? "border-red-500"
                    : "border-[#555555]",
                  "focus:outline-none"
                )}
              />
              {phoneNumber !== "" && !isPhoneNumberValid && (
                <div className="text-red-500 text-xs ml-1 mt-[2px]">
                  숫자만 입력해주세요 (10~11자리).
                </div>
              )}
              <Button
                className={cn(
                  "mt-5 w-[350px] h-10 text-sm cursor-pointer",
                  isPhoneNumberValid
                    ? "bg-[#0050ef] text-white"
                    : "bg-[#555555] text-[#777777]"
                )}
                disabled={!isPhoneNumberValid}
                onClick={() => setStep("field")}
              >
                다음
              </Button>
            </div>
          </>
        )}

        {step === "field" && (
          <>
            <FieldGenreSelector onSubmit={() => {}} />
          </>
        )}
      </div>
    </div>
  );
}
