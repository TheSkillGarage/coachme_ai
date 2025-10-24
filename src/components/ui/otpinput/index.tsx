import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../../utils/utils";
import { motion } from "framer-motion";


interface CustomOtpInputProps {
    label?: string;
    error?: string;
    length?: number;
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
    label,
    error,
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

    // Responsive sizing
    const sizeClass =
        size === "sm"
            ? "w-8 h-8 text-sm sm:w-10 sm:h-10"
            : size === "lg"
                ? "w-12 h-12 text-lg sm:w-16 sm:h-16 sm:text-xl"
                : "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg";

    const shapeClass =
        shape === "circle"
            ? "rounded-full"
            : shape === "rounded"
                ? "rounded-xl"
                : "rounded-md";

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9a-zA-Z]?$/.test(value)) return;
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

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
        <div className={cn("w-full flex flex-col items-center", className)}>

            {label && (
                <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
            )}

            {/* Responsive grid for OTP inputs */}
            <div
                className={cn(
                    "grid justify-center w-full",
                    "gap-2 sm:gap-3 md:gap-3" // reduce gap on mobile
                )}
                style={{
                    gridTemplateColumns: `repeat(${length}, minmax(2rem, 1fr))`,
                }}
            >
                {Array.from({ length }).map((_, index) => (
                    <motion.input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        disabled={disabled}
                        value={otp[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className={cn(
                            "text-center font-semibold border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-150",
                            sizeClass,
                            shapeClass,
                            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
                            disabled && "bg-gray-100 cursor-not-allowed opacity-70",
                            inputClassName
                        )}
                        whileFocus={{ scale: 1.08 }}
                    />
                ))}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 mt-2"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};
