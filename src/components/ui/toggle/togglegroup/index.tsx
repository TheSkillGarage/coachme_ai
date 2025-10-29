import * as React from "react";
import { cn } from "../../../../utils/utils";

interface ToggleGroupProps {
    type?: "single" | "multiple";
    value?: string | string[];
    onValueChange?: (value: any) => void;
    className?: string;
    children: React.ReactNode;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
    type = "single",
    value,
    onValueChange,
    className,
    children,
}) => {
    const handleClick = (val: string) => {
        if (!onValueChange) return;
        if (type === "single") {
            onValueChange(val);
        } else {
            const arr = Array.isArray(value) ? [...value] : [];
            if (arr.includes(val)) {
                onValueChange(arr.filter((v) => v !== val));
            } else {
                onValueChange([...arr, val]);
            }
        }
    };

    // Pass context to buttons
    return (
        <div className={cn("inline-flex items-center", className)}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<any>, {
                        activeValue: value,
                        type,
                        onToggle: handleClick,
                    })
                    : child
            )}
        </div>
    );
};
