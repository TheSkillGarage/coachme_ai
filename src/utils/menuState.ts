export interface MenuState {
    icon?: any;
    title: string;
    pathname?: string;
    subMenu?: MenuState[];
    ignore?: boolean;
    blank?: boolean;
    suffix?: any;
    bullet?: boolean;
    color?: string;
    onClick?: React.EventHandler<any>
}
