import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/utils";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    color?: string; // e.g. "bg-primary-600"
    customSize?: "sm" | "md" | "lg"; // ✅ renamed from 'size'
}

export default function Radio({
    label,
    color = "bg-primary-500",
    customSize = "md",
    className,
    checked,
    disabled,
    ...props
}: RadioProps) {
    const sizeClasses =
        customSize === "sm"
            ? "w-4 h-4"
            : customSize === "lg"
                ? "w-6 h-6"
                : "w-5 h-5";

    return (
        <label
            className={cn(
                "flex items-center gap-2 cursor-pointer select-none",
                disabled && "cursor-not-allowed opacity-60",
                className
            )}
        >
            <div className="relative flex items-center justify-center">
                {/* Outer Circle */}
                <div
                    className={cn(
                        "border-2 rounded-full flex items-center justify-center transition-all duration-200",
                        sizeClasses,
                        disabled
                            ? "border-gray-300"
                            : checked
                                ? "border-primary-500" // ✅ active border color
                                : "border-gray-400 hover:border-primary-500 focus:border-primary-500"
                    )}
                >
                    {/* Hidden Input */}
                    <input
                        type="radio"
                        className="absolute opacity-0 cursor-pointer"
                        checked={checked}
                        disabled={disabled}
                        {...props}
                    />

                    {/* Inner Dot (Animated) */}
                    {checked && (
                        <motion.div
                            layoutId="radio-dot"
                            className={cn(
                                "rounded-full",
                                customSize === "sm"
                                    ? "w-2 h-2"
                                    : customSize === "lg"
                                        ? "w-3 h-3"
                                        : "w-2.5 h-2.5",
                                color
                            )}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    )}
                </div>
            </div>

            {label && (
                <span
                    className={cn(
                        "text-sm font-medium",
                        disabled ? "text-gray-400" : "text-gray-700"
                    )}
                >
                    {label}
                </span>
            )}
        </label>
    );
}
