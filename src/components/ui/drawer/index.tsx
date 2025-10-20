import React from "react";
import { X } from "lucide-react";
import { cn } from "../../../utils/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: "left" | "right" | "top" | "bottom";
    title?: string;
    children?: React.ReactNode;
    width?: string; // e.g. "w-80" or "w-[400px]"
    height?: string; // for top/bottom drawers
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
    open,
    onClose,
    side = "right",
    title,
    children,
    width = "w-96",
    height = "h-80",
    closeOnOverlayClick = true,
    showCloseButton = true,
    className,
}) => {
    const sideClasses = {
        right: `right-0 top-0 h-full ${width}`,
        left: `left-0 top-0 h-full ${width}`,
        top: `top-0 left-0 w-full ${height}`,
        bottom: `bottom-0 left-0 w-full ${height}`,
    };

    const slideVariants = {
        right: { x: "100%", y: 0 },
        left: { x: "-100%", y: 0 },
        top: { y: "-100%", x: 0 },
        bottom: { y: "100%", x: 0 },
    };

    const enterVariants = { x: 0, y: 0 };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => closeOnOverlayClick && onClose()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={slideVariants[side]}
                        animate={enterVariants}
                        exit={slideVariants[side]}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed bg-white shadow-xl z-50 p-5 flex flex-col",
                            sideClasses[side],
                            className
                        )}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between mb-4 pb-2">
                                {title && (
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full hover:bg-gray-100 transition"
                                    >
                                        <X className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
