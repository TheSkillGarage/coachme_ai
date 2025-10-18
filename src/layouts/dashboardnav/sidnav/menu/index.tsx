import { Home, Settings, FileText, FileUser, FolderSearch, ListCheck, User, Bell, HelpCircle, ChartLine } from "lucide-react";
import type { MenuState } from "../../../../utils/menuState";



export const menuItems: MenuState[] = [
    {
        icon: <Home className="w-5 h-5" />,
        title: "Dashboard",
        pathname: "/",
    },
    {
        icon: <FileUser className="w-5 h-5" />,
        title: "Resume",
        pathname: "/user/resume",
    },
    {
        icon: <FileText className="w-5 h-5" />,
        title: "Cover Letter",
        pathname: "/user/cover-letter",
    },

    {
        icon: <FolderSearch className="w-5 h-5" />,
        title: "Job Search",
        pathname: "/user/job-search",
    },
    {
        icon: <ListCheck className="w-5 h-5" />,
        title: "Applications",
        pathname: "/user/applications",
    },
    {
        icon: <ChartLine className="w-5 h-5" />,
        title: "Analytics",
        pathname: "/user/analytics",
    },
    {
        icon: <User className="w-5 h-5" />,
        title: "Profile",
        pathname: "/user/profile",
    },
    {
        icon: <Bell className="w-5 h-5" />,
        title: "Notifications",
        pathname: "/user/notifications",
    },
];

export const helperMenuItems: MenuState[] = [
    {
        icon: <HelpCircle className="w-5 h-5" />,
        title: "Help",
        pathname: "/user/help",
    },
    {
        icon: <Settings className="w-5 h-5" />,
        title: "Settings",
        pathname: "/user/settings",
    },
]