import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboardnav/sidnav";
import Topbar from "../dashboardnav/topnav";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex flex-col flex-1">
                <Topbar setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
