import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const GuestLayout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
