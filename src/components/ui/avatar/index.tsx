import * as React from "react";
import { cn } from "../../../utils/utils";

interface AvatarProps {
    src?: string;                // Image URL
    alt?: string;                // Alt text for image
    name?: string;               // Used for initials fallback
    size?: "sm" | "md" | "lg" | "xl" | string; // Tailwind size or custom
    shape?: "circle" | "rounded" | "square";
    bgColor?: string;            // Tailwind bg class e.g. "bg-primary-500"
    textColor?: string;          // Tailwind text class e.g. "text-white"
    border?: string;             // Tailwind border e.g. "border border-gray-200"
    className?: string;          // Extra styling
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    name,
    size = "md",
    shape = "circle",
    bgColor = "bg-primary-500",
    textColor = "text-white",
    border = "",
    className,
}) => {
    const [imageError, setImageError] = React.useState(false);

    const sizeMap: Record<string, string> = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl",
    };

    const getInitials = (name?: string) => {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        return parts
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const avatarSize = sizeMap[size] || size; // allows custom classes e.g. "w-20 h-20"

    const shapeClass =
        shape === "circle"
            ? "rounded-full"
            : shape === "rounded"
                ? "rounded-xl"
                : "rounded-none";

    return (
        <div
            className={cn(
                "flex items-center justify-center overflow-hidden select-none",
                avatarSize,
                shapeClass,
                border,
                className
            )}
        >
            {src && !imageError ? (
                <img
                    src={src}
                    alt={alt || name || "avatar"}
                    className={cn("object-cover w-full h-full", shapeClass)}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div
                    className={cn(
                        "flex items-center justify-center font-semibold uppercase w-full h-full",
                        bgColor,
                        textColor
                    )}
                >
                    {getInitials(name)}
                </div>
            )}
        </div>
    );
};
