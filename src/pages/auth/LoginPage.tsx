import { useState } from "react";
import SetaLetterLogo from "@/assets/SetaLogo";
import GoogleBtn from "@/assets/GoogleBtn";
import { LoginForm } from "@/components/ui/login/LoginForm";
import { PasswordForm } from "@/components/ui/login/PasswordForm";
import { useNavigate } from "react-router-dom";
import { login } from "@/apis/login";
import { useUserStore } from "@/stores/useUserStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const showEmailError = emailTouched && email !== "" && !isEmailValid;

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
      await login(email, password);
      alert("로그인 성공");
      useUserStore.getState().setLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.log(err);
      setShowPasswordError(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[30px]">
      <div className="w-[89.66px] h-20">
        <SetaLetterLogo />
      </div>
      <div className="w-100 rounded-[10px] bg-[#222222] py-10 px-[25px] box-border">
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
            <div className="flex flex-row justify-center gap-[10px] mt-[10px] text-white text-xs">
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

            <div className="flex flex-row items-center gap-2 mt-[35px] mb-5">
              <div className="flex-1 border-t border-white" />
              <span className="text-white text-xs">또는</span>
              <div className="flex-1 border-t border-white" />
            </div>

            <div className="mb-[33px] cursor-pointer">
              <GoogleBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
