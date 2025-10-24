import * as React from "react";
import { cn } from "../../../utils/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: "sm" | "md" | "lg" | "xl" | string;
    shape?: "circle" | "rounded" | "square";
    bgColor?: string;
    textColor?: string;
    border?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement | HTMLButtonElement, AvatarProps>(
    (
        {
            src,
            alt,
            name,
            size = "md",
            shape = "circle",
            bgColor = "bg-primary-500",
            textColor = "text-white",
            border = "",
            className,
            onClick,
            ...props
        },
        ref
    ) => {
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

        const avatarSize = sizeMap[size] || size;
        const shapeClass =
            shape === "circle"
                ? "rounded-full"
                : shape === "rounded"
                    ? "rounded-xl"
                    : "rounded-none";

        // 👇 Choose element type dynamically
        const Component: any = onClick ? "button" : "div";

        return (
            <Component
                ref={ref as any}
                onClick={onClick}
                type={onClick ? "button" : undefined}
                {...props}
                className={cn(
                    "flex items-center justify-center overflow-hidden select-none",
                    avatarSize,
                    shapeClass,
                    border,
                    onClick && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
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
            </Component>
        );
    }
);

Avatar.displayName = "Avatar";
