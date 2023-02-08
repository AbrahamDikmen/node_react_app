import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./features/protectionRoutes/ProtectedRoute.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";

import ForgottenPasswordPage from "./pages/ForgottenPasswordPage.jsx";
import PasswordReset from "./pages/PasswordReset";
import EmailVerify from "./pages/EmailVerify.jsx";

import AccountPage from "./pages/AccountPage.jsx";
import SetAvatarPage from "./pages/SetAvatar";
import ChatPage from "./pages/ChatPage.jsx";
import FriendList from "./pages/FriendList.jsx";

import TestStyledPage from "./pages/TestStyledPage.jsx";

const RouteProvider = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestStyledPage />} />
          {/* Register, Login, Home, SetAvatar */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Forgot Password, Find User, Reset Password*/}
          <Route
            path="/api/users/:id/verify/:token"
            element={<EmailVerify />}
          />
          <Route
            path="/api/forgot-password"
            element={<ForgottenPasswordPage />}
          />
          <Route
            path="/api/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="/*" element={<NotFoundPage />} />

          {/* Protected Routes from unlogged users */}
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route path="/" exact element={<HomePage />} />

            {/* Chat Pages */}
            <Route path="/setavatar" element={<SetAvatarPage />} />
            <Route path="/chat" element={<ChatPage />} />

            {/* Seetings */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/friendList" element={<FriendList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteProvider;
