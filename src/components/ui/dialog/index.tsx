import React, { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../../utils/utils";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string | ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
    bgColor?: string;
    showCloseButton?: boolean; // optional flag to show/hide X button
    closeOnOverlayClick?: boolean; // whether clicking overlay closes dialog
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className,
    bgColor = "bg-white",
    showCloseButton = true,
    closeOnOverlayClick = true, // default: true
}) => {
    const handleOverlayClick = () => {
        if (closeOnOverlayClick) onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOverlayClick} // overlay click
                >
                    <motion.div
                        className={cn(
                            "rounded-lg shadow-lg w-full max-w-lg mx-4",
                            bgColor,
                            className
                        )}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // prevent bubbling
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-2">
                            {title && <h3 className="text-lg font-semibold">{title}</h3>}
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-4">{children}</div>

                        {/* Footer */}
                        {footer && <div className="px-4 py-2">{footer}</div>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dialog;
