import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/login/Login";
import SignUpFirstPage from "./pages/signup/SignUpFirstPage";
import SignUpGender from "./pages/signup/SignUpGender";
import SignUpPhoto from "./pages/signup/SignUpPhoto";
import SignUpAlias from "./pages/signup/SignUpAlias";
import SignUpBirthday from "./pages/signup/SignUpBirthday";
import AuthorizationHint from "./pages/authorization/AuthorizationHint";
import AuthorizationSpotify from "./pages/authorization/AuthorizationSpotify";
import AuthorizationLocation from "./pages/authorization/AuthorizationLocation";
import MainLayout from "./components/MainLayout";
import HomeLayout from "./components/homePage/HomeLayout";
import SwipePage from "./pages/home/SwipePage";
import NearbyPage from "./pages/home/NearbyPage";
import ExploreEntry from "./pages/home/ExploreEntry";
import InteractionLayout from "./components/interactionPage/InteractionLayout";
import LikesMePage from "./pages/interaction/LikesMePage";
import MyMatchesPage from "./pages/interaction/MyMatchesPage";
import MatchDetail from "./pages/interaction/MatchDetail";
import ChatEntry from "./pages/chat/ChatEntry";
import ProfilePage from "./pages/profile/ProfilePage";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        //TODO: 之後可以設為首頁，現在先直接導向 auth (之後加上private route判斷有沒有登入過了)
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
                children: [
                    {
                        path: "",
                        element: <SignUpFirstPage />,
                    },
                    {
                        path: "gender",
                        element: <SignUpGender />,
                    },
                    {
                        path: "photo",
                        element: <SignUpPhoto />,
                    },
                    {
                        path: "alias",
                        element: <SignUpAlias />,
                    },
                    {
                        path: "birthday",
                        element: <SignUpBirthday />,
                    },
                ],
            },
        ],
    },
    {
        path: "authorization",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <AuthorizationHint />,
            },
            {
                path: "spotify",
                element: <AuthorizationSpotify />,
            },
            {
                path: "location",
                element: <AuthorizationLocation />,
            },
        ],
    },
    {
        path: "app",
        element: <MainLayout />,
        children: [
            {
                path: "home",
                element: <HomeLayout />,
                children: [
                    {
                        path: "swipeCard",
                        element: <SwipePage />,
                    },
                    {
                        path: "nearby",
                        element: <NearbyPage />,
                    },
                    {
                        path: "explore",
                        element: <ExploreEntry />,
                    },
                    {
                        path: "rank",
                        element: <SwipePage />,
                    },
                ],
            },
            {
                path: "interaction",
                element: <InteractionLayout />,
                children: [
                    {
                        path: "likes",
                        element: <LikesMePage />,
                    },
                    {
                        path: "mine",
                        element: <MyMatchesPage />,
                    },
                ],
            },
            {
                path: "interaction/likes/:userId",
                element: <MatchDetail />,
            },
            {
                path: "chat",
                element: <ChatEntry />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
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
