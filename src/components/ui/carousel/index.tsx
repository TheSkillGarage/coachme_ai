import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../utils/utils";

interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number; // in ms
    className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
    children,
    autoPlay = true,
    interval = 5000,
    className,
}) => {
    const [current, setCurrent] = useState(0);
    const total = children.length;

    const next = () => setCurrent((prev) => (prev + 1) % total);
    const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(next, interval);
        return () => clearInterval(timer);
    }, [current, autoPlay, interval]);

    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {children[current]}
                </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <button
                onClick={prev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {children.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-3 h-3 rounded-full",
                            current === index ? "bg-white" : "bg-gray-400"
                        )}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
