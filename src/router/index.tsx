import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import MainLayout from "@/components/layout/MainLayout";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import FindIdPage from "@/pages/FindIdPage";
import PwSetPage from "@/pages/PwSetPage";
import MainPage from "@/pages/MainPage";
import ProfilPage from "@/pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "id", element: <FindIdPage /> },
      { path: "pw", element: <PwSetPage /> },
    ],
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "profile", element: <ProfilPage /> },
    ],
  },
]);
