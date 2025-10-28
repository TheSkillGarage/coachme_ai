import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { menuItems } from "../sidnav/menu";
import { Avatar } from "../../../components/ui/avatar";
import { CustomDropdown } from "../../../components/ui/dropdown";
import { useState } from "react";

interface NavbarProps {
    setSidebarOpen: (open: boolean) => void;
}

interface User {
    name: string;
    avatar?: string | null;
}

interface MenuItem {
    title: string;
    pathname?: string;
    subMenu?: MenuItem[];
  }

// Helper to recursively find the current route title
const findRouteTitle = (items: MenuItem[], pathname: string): string | null => {
    for (const item of items) {
      if (item.pathname === pathname) return item.title;
      if (item.subMenu) {
        const subResult = findRouteTitle(item.subMenu, pathname);
        if (subResult) return subResult;
      }
    }
    return null;
  };

// Helper to get initials from full name
const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

export default function Main({ setSidebarOpen }: NavbarProps) {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    // Example user data 
    const user: User = {
        name: "Innocent Etah",
        avatar: null,
    };

    // Get matching title from menuItems or fallback
    const currentTitle =
        findRouteTitle(menuItems, location.pathname) || "Dashboard";

    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
                {/* Mobile sidebar toggle */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Dynamic title from route */}
                <h1 className="font-semibold text-base text-gray-800">
                    {currentTitle}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {user.avatar ? (
                    <div>
                        <Avatar
                            src={user.avatar}
                            name={user.name}
                            size="md"
                            onClick={() => alert("Avatar clicked!")}
                            className="cursor-pointer"
                        />

                        <CustomDropdown open={open} setOpen={setOpen} width="w-72" align="right">
                            <div className="p-4">
                                <p className="font-semibold text-gray-800">Manually Controlled Menu</p>
                            </div>
                        </CustomDropdown>
                    </div>


                ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500 text-white font-medium border border-gray-200">
                        {getInitials(user.name)}
                    </div>
                )}
            </div>
        </header>
    );
}