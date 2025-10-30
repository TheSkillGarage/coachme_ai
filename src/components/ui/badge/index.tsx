import * as React from "react";
import { cn } from "../../../utils/utils";

interface BadgeProps {
    children: React.ReactNode;              // Badge content (text or icon)
    variant?: "solid" | "soft" | "outline"; // Style variant
    color?: string;                         // Tailwind color e.g. "primary", "gray", "red", etc.
    size?: "sm" | "md" | "lg";              // Badge size
    rounded?: string;                       // e.g. "rounded-full", "rounded-md"
    className?: string;                     // Custom styles
    onClick?: (e: React.MouseEvent) => void;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "solid",
    color = "primary",
    size = "md",
    rounded = "rounded-full",
    className,
    onClick
}) => {
    // Size styles
    const sizeClasses =
        size === "sm"
            ? "text-xs px-2 py-0.5"
            : size === "lg"
                ? "text-sm px-3 py-1.5"
                : "text-sm px-2.5 py-1";

    // Color + variant logic
    const variantClasses = {
        solid: `bg-${color}-500 text-white`,
        soft: `bg-${color}-100 text-${color}-700`,
        outline: `border border-${color}-500 text-${color}-600 bg-transparent`,
    }[variant];

    return (
        <span
            className={cn(
                "inline-flex items-center font-medium select-none",
                sizeClasses,
                rounded,
                variantClasses,
                className
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
};
