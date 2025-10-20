import * as React from "react";
import { cn } from "../../../utils/utils";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;           // Content inside the card
    className?: string;                  // Extra styles for customization
    hoverable?: boolean;                 // Adds hover animation & shadow
    animated?: boolean;                  // Enables subtle entrance animation
    padding?: string;                    // e.g. "p-4" or "p-6"
    shadow?: string;                     // e.g. "shadow-lg" or "shadow-none"
    rounded?: string;                    // e.g. "rounded-xl" or "rounded-3xl"
    bg?: string;                         // Background color (default: white)
    border?: string;                     // Border style (optional)
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    hoverable = true,
    animated = false,
    padding = "p-4",
    shadow = "shadow-md",
    rounded = "rounded-2xl",
    bg = "bg-white",
    border = "border border-gray-100",
}) => {
    const baseClasses = cn(
        "relative transition-all duration-200 ease-in-out",
        bg,
        border,
        padding,
        rounded,
        shadow,
        hoverable && "hover:shadow-lg hover:-translate-y-1",
        className
    );

    if (animated) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={baseClasses}
            >
                {children}
            </motion.div>
        );
    }

    return <div className={baseClasses}>{children}</div>;
};
