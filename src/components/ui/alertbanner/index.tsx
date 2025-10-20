import React from "react";
import { cn } from "../../../utils/utils";

interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "w-full rounded-xl p-4 flex items-center justify-between",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
