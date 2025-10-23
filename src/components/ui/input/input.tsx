import * as React from "react";
import { cn } from "../../../utils/utils";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    error?: string;
    helperText?: string;
    size?: "sm" | "md" | "lg";
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    variant?: "outline" | "filled" | "ghost";
    className?: string;
    inputClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            error,
            helperText,
            size = "md",
            rounded = "md",
            variant = "outline",
            className,
            inputClassName,
            ...props
        },
        ref
    ) => {
        const baseSize =
            size === "sm"
                ? "h-9 text-sm px-3"
                : size === "lg"
                    ? "h-14 text-lg px-5"
                    : "h-11 text-base px-4";

        const roundness =
            rounded === "none"
                ? "rounded-none"
                : rounded === "sm"
                    ? "rounded-sm"
                    : rounded === "lg"
                        ? "rounded-lg"
                        : rounded === "full"
                            ? "rounded-full"
                            : "rounded-md";

        const variantClass =
            variant === "filled"
                ? "bg-gray-100 border border-transparent focus:bg-white focus:border-primary-500"
                : variant === "ghost"
                    ? "bg-transparent border border-transparent focus:border-primary-500"
                    : "border border-gray-300 focus:border-primary-500";

        return (
            <div className={cn("w-full flex flex-col", className)}>
                {label && (
                    <label
                        htmlFor={props.id}
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}

                <div
                    className={cn(
                        "flex items-center relative transition-all duration-150",
                        roundness,
                        variantClass,
                        baseSize,
                        error
                            ? "border-red-500 focus-within:border-red-500"
                            : "focus-within:ring-2 focus-within:ring-primary-500",
                        "bg-white"
                    )}
                >
                    {LeftIcon && (
                        <LeftIcon className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
                    )}

                    <input
                        ref={ref}
                        {...props}
                        className={cn(
                            "flex-1 bg-transparent outline-none placeholder:text-gray-400",
                            LeftIcon && "pl-9",
                            RightIcon && "pr-9",
                            "w-full",
                            inputClassName
                        )}
                    />

                    {RightIcon && (
                        <RightIcon className="w-5 h-5 text-gray-400 absolute right-3 pointer-events-none" />
                    )}
                </div>

                {error ? (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                    >
                        {error}
                    </motion.p>
                ) : helperText ? (
                    <p className="text-xs text-gray-500 mt-1">{helperText}</p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";
