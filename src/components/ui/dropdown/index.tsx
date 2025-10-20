import * as React from "react";
import { cn } from "../../../utils/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CustomDropdownProps {
    trigger: React.ReactNode; // What opens the dropdown (e.g. avatar, button, icon)
    children: React.ReactNode; // Content inside the dropdown
    width?: string; // e.g. "w-64" or "w-80"
    align?: "left" | "right" | "center";
    className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    trigger,
    children,
    width = "w-64",
    align = "right",
    className,
}) => {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Alignment logic
    const alignment =
        align === "left"
            ? "left-0"
            : align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "right-0";

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setOpen(!open)} className="cursor-pointer select-none">
                {trigger}
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute mt-2 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50",
                            width,
                            alignment,
                            className
                        )}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
