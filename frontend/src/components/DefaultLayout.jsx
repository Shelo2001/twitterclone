import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";

const DefaultLayout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
