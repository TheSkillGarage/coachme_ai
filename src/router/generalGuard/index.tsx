import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Main = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    //  Get user from Redux
    const user = useAppSelector((state) => state.user.currentUser);

    console.log("GeneralGuard - Current User:", user);

    // Define public routes (auth or landing pages)
    const publicRoutes = ["/login", "/signup", "/reset-password", "/"];

    const isPublicRoute = publicRoutes.some((path) =>
        location.pathname.startsWith(path)
    );

    //  If NOT logged in & tries to access protected route
    if (!user && !isPublicRoute) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    //  If logged in & tries to access a public route
    if (user && isPublicRoute) {
        return <Navigate to="/user/dashboard" replace state={{ from: location }} />;
    }

    //  Otherwise, render normally
    return <>{children}</>;
};

export default Main;
