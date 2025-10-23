import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../../utils/utils";
import { motion } from "framer-motion";

interface CustomOtpInputProps {
    length?: number; // Number of OTP boxes
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    size?: "sm" | "md" | "lg";
    shape?: "square" | "rounded" | "circle";
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
    disabled?: boolean;
}

export const CustomOtpInput: React.FC<CustomOtpInputProps> = ({
    length = 6,
    onChange,
    onComplete,
    size = "md",
    shape = "square",
    className,
    inputClassName,
    autoFocus = true,
    disabled = false,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const sizeClass =
        size === "sm"
            ? "w-10 h-10 text-sm"
            : size === "lg"
                ? "w-16 h-16 text-xl"
                : "w-12 h-12 text-base";

    const shapeClass =
        shape === "circle"
            ? "rounded-full"
            : shape === "rounded"
                ? "rounded-xl"
                : "rounded-md";

    // Handle change per box
    const handleChange = (value: string, index: number) => {
        if (!/^[0-9a-zA-Z]?$/.test(value)) return; // restrict input to alphanumerics
        const newOtp = [...otp];
        newOtp[index] = value.toUpperCase();
        setOtp(newOtp);
        onChange?.(newOtp.join(""));

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.every((v) => v !== "")) {
            onComplete?.(newOtp.join(""));
        }
    };

    // Handle backspace
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").trim().slice(0, length);
        if (!pasted) return;
        const chars = pasted.split("");
        const newOtp = Array(length)
            .fill("")
            .map((_, i) => chars[i] || "");
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
        if (newOtp.every((v) => v !== "")) onComplete?.(newOtp.join(""));
    };

    useEffect(() => {
        if (autoFocus && inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, [autoFocus]);

    return (
        <div className={cn("flex gap-2 justify-center", className)}>
            {Array.from({ length }).map((_, index) => (
                <motion.input
                    key={index}
                    ref={(el) => { inputsRef.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    disabled={disabled}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={cn(
                        "text-center font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500",
                        sizeClass,
                        shapeClass,
                        "transition-all duration-150",
                        disabled && "bg-gray-100 cursor-not-allowed opacity-70",
                        inputClassName
                    )}
                    whileFocus={{ scale: 1.08 }}
                />
            ))}
        </div>
    );
};
