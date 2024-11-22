import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { CourseData } from "./Data/CourseData";
import Protected from "./Components/AuthLayout/Protected";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/REsetPasswordPage";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCoursePage from "./Components/DashboardCoursePage";
import CoursesPage from "./Pages/CoursesPage";

import Settings from "./Pages/Setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected authenticationRequired={false}>
        <LandingPage />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authenticationRequired={false}>
        <SignupPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: (
      <Protected authenticationRequired={false}>
        <SigninPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Protected authenticationRequired={false}>
        <ForgotPasswordPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/verification-email/:token",
    element: (
      <Protected authenticationRequired={false}>
        <EmailVerificationPage />
      </Protected>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <Protected authenticationRequired={false}>
        <ResetPasswordPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protected authenticationRequired={false}>
        <Dashboard courses={CourseData} />
      </Protected>
    ),
  },
  {
    path: "/course/:id",
    element: (
      <Protected authenticationRequired={false}>
        <DashboardCoursePage courses={CourseData} />
      </Protected>
    ),
  },

  {
    path: "/courses",
    element: (
      <Protected authenticationRequired={false}>
        <CoursesPage />
      </Protected>
    ),
  },

  {
    path: "/setting",
    element: (
      <Protected authenticationRequired={false}>
        <Settings />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
