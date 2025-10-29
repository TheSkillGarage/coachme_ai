// components/ui/checkbox.tsx
import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../../utils/utils";

interface CheckboxProps {
    name?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    color?: string;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(e.target.checked);
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
                onChange={handleChange}
                disabled={disabled}
                className="hidden"
            />

            {/* Styled visual checkbox */}
            <div
                className={cn(
                    "flex items-center justify-center rounded border transition-colors",
                    sizes[size],
                    checked
                        ? `${color} border-transparent text-white`
                        : "border-gray-300 bg-white text-transparent hover:border-gray-400"
                )}
            >
                {checked && <Check className="w-3 h-3" strokeWidth={3} />}
            </div>

            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
};