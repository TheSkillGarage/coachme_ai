import React from "react";
import { AuthCard } from "../../../components/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [logData, setLogData] = React.useState({});
    const navigate = useNavigate();

    const handleLogin = async (data: any): Promise<{ status: number }> => {
        console.log("Login data:", data);
        setLogData(data);

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 1000));

        // ✅ Store user in localStorage (simulate login)
        const fakeUser = {
            name: "John Doe",
            email: data.email,
            token: "mocked-jwt-token",
            role: "user",
            loggedInAt: new Date().toISOString(),
        };

        localStorage.setItem("user", JSON.stringify(fakeUser));
        console.log("User stored in localStorage:", fakeUser);

        // ✅ Redirect to dashboard after successful login
        navigate("/user/dashboard");
        window.location.href = "/"
        return { status: 200 };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <AuthCard mode="login" onSubmit={handleLogin} />
        </div>
    );
};

export default LoginPage;
