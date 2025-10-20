import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils/utils";

interface ModalProps {
    open: boolean;                      // Controls visibility
    onClose: () => void;                // Called when modal closes
    children: React.ReactNode;          // Content inside modal
    width?: string;                     // Tailwind width (default: w-full max-w-md)
    closeOnBackdropClick?: boolean;     // Whether to close when clicking outside
    className?: string;                 // Custom wrapper styles
    overlayClassName?: string;          // Custom overlay styles
}

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    width = "w-full max-w-md",
    closeOnBackdropClick = true,
    className,
    overlayClassName,
}) => {
    // Close modal on ESC key press
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className={cn(
                        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm",
                        overlayClassName
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeOnBackdropClick ? onClose : undefined}
                >
                    <motion.div
                        className={cn(
                            "bg-white rounded-2xl shadow-xl overflow-hidden",
                            width,
                            className
                        )}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
