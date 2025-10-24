import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Main = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    //  Get user from Redux store
    const user = useAppSelector((state) => state.user.currentUser);

    //  If user is not logged in → redirect to login page
    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    //  If user is logged in → render the desired protected page
    return <>{children}</>;
};

export default Main;
