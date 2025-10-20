import React from "react";
import { cn } from "../../../utils/utils"; // for conditional classNames if you use shadcn/ui

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    rounded?: boolean | string;
    animated?: boolean;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = "100%",
    height = "1rem",
    rounded = true,
    animated = true,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "bg-gray-50 dark:bg-gray-400",
                rounded === true
                    ? "rounded-md"
                    : typeof rounded === "string"
                        ? `rounded-${rounded}`
                        : "",
                animated && "animate-pulse",
                className
            )}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
            }}
            {...props}
        />
    );
};

export default Skeleton;
