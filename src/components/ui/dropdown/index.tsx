import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils/utils";

interface CustomDropdownProps {
    trigger?: React.ReactElement<any, any>; // optional trigger element
    open?: boolean; // optional controlled state
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>; // optional controlled setter
    width?: string;
    align?: "left" | "right" | "center";
    className?: string;
    children: React.ReactNode;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    trigger,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    width = "w-48",
    align = "left",
    className,
    children,
}) => {
    // internal state only used if parent didn't provide one
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // decide which state to use
    const isControlled = controlledOpen !== undefined && controlledSetOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? controlledSetOpen : setUncontrolledOpen;

    // toggle dropdown
    const toggleDropdown = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setOpen((prev) => !prev);
    };

    // close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpen]);

    // clone trigger with click
    const triggerWithProps =
        trigger &&
        React.cloneElement(trigger, {
            onClick: (e: React.MouseEvent) => {
                if (trigger.props.onClick) trigger.props.onClick(e);
                toggleDropdown(e);
            },
            "aria-expanded": open,
            "aria-haspopup": "menu",
        });

    const alignmentClass =
        align === "right"
            ? "right-0"
            : align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0";

    return (
        <div
            ref={dropdownRef}
            className="min-w-full relative inline-block text-left select-none"
        >
            {triggerWithProps}

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-md origin-top",
                            width,
                            alignmentClass,
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
