import React from "react";

interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export default function Textarea({
    label,
    error,
    helperText,
    className = "",
    ...rest
}: CustomTextareaProps) {
    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-grey-500 mb-1">{label}</label>}
            <textarea
                className={`w-full rounded-lg placeholder:text-grey-100 border p-2 text-sm outline-none transition  focus:ring-primary-500 focus:border-primary-500 ${error ? "border-red-500" : "border-gray-300"
                    }`}
                {...rest}
            />
            {helperText && !error && <p className="text-xs text-grey-50 mt-1">{helperText}</p>}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
