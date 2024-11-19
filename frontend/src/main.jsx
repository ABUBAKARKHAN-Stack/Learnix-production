import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import CourseData from "../src/Data/CourseData.json";
import Protected from "./Components/AuthLayout/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <Protected authenticationRequired={false}>
      <SigninPage />
    </Protected>,
  },
  {
    path: "/signup",
    element: <Protected authenticationRequired={false} >
      <SignupPage />
    </Protected>,
  },
  {
    path: "/verification-email/:token",
    element: <Protected authenticationRequired={false}>
      <EmailVerificationPage />
    </Protected>,
  },
  {
    path: "/dashboard",
    element: <Protected authenticationRequired={true}>
      <Dashboard />
    </Protected>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
