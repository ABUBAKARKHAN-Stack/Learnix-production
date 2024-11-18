import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard courses={CourseData} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
