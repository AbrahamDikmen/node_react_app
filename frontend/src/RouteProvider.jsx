import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage";

import ForgottenPasswordPage from "./pages/ForgottenPasswordPage/ForgottenPasswordPage.jsx";
import PasswordReset from "./pages/ForgottenPasswordPage/PasswordReset";
import EmailVerify from "./pages/EmailVerify/EmailVerify.jsx";

import AccountPage from "./pages/Settings/Account/AccountPage.jsx";

const RouteProvider = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Register, Login, Home*/}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" exact element={<HomePage />} />

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
