import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import MainLayout from "@/components/layout/MainLayout";
import DetailLayout from "@/components/layout/DetailLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import FindIdPage from "@/pages/auth/FindIdPage";
import PwSetPage from "@/pages/auth/PwSetPage";
import MainPage from "@/pages/MainPage";
import MyProfilPage from "@/pages/MyProfilePage";
import { MusicEditPage } from "@/pages/MusicEditPage";
import { FeedEditPage } from "@/pages/FeedEditPage";
import { BusinessSettingPage } from "@/pages/BusinessSettingPage";
import { UploadPage } from "@/pages/UploadPage";
import { MusicVideoPage } from "@/pages/MusicVideoPage";
import { MusicianPage } from "@/pages/serve-pages/MusicianPage";
import { MusicPage } from "@/pages/serve-pages/MusicPage";
import { FeedPage } from "@/pages/serve-pages/FeedPage";
import { ProjectPage } from "@/pages/serve-pages/ProjectPage";
import TermsPage from "@/pages/auth/TermsPage";
import { PrivacyPage } from "@/pages/auth/PrivacyPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "musician", element: <MusicianPage /> },
      { path: "music", element: <MusicPage /> },
      { path: "feed", element: <FeedPage /> },
      { path: "project", element: <ProjectPage /> },
      { path: "my-profile", element: <MyProfilPage /> },
      { path: "business-setting", element: <BusinessSettingPage /> },
      { path: "music-video", element: <MusicVideoPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "id", element: <FindIdPage /> },
      { path: "pw", element: <PwSetPage /> },
    ],
  },
  {
    path: "/terms",
    element: <DetailLayout />,
    children: [
      { path: "", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
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
