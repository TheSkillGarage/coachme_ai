import React from "react";
import { cn } from "../../utils/utils"; // optional helper for merging classNames
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "outline" | "ghost";
    color?: string; // e.g. text-primary-700
    bg?: string; // e.g. bg-primary-700
    border?: string; // e.g. border-primary-700
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    loading?: boolean;
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    size?: "sm" | "md" | "lg";
}

/**
 * Reusable Button component.
 * Fully customizable via props.
 */
const Button: React.FC<ButtonProps> = ({
    children,
    variant = "solid",
    color = "text-white",
    bg = "bg-primary-500",
    border = "border-primary-500",
    icon,
    iconPosition = "left",
    loading = false,
    rounded = "md",
    size = "md",
    disabled,
    className,
    ...props
}) => {
    const sizeClasses =
        size === "sm"
            ? "px-3 py-1.5 text-sm"
            : size === "lg"
                ? "px-6 py-3 text-base"
                : "px-5 py-2 text-sm";

    const roundedClasses =
        rounded === "none"
            ? "rounded-none"
            : rounded === "sm"
                ? "rounded-sm"
                : rounded === "lg"
                    ? "rounded-lg"
                    : rounded === "full"
                        ? "rounded-full"
                        : "rounded-md";

    let variantClasses = "";
    switch (variant) {
        case "outline":
            variantClasses = `border ${border} ${color} bg-transparent hover:bg-opacity-10`;
            break;
        case "ghost":
            variantClasses = `${color} bg-transparent hover:bg-gray-50`;
            break;
        default:
            variantClasses = `${bg} ${color} hover:opacity-90`;
    }

    return (
        <button
            disabled={disabled || loading}
            className={cn(
                "flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
                !disabled && !loading && "cursor-pointer",
                sizeClasses,
                roundedClasses,
                variantClasses,
                className
            )}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {!loading && icon && iconPosition === "left" && icon}
            <span>{children}</span>
            {!loading && icon && iconPosition === "right" && icon}
        </button>
    );
};

export default Button;
