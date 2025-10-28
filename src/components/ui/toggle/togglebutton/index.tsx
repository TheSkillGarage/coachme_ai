import * as React from "react";
import { cn } from "../../../../utils/utils";

interface ToggleButtonProps {
    value: string;
    onToggle?: (val: string) => void;
    activeValue?: string | string[];
    type?: "single" | "multiple";
    className?: string;
    children: React.ReactNode;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    value,
    onToggle,
    activeValue,
    type = "single",
    className,
    children,
}) => {
    const isActive =
        type === "single"
            ? activeValue === value
            : Array.isArray(activeValue) && activeValue.includes(value);

    return (
        <button
            type="button"
            onClick={() => onToggle?.(value)}
            className={cn(
                "inline-flex items-center justify-center h-8 w-8 rounded-md border text-gray-600 border-gray-200 hover:bg-gray-100",
                isActive && "bg-primary-100 text-primary-700 border-primary-200",
                className
            )}
        >
            {children}
        </button>
    );
};
