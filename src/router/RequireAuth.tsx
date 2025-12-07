import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "@/utils/checkLogin";
import { setUserState } from "@/utils/setUserState";

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const check = async () => {
      const userId = await checkLogin();
      setUserState(userId);
      if (userId === null) {
        navigate("/auth", { replace: true });
      } else {
        setIsChecked(true);
      }
    };
    check();
  }, [navigate]);

  if (!isChecked) return null;

  return <>{children}</>;
};
