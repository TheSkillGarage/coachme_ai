import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { cn } from "../../../utils/utils";

export interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    label?: string;
    placeholder?: string;
    options: Option[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    searchable?: boolean;
    multiple?: boolean;
    variant?: "solid" | "outline" | "ghost";
    disabled?: boolean;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    placeholder = "Select option",
    options,
    value = [],
    onChange,
    searchable = false,
    multiple = false,
    variant = "outline",
    disabled = false,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);

    // --- Close dropdown when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isMulti = Array.isArray(value);
    const selectedValues = multiple
        ? (value as string[])
        : value
            ? [value as string]
            : [];

    const filteredOptions = searchable
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        )
        : options;

    const baseStyle =
        "relative w-full cursor-pointer rounded-2xl transition-all duration-200";
    const variantStyles = {
        solid: "bg-primary-600 text-white border border-primary-600 hover:bg-primary-700",
        outline:
            "bg-white border border-gray-300 hover:border-primary-400 text-gray-800",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    };

    const handleSelect = (val: string) => {
        if (multiple) {
            if (selectedValues.includes(val)) {
                onChange?.(selectedValues.filter((v) => v !== val));
            } else {
                onChange?.([...selectedValues, val]);
            }
        } else {
            onChange?.(val);
            setIsOpen(false);
        }
    };

    const removeItem = (val: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(selectedValues.filter((v) => v !== val));
    };

    return (
        <div className="flex flex-col gap-2 w-full" ref={selectRef}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

            <div
                className={cn(
                    baseStyle,
                    variantStyles[variant],
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
            >
                {/* Selected Values */}
                <div
                    className={cn(
                        "flex flex-wrap gap-2 items-center justify-between px-4 py-3 text-sm rounded-2xl",
                        variant === "outline" && "bg-white"
                    )}
                >
                    <div className="flex flex-wrap gap-2 items-center">
                        {selectedValues.length > 0 ? (
                            multiple ? (
                                selectedValues.map((val) => {
                                    const option = options.find((o) => o.value === val);
                                    return (
                                        <div
                                            key={val}
                                            className="flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-xl text-sm"
                                        >
                                            <span>{option?.label}</span>
                                            <button
                                                className="focus:outline-none hover:text-primary-900"
                                                onClick={(e) => removeItem(val, e)}
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <span className="text-gray-800 font-medium">
                                    {options.find((o) => o.value === selectedValues[0])?.label}
                                </span>
                            )
                        ) : (
                            <span className="text-gray-400">{placeholder}</span>
                        )}
                    </div>

                    <ChevronDown
                        className={cn(
                            "w-4 h-4 ml-auto transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg">
                        {searchable && (
                            <div className="flex items-center px-3 py-2 border-b border-gray-100">
                                <Search className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full text-sm outline-none bg-transparent"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                        <div className="max-h-56 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onClick={() => handleSelect(opt.value)}
                                        className={cn(
                                            "flex justify-between items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition",
                                            selectedValues.includes(opt.value) &&
                                            "bg-gray-100 font-semibold"
                                        )}
                                    >
                                        {opt.label}
                                        {selectedValues.includes(opt.value) && (
                                            <Check className="w-4 h-4 text-primary-600" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-gray-400 text-sm">No results</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
