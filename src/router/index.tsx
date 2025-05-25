import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import MainLayout from "@/components/layout/MainLayout";
import DetailLayout from "@/components/layout/DetailLayout";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import FindIdPage from "@/pages/FindIdPage";
import PwSetPage from "@/pages/PwSetPage";
import MainPage from "@/pages/MainPage";
import ProfilPage from "@/pages/ProfilePage";
import { MusicEditPage } from "@/pages/MusicEditPage";
import { FeedEditPage } from "@/pages/FeedEditPage";
import { BusinessSettingPage } from "@/pages/BusinessSettingPage";
import { UploadPage } from "@/pages/UploadPage";

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
      { path: "business-setting", element: <BusinessSettingPage /> },
    ],
  },
  {
    path: "/upload",
    element: <DetailLayout />,
    children: [
      { path: "", element: <UploadPage /> },
      { path: "music-edit", element: <MusicEditPage /> },
      { path: "feed-edit", element: <FeedEditPage /> },
    ],
  },
]);
