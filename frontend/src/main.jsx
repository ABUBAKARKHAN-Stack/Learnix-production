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
<<<<<<< HEAD
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCoursePage from "./Components/DashboardCoursePage";
=======
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 5734c7ef641c90d03b92c381b90f4498ad75cddb
import CoursesPage from "./Pages/CoursesPage";

import DashboardCoursePage from "./Components/DashboardCoursePage"; // Import course details page

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
<<<<<<< HEAD
    path: "/course/:id",
=======
    path: "/dashboard/course/:id",
>>>>>>> 5734c7ef641c90d03b92c381b90f4498ad75cddb
    element: (
      <Protected authenticationRequired={false}>
        <DashboardCoursePage courses={CourseData} />
      </Protected>
    ),
  },
<<<<<<< HEAD

    {
      path: "/courses",
      element: <Protected authenticationRequired={false}>
      <CoursesPage/>
      </Protected>,
      },
=======
  {
    path: "/courses",
    element: (
      <Protected authenticationRequired={false}>
        <CoursesPage />
      </Protected>
    ),
  },
>>>>>>> 5734c7ef641c90d03b92c381b90f4498ad75cddb
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
