import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { helperMenuItems, menuItems } from "./menu";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import Logo from '../../../assets/coachmeai.png'
interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Main({ open, setOpen }: SidebarProps) {
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const location = useLocation()

    const toggleSubmenu = (title: string) => {
        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Header */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 md:hidden"
                >
                    ✕
                </button>
                <div className="md:w-[90%] md:flex-start flex items-center justify-center  pv-4 mb-[16px] mt-[32px]">
                    <div className="">
                        <img src={Logo} className="h-[35] w-[35px] m-auto" alt="" />
                        <h1 className="text-lg font-semibold text-primary-500">CoachMe AI</h1>
                    </div>

                </div>

                {/* Navigation */}
                <nav className="w-[80%] m-auto space-y-1">
                    {menuItems.map((item) => (
                        <div key={item.title} className="py-[4px]">
                            {item.subMenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.title)}
                                        className="flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon && <span>{item.icon}</span>}
                                            <span>{item.title}</span>
                                        </div>
                                        {openMenus.includes(item.title) ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </button>

                                    {/* Submenu items */}
                                    {openMenus.includes(item.title) && (
                                        <div className="bg-gray-500 rounded-lg">
                                            {item.subMenu.map((sub) => (
                                                <NavLink
                                                    to={item.pathname ?? "#"}
                                                    className={({ isActive }) => {
                                                        const isDashboard =
                                                            item.pathname === "/" || item.pathname === "/dashboard";
                                                        const isDashboardActive =
                                                            isDashboard && location.pathname.startsWith("/user/dashboard");

                                                        const active = isActive || isDashboardActive;

                                                        return `flex font-normal items-center gap-2 px-3 py-2 rounded-lg transition ${active
                                                            ? "text-primary-500 bg-purple-500"
                                                            : "text-gray-700 hover:bg-gray-100"
                                                            }`;
                                                    }}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {item.icon && <span>{item.icon}</span>}
                                                    <span>{item.title}</span>
                                                </NavLink>

                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="">
                                    <NavLink
                                        to={item.pathname ?? "#"}
                                        className={({ isActive }) => {
                                            const isDashboard =
                                                item.pathname === "/" || item.pathname === "/dashboard";
                                            const isDashboardActive =
                                                isDashboard && location.pathname.startsWith("/user/dashboard");

                                            const active = isActive || isDashboardActive;

                                            return `flex font-normal text-sm items-center gap-2 px-3 py-[8px] rounded-lg transition ${active
                                                ? "text-primary-500 bg-purple-500"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`;
                                        }}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.icon && <span>{item.icon}</span>}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </div>

                            )}
                        </div>
                    ))}
                </nav>
                <nav className="w-[80%] m-auto space-y-1 pt-[34px]">
                    {helperMenuItems.map((item) => (
                        <NavLink
                            to={item.pathname ?? "#"}
                            className={({ isActive }) => {
                                const isDashboard =
                                    item.pathname === "/" || item.pathname === "/dashboard";
                                const isDashboardActive =
                                    isDashboard && location.pathname.startsWith("/user/dashboard");

                                const active = isActive || isDashboardActive;

                                return `flex font-normal text-sm items-center gap-2 px-3 py-[8px] rounded-lg transition ${active
                                    ? "text-primary-500 bg-purple-500"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`;
                            }}
                            onClick={() => setOpen(false)}
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.title}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="w-[80%] m-auto">
                    <button className="flex  items-center font-normal text-sm text-gray-700 hover:cursor-pointer" >
                        <LogOut className="w-5 h-5  m-2 text-gray-700 hover:text-gray-900" />
                        LogOut
                    </button>
                </div>
            </aside>
        </>
    );
}
