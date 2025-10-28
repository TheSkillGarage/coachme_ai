import React from "react";

export interface MenuState {
    icon?: React.ReactNode; 
    title: string;
    pathname?: string;
    subMenu?: MenuState[];
    ignore?: boolean;
    blank?: boolean;
    suffix?: React.ReactNode;
    bullet?: boolean;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}