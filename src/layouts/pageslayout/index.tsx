
import React from "react";
import TopBar from "./topbar";
import Footer from "./footer";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="flex overflow-hidden flex-col min-h-screen">
            <TopBar />
            <main className="flex-1 ">{children}</main>
            <Footer />
        </div>
    );
};

export default PageLayout;