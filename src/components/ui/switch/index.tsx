import React from "react";
import { cn } from "../../../utils/utils";

interface SwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    activeColor?: string; // Tailwind color class, e.g. "bg-primary-500"
    inactiveColor?: string; // Tailwind color class, e.g. "bg-gray-300"
}

export const Switch: React.FC<SwitchProps> = ({
    checked = false,
    onChange,
    disabled = false,
    size = "md",
    activeColor = "bg-primary-500",
    inactiveColor = "bg-gray-300",
}) => {
    const sizes = {
        sm: { width: "w-8", height: "h-4", knob: "w-3 h-3 translate-x-1" },
        md: { width: "w-10", height: "h-5", knob: "w-4 h-4 translate-x-1" },
        lg: { width: "w-12", height: "h-6", knob: "w-5 h-5 translate-x-1.5" },
        xl: { width: "w-14 lg:w-18", height: "h-8 lg:h-10", knob: "w-6 h-6 lg:w-8 lg:h-8 translate-x-1.5" }
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange?.(!checked)}
            className={cn(
                "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer",
                checked ? activeColor : inactiveColor,
                sizes[size].width,
                sizes[size].height,
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <span
                className={cn(
                    "absolute left-0.5 bg-white rounded-full shadow transform transition-transform duration-200",
                    sizes[size].knob,
                    checked &&
                    (size === "sm"
                        ? "translate-x-4"
                        : size === "md"
                            ? "translate-x-5"
                            : size === "lg"
                                ? "translate-x-6"
                                : "translate-x-6 lg:translate-x-8")
                )}
            />
        </button>
    );
};
