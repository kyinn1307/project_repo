import { useState } from "react";
import { AxiosError } from "axios";
import axiosInstance from "@/apis/axiosInstance";
import SetaLetterLogo from "@/assets/SetaLogo";
import GoogleBtn from "@/assets/GoogleBtn";
import { LoginForm } from "@/components/ui/login/LoginForm";
import { PasswordForm } from "@/components/ui/login/PasswordForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const showEmailError = emailTouched && email !== "" && !isEmailValid;
  const showPasswordError = true;
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      throw axiosErr.response?.data || axiosErr;
    }
  };

  const handleNextClick = () => {
    setEmailTouched(true);
    if (isEmailValid) {
      setShowPasswordInput(true);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setPasswordTouched(true);

    try {
      const data = await login({ email, password });
      console.log("로그인 성공", data);
    } catch (err) {
      const message =
        (err as { message?: string })?.message || "알 수 없는 오류";
      alert(message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[400px] gap-10">
      <SetaLetterLogo />
      <div className="w-[400px] rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
        {!showPasswordInput ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            emailTouched={emailTouched}
            setEmailTouched={setEmailTouched}
            isEmailValid={isEmailValid}
            showEmailError={showEmailError}
            onNext={handleNextClick}
          />
        ) : (
          <PasswordForm
            password={password}
            setPassword={setPassword}
            passwordTouched={passwordTouched}
            togglePassword={togglePassword}
            setPasswordTouched={setPasswordTouched}
            showPassword={showPassword}
            showPasswordError={showPasswordError}
            setShowPassword={setShowPassword}
            handleLogin={handleLogin}
          />
        )}
        {!showPasswordInput && (
          <>
            <div className="flex flex-row justify-center gap-2 mt-3 text-white text-xs">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate("id");
                }}
              >
                아이디 찾기
              </span>
              <span>|</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate("pw");
                }}
              >
                비밀번호 찾기
              </span>
              <span>|</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate("signup");
                }}
              >
                회원가입
              </span>
            </div>

            <div className="flex flex-row items-center gap-2 mt-9 mb-5">
              <div className="w-[155px] border-t border-white" />
              <span className="text-white text-xs">또는</span>
              <div className="w-[155px] border-t border-white" />
            </div>

            <div className="mb-8 cursor-pointer">
              <GoogleBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
