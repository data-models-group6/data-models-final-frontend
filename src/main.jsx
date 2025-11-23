import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    // 之後可以設為首頁，現在先直接導向 auth (之後加上private route判斷有沒有登入過了)
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "auth",
    element: <AuthLayout />, // 設定黑色背景 + 手機寬度置中
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);