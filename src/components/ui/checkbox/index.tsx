import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../../utils/utils";

interface CheckboxProps {
    name?: string; // 👈 added name prop
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    color?: string; // Tailwind class for active color (e.g., "bg-primary-500")
    size?: "sm" | "md" | "lg";
}

export const Checkbox: React.FC<CheckboxProps> = ({
    name,
    checked = false,
    onChange,
    label,
    disabled = false,
    color = "bg-primary-500",
    size = "md",
}) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <label
            className={cn(
                "inline-flex items-center gap-2 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {/* Hidden input for form compatibility */}
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => handleChange()}
                disabled={disabled}
                className="hidden"
            />

            {/* Styled visual checkbox */}
            <button
                type="button"
                onClick={handleChange}
                className={cn(
                    "flex items-center justify-center rounded border transition-colors",
                    sizes[size],
                    checked
                        ? `${color} border-transparent text-white`
                        : "border-gray-300 bg-white text-transparent"
                )}
            >
                {checked && <Check className="w-3 h-3" strokeWidth={3} />}
            </button>

            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
};
