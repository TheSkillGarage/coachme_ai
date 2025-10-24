import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { helperMenuItems, menuItems } from "./menu";
import { ChevronDown, ChevronUp, LogOut, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../assets/coachmeai.png";
import LogoutDialog from "../../../components//auth/logout";

interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Main({ open, setOpen }: SidebarProps) {
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const performLogout = async () => {
        // simulate API delay
        await new Promise(res => setTimeout(res, 1500));
        localStorage.removeItem("user");
        window.location.href = "/login";
    };
    const location = useLocation();

    const toggleSubmenu = (title: string) => {
        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    // Animation variants
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
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

                <div className="flex items-center justify-center mb-4 mt-[32px]">
                    <div className="text-center">
                        <img src={Logo} className="h-[30px] w-[45px] mx-auto" alt="Logo" />
                        <h1 className="text-lg font-semibold text-primary-500 mt-1">
                            CoachMe AI
                        </h1>
                    </div>
                </div>

                {/* Main Navigation */}
                <motion.nav
                    className="w-[80%] m-auto space-y-1"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    key={location.pathname}
                >
                    {menuItems.map((item) => (
                        <motion.div key={item.title} variants={itemVariants}>
                            {item.subMenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.title)}
                                        className="flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 font-medium"
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

                                    {/* Submenu animation */}
                                    <AnimatePresence>
                                        {openMenus.includes(item.title) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden ml-2 bg-gray-50 rounded-lg mt-1"
                                            >
                                                <motion.ul
                                                    variants={listVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    className="py-1"
                                                >
                                                    {item.subMenu.map((sub, index) => (
                                                        <motion.li key={index} variants={itemVariants}>
                                                            <NavLink
                                                                to={sub.pathname ?? "#"}
                                                                className={({ isActive }) => {
                                                                    const active =
                                                                        isActive ||
                                                                        (sub.pathname === "/" &&
                                                                            location.pathname.startsWith(
                                                                                "/user/dashboard"
                                                                            ));

                                                                    return `flex font-normal items-center gap-2 px-3 py-2 rounded-lg transition ${active
                                                                        ? "text-primary-500 bg-purple-500"
                                                                        : "text-gray-600 hover:bg-gray-100"
                                                                        }`;
                                                                }}
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                {sub.icon && <span>{sub.icon}</span>}
                                                                <span>{sub.title}</span>
                                                            </NavLink>
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <NavLink
                                    to={item.pathname ?? "#"}
                                    className={({ isActive }) => {
                                        const active =
                                            isActive ||
                                            (item.pathname === "/" &&
                                                location.pathname.startsWith("/user/dashboard"));

                                        return `flex font-normal text-sm items-center gap-2 px-3 py-[8px] rounded-lg transition ${active
                                            ? "text-primary-500 bg-purple-500"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`;
                                    }}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.icon && <span>{item.icon}</span>}
                                    <span>{item.title}</span>
                                </NavLink>
                            )}
                        </motion.div>
                    ))}
                </motion.nav>

                {/* Helper menu */}
                <motion.nav
                    className="w-[80%] m-auto space-y-1 pt-[70px]"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {helperMenuItems.map((item) => (
                        <motion.div key={item.title} variants={itemVariants}>
                            <NavLink
                                to={item.pathname ?? "#"}
                                className={({ isActive }) => {
                                    const active =
                                        isActive ||
                                        (item.pathname === "/" &&
                                            location.pathname.startsWith("/user/dashboard"));

                                    return `flex font-normal text-sm items-center gap-2 px-3 py-[8px] rounded-lg transition ${active
                                        ? "text-primary-500 bg-purple-500"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`;
                                }}
                                onClick={() => setOpen(false)}
                            >
                                {item.icon && <span>{item.icon}</span>}
                                <span>{item.title}</span>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.nav>

                {/* Logout */}
                <motion.div
                    className="w-[80%] space-y-1 m-auto px-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                >
                    <button
                        onClick={() => setIsLogoutOpen(true)}
                        className="flex mt-[8px] items-center font-normal text-sm text-grey-400 hover:cursor-pointer hover:text-primary-500"
                    >
                        <LogOut className="w-5 h-5 " />
                        <p className="ml-2">Log Out</p>
                    </button>
                </motion.div>
            </aside>
            <LogoutDialog
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                clickOverlayToClose={false}
            />
        </>
    );
}
