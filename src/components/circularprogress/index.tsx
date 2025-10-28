import { motion } from "framer-motion";

export default function GradientLoader() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <motion.svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-[-90deg]"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                }}
            >
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#67005E" />
                        <stop offset="100%" stopColor="#E3BEE0" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradientStroke)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="440"
                    strokeDashoffset="100"
                    fill="none"
                />
            </motion.svg>
        </div>
    );
}
