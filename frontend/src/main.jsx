import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import Protected from "./Components/AuthLayout/Protected";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/REsetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCoursePage from "./Components/DashboardCoursePage";
import CoursesPage from "./Pages/CoursesPage";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import Settings from "./Pages/Setting";
import CreateCoursePage from "./Pages/CreateCoursePage";
import Loading from "./Components/Loading";
import EditCoursePage from "./Pages/EditCoursePage";
import AdminCourseDetailsPage from "./Pages/AdminCourseDetailsPage";
import UploadVideosPage from "./Pages/UploadVideosPage";

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
      <Protected authenticationRequired={true}>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/create-course",
    element: (
      <Protected authenticationRequired={true}>
        <CreateCoursePage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/admin/course-details/:courseId",
    element: (
      <Protected authenticationRequired={true}>
        <AdminCourseDetailsPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/admin/course/:courseId/add-video",
    element: (
      <Protected authenticationRequired={true}>
        <UploadVideosPage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/admin/course/:courseId/edit",
    element: (
      <Protected authenticationRequired={true}>
        <EditCoursePage />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/your-courses/course/:id",
    element: (
      <Protected authenticationRequired={true}>
        <DashboardCoursePage />
      </Protected>
    ),
  },
  {
    path: "/courses",
    element: (
      <Protected authenticationRequired={true}>
        <CoursesPage />
      </Protected>
    ),
  },
  {
    path: "/courses/course-details/:id",
    element: (
      <Protected authenticationRequired={true}>
        <CourseDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/setting",
    element: (
      <Protected authenticationRequired={true}>
        <Settings />
        <ToastContainer />
      </Protected>
    ),
  },
  {
    path: "/loading",
    element: (
      <Protected authenticationRequired={false}>
        <Loading />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
