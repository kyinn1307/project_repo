import { createBrowserRouter, Navigate } from "react-router-dom";
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
import { BusinessPage } from "@/pages/serve-pages/BusinessPage";
import { BusinessEditPage } from "@/pages/edit-pages/BusinessEditPage";
import PwResetPage from "@/pages/auth/PwResetPage";

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
      { path: "business", element: <BusinessPage /> },
      {
        path: "my-profile",
        element: (
          <RequireAuth>
            <Navigate to="/my-profile/track" replace />
          </RequireAuth>
        ),
      },
      {
        path: "my-profile/track",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-profile/feed",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-profile/project",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-profile/history",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-profile/business",
        element: (
          <RequireAuth>
            <MyProfilPage />
          </RequireAuth>
        ),
      },
      {
        path: "user-profile/:id",
        element: (
          <RequireAuth>
            <UserProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "business-setting",
        element: <Navigate to="business-setting/1" replace />,
      },
      { path: "business-setting/:id", element: <BusinessSettingPage /> },
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
    path: "/reset-password",
    element: <AuthLayout />,
    children: [{ path: ":token", element: <PwResetPage /> }],
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
      { index: true, element: <Navigate to="track" replace /> },

      { path: "track", element: <UploadPage tab="track" /> },
      { path: "feed", element: <UploadPage tab="feed" /> },
      { path: "project", element: <UploadPage tab="project" /> },

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
      {
        path: "business-edit/:id",
        element: (
          <RequireAuth>
            <BusinessEditPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
