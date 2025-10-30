import React from "react";
import { AuthCard } from "../../../components/auth";

const SignupPage = () => {
    const [logData, setLogData] = React.useState({});

    const handleSignup = async (data: any): Promise<{ status: number }> => {
        console.log("Signup data:", data);
        setLogData(data);
        await new Promise((res) => setTimeout(res, 1000));
        // alert("Logged in successfully!");
        return { status: 200 };
    };
    console.log("Login Page Rendered", logData);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <AuthCard mode="signup" onSubmit={handleSignup} />
        </div>
    );
};

export default SignupPage;
