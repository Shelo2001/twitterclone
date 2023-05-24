import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/chat",
                element: <Chat />,
            },
            {
                path: "/profile/:fullname/:id",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
