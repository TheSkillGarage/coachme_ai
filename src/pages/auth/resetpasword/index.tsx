import React from "react";
import { AuthCard } from "../../../components/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";

const ResetPage = () => {
    const [logData, setLogData] = React.useState({});
    const navigate = useNavigate();
    const { showToast } = useToast()

    const handleReset = async (data: any): Promise<{ status: number }> => {
        console.log("Reset data:", data);
        setLogData(data);

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 1000));

        // Here, check if this is the last step (step 3)
        if (data.step === 3) {
            showToast("✅ Password reset successful!", "success");
            navigate("/login", { replace: true });
        }

        return { status: 200 };
    };

    console.log("Reset Page Rendered", logData);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <AuthCard mode="reset" onSubmit={handleReset} />
        </div>
    );
};

export default ResetPage;
