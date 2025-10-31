import React, { useState, useMemo } from "react";
import { Card } from "../ui/card";
import Button from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Checkbox } from "../ui/checkbox";
import { CheckCircle2, Eye, EyeOff, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as yup from "yup";
import { CustomOtpInput } from "../ui/otpinput";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/coachmeai.png";

const CustomOtpInputAny = CustomOtpInput as unknown as React.FC<any>;

interface AuthCardProps {
    mode?: "signup" | "login" | "reset";
    onSubmit: (data: any) => Promise<{ status: number }>;
}

export const AuthCard: React.FC<AuthCardProps> = ({
    mode = "signup",
    onSubmit,
}) => {
    const [internalMode, setInternalMode] = useState<
        "signup" | "login" | "reset" | "success"
    >(mode);
    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
    const navigate = useNavigate();

    // Dynamic titles and descriptions
    const title = useMemo(() => {
        if (internalMode === "signup") return "Create Your Account";
        if (internalMode === "login") return "Welcome Back";
        if (internalMode === "reset") {
            if (resetStep === 1) return "Forgot Password";
            if (resetStep === 2) return "Verify Your Email";
            if (resetStep === 3) return "Reset Password";
        }
        return "";
    }, [internalMode, resetStep]);

    const description = useMemo(() => {
        if (internalMode === "signup")
            return "Fill in the details below to create your CoachMe AI account";
        if (internalMode === "login") return "Sign in to your CoachMe AI account";
        if (internalMode === "reset") {
            if (resetStep === 1)
                return `Enter your email address to reset your password`;
            if (resetStep === 2)
                return (
                    <div className="text-xs text-grey-300">
                        We’ve sent a verification code to
                        <span className="text-grey-400 text-semibold">
                            blessingbella@gmail.com
                        </span>
                    </div>
                );
            if (resetStep === 3)
                return (
                    <div className="text-xs text-grey-300">
                        Create a new password for
                        <span className="text-grey-400 text-semibold">
                            blessingbella@gmail.com
                        </span>
                    </div>
                );
        }
        return "";
    }, [internalMode, resetStep]);

    // ✅ Validation schema with password strength enforcement
    const validationSchema = useMemo(() => {
        const passwordRules = yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters long")
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/~`]).+$/,
                "Password must contain at least one uppercase letter, one number, and one special character"
            );

        if (internalMode === "signup") {
            return yup.object({
                firstName: yup.string().required("First name is required"),
                lastName: yup.string().required("Last name is required"),
                email: yup
                    .string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: passwordRules,
                confirmPassword: yup
                    .string()
                    .oneOf([yup.ref("password")], "Passwords must match")
                    .required("Confirm your password"),
                terms: yup.boolean().oneOf([true], "You must agree to continue"),
            });
        } else if (internalMode === "login") {
            return yup.object({
                email: yup
                    .string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: yup.string().required("Password is required"),
            });
        } else if (internalMode === "reset") {
            if (resetStep === 1) {
                return yup.object({
                    email: yup
                        .string()
                        .email("Invalid email")
                        .required("Email is required"),
                });
            } else if (resetStep === 2) {
                return yup.object({
                    otp: yup
                        .string()
                        .length(6, "Enter 6-digit OTP")
                        .required("OTP is required"),
                });
            } else {
                return yup.object({
                    password: passwordRules,
                    confirmPassword: yup
                        .string()
                        .oneOf([yup.ref("password")], "Passwords must match")
                        .required("Confirm password"),
                });
            }
        }
        return yup.object();
    }, [internalMode, resetStep]);

    // Input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleOtpChange = (value: string) => {
        setFormData((prev: any) => ({ ...prev, otp: value }));
    };

    // Validation
    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err: any) {
            const newErrors: any = {};
            err.inner.forEach((e: any) => {
                newErrors[e.path] = e.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    // Submit
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const valid = await validateForm();
        if (!valid) return;

        if (internalMode === "signup") {
            console.log("Submitting signup data:", formData);
            const res = await onSubmit(formData);
            if (res.status === 200) setInternalMode("success");
        } else if (internalMode === "reset") {
            let stepData: any = {};
            if (resetStep === 1) stepData = { email: formData.email };
            else if (resetStep === 2) stepData = { otp: formData.otp };
            else
                stepData = {
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                };

            console.log(`Submitting reset step ${resetStep}:`, stepData);
            const res = await onSubmit({ step: resetStep, ...stepData });
            if (res.status === 200) {
                if (resetStep < 3)
                    setResetStep((prev) => (prev + 1) as 1 | 2 | 3);
                else setInternalMode("login");
            }
        } else {
            console.log("Submitting login data:", formData);
            await onSubmit(formData);
        }
    };

    const isButtonDisabled = useMemo(() => {
        if (internalMode === "signup") {
            return !(
                formData.firstName &&
                formData.lastName &&
                formData.email &&
                formData.password &&
                formData.confirmPassword &&
                formData.terms
            );
        } else if (internalMode === "login") {
            return !(formData.email && formData.password);
        } else if (internalMode === "reset") {
            if (resetStep === 1) return !formData.email;
            if (resetStep === 2)
                return !(formData.otp && formData.otp.length === 6);
            if (resetStep === 3)
                return !(formData.password && formData.confirmPassword);
        }
        return false;
    }, [internalMode, resetStep, formData]);

    return (
        <div className="w-[100%]">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mb-3">
                    <img src={Logo} className="h-8 w-12 mb-1" alt="" />
                    <h1 className="text-lg font-semibold text-primary-500">
                        CoachMe AI
                    </h1>
                </div>
                <Card
                    animated={false}
                    hoverable={false}
                    className="max-w-md w-full sm:w-[400px] mx-auto p-6 shadow-lg rounded-2xl bg-white"
                >
                    <h2 className="text-2xl font-semibold text-center mb-1">
                        {title}
                    </h2>
                    <p className="text-center text-xs text-grey-300 mb-4">
                        {description}
                    </p>

                    <AnimatePresence mode="wait">
                        <motion.form
                            key={`${internalMode}-${resetStep}`}
                            onSubmit={handleFormSubmit}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-1"
                        >
                            {/* Signup */}
                            {internalMode === "signup" && (
                                <>
                                    <Input
                                        className="h-16"
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        rightIcon={User}
                                        value={formData.firstName || ""}
                                        onChange={handleChange}
                                        error={errors.firstName}
                                    />
                                    <Input
                                        className="h-16"
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        rightIcon={User}
                                        value={formData.lastName || ""}
                                        onChange={handleChange}
                                        error={errors.lastName}
                                    />
                                    <Input
                                        className="h-16"
                                        label="Email"
                                        name="email"
                                        placeholder="Enter email"
                                        rightIcon={Mail}
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <Input
                                        className="h-16"
                                        label="Password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        rightIcon={showPassword ? EyeOff : Eye}
                                        onRightIconClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        value={formData.password || ""}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <Input
                                        className="h-16"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Confirm password"
                                        rightIcon={showConfirm ? EyeOff : Eye}
                                        onRightIconClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        value={formData.confirmPassword || ""}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                    />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Checkbox
                                            checked={formData.terms || false}
                                            onChange={(checked: boolean) =>
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    terms: checked,
                                                }))
                                            }
                                            name="terms"
                                        />
                                        <p className="text-xs text-gray-600">
                                            By signing up, you agree to our{" "}
                                            <span className="text-primary-600 cursor-pointer">
                                                Terms of service
                                            </span>{" "}
                                            and
                                            <span className="text-primary-600 cursor-pointer">
                                                {" "}
                                                Privacy Policy
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    {errors.terms && (
                                        <p className="text-red-500 text-sm">
                                            {errors.terms}
                                        </p>
                                    )}
                                </>
                            )}

                            {/* Login */}
                            {internalMode === "login" && (
                                <>
                                    <Input
                                        className="h-16"
                                        label="Email"
                                        name="email"
                                        placeholder="Enter email"
                                        rightIcon={Mail}
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <Input
                                        className="h-16"
                                        label="Password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        rightIcon={showPassword ? EyeOff : Eye}
                                        onRightIconClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        value={formData.password || ""}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />

                                    <div className="flex items-center justify-between text-sm mt-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData.rememberMe || false}
                                                onChange={(checked: boolean) =>
                                                    setFormData((prev: any) => ({
                                                        ...prev,
                                                        rememberMe: checked,
                                                    }))
                                                }
                                                name="rememberMe"
                                            />
                                            <label
                                                htmlFor="rememberMe"
                                                className="text-gray-600"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/reset-password")}
                                            className="text-primary-600 hover:underline font-medium"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Reset */}
                            {internalMode === "reset" && (
                                <>
                                    {resetStep === 1 && (
                                        <Input
                                            className="h-16"
                                            label="Email"
                                            name="email"
                                            placeholder="Enter your email"
                                            rightIcon={Mail}
                                            value={formData.email || ""}
                                            onChange={handleChange}
                                            error={errors.email}
                                        />
                                    )}
                                    {resetStep === 2 && (
                                        <div className="flex justify-center">
                                            <CustomOtpInputAny
                                                className="mt-2"
                                                length={6}
                                                value={formData.otp || ""}
                                                onChange={handleOtpChange}
                                                error={errors.otp}
                                            />
                                        </div>
                                    )}
                                    {resetStep === 3 && (
                                        <>
                                            <Input
                                                className="h-16"
                                                label="New Password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                rightIcon={showPassword ? EyeOff : Eye}
                                                onRightIconClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                                value={formData.password || ""}
                                                onChange={handleChange}
                                                error={errors.password}
                                            />
                                            <Input
                                                className="h-16"
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                rightIcon={showConfirm ? EyeOff : Eye}
                                                onRightIconClick={() =>
                                                    setShowConfirm(!showConfirm)
                                                }
                                                value={formData.confirmPassword || ""}
                                                onChange={handleChange}
                                                error={errors.confirmPassword}
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            {/* Success */}
                            {internalMode === "success" && (
                                <div className="flex flex-col justify-center items-center">
                                    <div className="bg-purple-500 h-25 w-25 rounded-full flex items-center justify-center">
                                        <CheckCircle2
                                            size={80}
                                            className="text-primary-500 rounded-full text-thin"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-grey-500">
                                        Congratulations
                                    </h3>
                                    <p className="text-grey-200 text-center text-sm">
                                        Your account has been created successfully. You can now
                                        proceed to login
                                    </p>
                                    <Button
                                        className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                </div>
                            )}

                            {/* Submission Button for non-success modes */}
                            {internalMode !== "success" && (
                                <Button
                                    type="submit"
                                    className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white"
                                    disabled={isButtonDisabled}
                                >
                                    {internalMode === "signup"
                                        ? "Sign Up"
                                        : internalMode === "login"
                                            ? "Login"
                                            : resetStep === 1
                                                ? "Send Verification Code"
                                                : resetStep === 2
                                                    ? "Verify"
                                                    : "Reset Password"}
                                </Button>
                            )}

                            {/* Navigational Links */}
                            {internalMode === "login" && (
                                <p className="text-center text-sm mt-3 pt-3 flex justify-between text-sm mt-3 pt-3">
                                    Don’t have an account?
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signup")}
                                        className="text-primary-600 hover:underline font-medium cursor-pointer"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            )}

                            {internalMode === "signup" && (
                                <p className="text-center flex justify-between text-sm mt-3 pt-3">
                                    Already have an account?
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="text-primary-600 hover:underline font-medium cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </p>
                            )}
                        </motion.form>
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
};
