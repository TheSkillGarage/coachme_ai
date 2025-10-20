import React, { useState } from "react";
import { cn } from "../../../utils/utils";

interface Tab {
    label: string;
    value: string;
    icon?: React.ReactNode;
    content?: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    tabClassName?: string;
    activeTabClassName?: string;
    contentClassName?: string;
    containerClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultValue,
    onChange,
    orientation = "horizontal",
    tabClassName,
    activeTabClassName,
    contentClassName,
    containerClassName,
}) => {
    const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

    const handleTabClick = (value: string) => {
        setActiveTab(value);
        onChange?.(value);
    };

    return (
        <div
            className={cn(
                "flex",
                orientation === "vertical" ? "flex-row gap-6" : "flex-col",
                containerClassName
            )}
        >
            {/* Tab List */}
            <div
                className={cn(
                    "flex border-b border-gray-200",
                    orientation === "vertical" &&
                    "flex-col border-b-0 border-r border-gray-200"
                )}
            >
                {tabs.map((tab) => {
                    const isActive = tab.value === activeTab;
                    return (
                        <button
                            key={tab.value}
                            onClick={() => handleTabClick(tab.value)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                                "hover:text-primary-600",
                                isActive
                                    ? "border-b-2 border-primary-500 text-primary-600"
                                    : "text-gray-500 border-b-2 border-transparent",
                                orientation === "vertical" &&
                                (isActive
                                    ? "border-b-0 border-r-2 border-primary-500"
                                    : "border-b-0 border-r-2 border-transparent"),
                                tabClassName,
                                isActive && activeTabClassName
                            )}
                        >
                            {tab.icon && <span className="text-lg">{tab.icon}</span>}
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div
                className={cn(
                    "p-4 bg-white rounded-md shadow-sm",
                    orientation === "vertical" && "flex-1",
                    contentClassName
                )}
            >
                {tabs.map(
                    (tab) =>
                        tab.value === activeTab && (
                            <div key={tab.value} className="animate-fadeIn">
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};
