import { useState } from "react";
import { Card } from "../../ui/card";
import Button from "../../ui/button/button";
import Dialog from "../../ui/dialog";
import CircleLoader from "../../loader";
import { CircleAlert, CheckCircle2 } from "lucide-react";
import Logo from "../../../assets/coachmeai.png";
import { useNavigate } from "react-router-dom";

interface LogoutDialogProps {
    isOpen: boolean;
    onClose: () => void;
    clickOverlayToClose?: boolean; // optional, default false
}

type Stage = "confirm" | "loading" | "success";

const LogoutDialog: React.FC<LogoutDialogProps> = ({
    isOpen,
    onClose,
    clickOverlayToClose = false,
}) => {
    const [stage, setStage] = useState<Stage>("confirm");
    const navigate = useNavigate();

    const handleLogout = async () => {
        setStage("loading");

        // Simulate API call delay
        await new Promise((res) => setTimeout(res, 1500));

        // Clear user session
        localStorage.removeItem("user");

        // Move to success stage
        setStage("success");
    };

    const handleClose = () => {
        setStage("confirm"); // reset for next use
        onClose();
        navigate("/login", { replace: true });
        window.location.href = "/login"
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={clickOverlayToClose ? onClose : () => { }}
            showCloseButton={false}
            className="bg-white"
        >
            <div className="flex items-center justify-center mb-4 mt-[32px]">
                <div className="text-center">
                    <img src={Logo} className="h-[30px] w-[45px] mx-auto" alt="Logo" />
                    <h1 className="text-lg font-semibold text-primary-500 mt-1">
                        CoachMe AI
                    </h1>
                </div>
            </div>

            {stage === "confirm" && (
                <Card className="flex flex-col items-center p-6">
                    <div className="h-25 w-25 rounded-full bg-red-200 flex items-center justify-center mb-4">
                        <CircleAlert size={80} className="text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-2">
                        Confirm Logout
                    </h2>
                    <p className="text-grey-300 text-sm text-center">
                        Are you sure you want to log out of your account?
                    </p>
                    <Button
                        className="bg-red-500 w-full mt-4 text-white"
                        onClick={handleLogout}
                    >
                        Yes, log me out
                    </Button>
                    <Button
                        className="bg-gray-100 text-gray-600 w-full mt-4"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </Card>
            )}

            {stage === "loading" && (
                <div className="flex flex-col items-center p-6">
                    <CircleLoader />
                    <h1 className="mt-2 text-lg font-semibold">Logging out...</h1>
                    <p className="text-grey-300 text-sm text-center mt-1">
                        Please wait while we securely log you out of your account
                    </p>
                </div>
            )}

            {stage === "success" && (
                <Card className="flex flex-col items-center p-6">
                    <div className="h-25 w-25 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                        <CheckCircle2 size={60} className="text-primary-500" />
                    </div>
                    <h1 className="text-xl font-semibold text-center mb-2">
                        Logout Successful
                    </h1>
                    <p className="text-grey-300 text-sm text-center">
                        You have been logged out of your CoachMe AI account
                    </p>
                    <Button
                        className="bg-primary-500 w-full mt-4 text-white"
                        onClick={handleClose}
                    >
                        Back to Login
                    </Button>
                </Card>
            )}
        </Dialog>
    );
};

export default LogoutDialog;
