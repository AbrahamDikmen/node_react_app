import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SettingsPage from "./pages/SettingsPage";

import ForgottenPasswordPage from "./pages/ForgottenPasswordPage.jsx";
import PasswordReset from "./pages/PasswordReset";
import EmailVerify from "./pages/EmailVerify.jsx";

import AccountPage from "./pages/AccountPage.jsx";
import SetAvatarPage from "./pages/SetAvatarPage";
import ChatPage from "./pages/ChatPage.jsx";

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
          <Route path="/" exact element={<HomePage />} />
          <Route path="/setavatar" element={<SetAvatarPage />} />
          <Route path="/chat" element={<ChatPage />} />

          {/* Forgot Password, Find User, Reset Password*/}
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgottenPasswordPage />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />

          {/* Seetings */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteProvider;
