import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import MainLayout from "@/components/layout/MainLayout";
import DetailLayout from "@/components/layout/DetailLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import FindIdPage from "@/pages/auth/FindIdPage";
import PwSetPage from "@/pages/auth/PwSetPage";
import MainPage from "@/pages/MainPage";
import MyProfilPage from "@/pages/profile-pages/MyProfilePage";
import { MusicEditPage } from "@/pages/edit-pages/MusicEditPage";
import { FeedEditPage } from "@/pages/edit-pages/FeedEditPage";
import { BusinessSettingPage } from "@/pages/profile-pages/BusinessSettingPage";
import { UploadPage } from "@/pages/edit-pages/UploadPage";
import MusicVideoLayout from "@/components/layout/MusicVideoLayout";
import { MusicianPage } from "@/pages/serve-pages/MusicianPage";
import { MusicPage } from "@/pages/serve-pages/MusicPage";
import { FeedPage } from "@/pages/serve-pages/FeedPage";
import { ProjectPage } from "@/pages/serve-pages/ProjectPage";
import TermsPage from "@/pages/auth/TermsPage";
import { PrivacyPage } from "@/pages/auth/PrivacyPage";
import { MusicianRegisterPage } from "@/pages/profile-pages/MusicianRegisterPage";
import { ProjectEditPage } from "@/pages/edit-pages/ProjectEditPage";
import UserProfilePage from "@/pages/profile-pages/UserProfilePage";
import { PrivacySettingPage } from "@/pages/profile-pages/PrivacySettingPage";
import { MusicVideoPage } from "@/pages/serve-pages/MusicVideoPage";
import { MyPage } from "@/pages/profile-pages/MyPage";

import { RequireAuth } from "./RequireAuth";
import { ChatPage } from "@/pages/chat/ChatPage";
import { ProjectDetailPage } from "@/pages/serve-pages/ProjectDetailPage";

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
      {
        path: "my-profile",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      { path: "user-profile/:id", element: <UserProfilePage /> },
      { path: "business-setting", element: <BusinessSettingPage /> },
      { path: "musician-register", element: <MusicianRegisterPage /> },
      {
        path: "privacy-setting",
        element: (
          <RequireAuth>
            <PrivacySettingPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-page",
        element: (
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        ),
      },
      {
        path: "chat",
        element: (
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        ),
      },
      {
        path: "project-detail/:id",
        element: (
          <RequireAuth>
            <ProjectDetailPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/music-video",
    element: <MusicVideoLayout />,
    children: [{ path: ":id", element: <MusicVideoPage /> }],
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
      {
        path: "",
        element: (
          <RequireAuth>
            <UploadPage />
          </RequireAuth>
        ),
      },
      {
        path: "music-edit/:id",
        element: (
          <RequireAuth>
            <MusicEditPage />
          </RequireAuth>
        ),
      },
      {
        path: "feed-edit/:id",
        element: (
          <RequireAuth>
            <FeedEditPage />
          </RequireAuth>
        ),
      },
      {
        path: "project-edit/:id",
        element: (
          <RequireAuth>
            <ProjectEditPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
