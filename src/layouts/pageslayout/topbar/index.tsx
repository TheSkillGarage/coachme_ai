import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../../assets/coachmeai.png";
import Button from "../../../components/ui/button/button";
import { useNavigate } from "react-router-dom";

const navLinks = [
    { name: "Home", path: "#home" },
    { name: "Features", path: "#features" },
    { name: "How it Works", path: "#how-it-works" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "FAQs", path: "#faqs" },
];

export default function LandingNavbar() {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const navigate = useNavigate()

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            setOpen(false);
        }
    };

    useEffect(() => {
        const handleScrollSpy = () => {
            const scrollPosition = window.scrollY + 120; // offset for navbar height
            navLinks.forEach((link) => {
                const section = document.querySelector(link.path);
                if (section) {
                    const el = section as HTMLElement;
                    const top = el.offsetTop;
                    const height = el.clientHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(link.path);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScrollSpy);
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, []);

    return (
        <header className="fixed w-full bg-white border-b border-gray-50 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 py-2 md:py-3">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md">
                        <img
                            src={Logo}
                            alt="CoachMe AI Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                    <span className="mt-0.5 text-sm font-semibold text-primary-700 leading-none">
                        Coach<span className="text-primary-500">Me AI</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => handleScroll(e, link.path)}
                            className={`text-sm font-medium transition-colors ${activeSection === link.path
                                ? "text-primary-500 underline underline-offset-4 decoration-2"
                                : "text-gray-500 hover:text-primary-500"
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Button
                        variant="outline"
                        color="text-primary-500"
                        border="border-primary-500"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                    <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white">
                    <nav className="flex flex-col items-start px-6 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                onClick={(e) => handleScroll(e, link.path)}
                                className={`text-sm font-medium transition-colors ${activeSection === link.path
                                    ? "text-primary-500 underline underline-offset-4 decoration-2"
                                    : "text-gray-700 hover:text-primary-700"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex flex-col w-full gap-3 pt-2">
                            <Button
                                variant="outline"
                                color="text-primary-500"
                                border="border-primary-500"
                                onClick={() => navigate("/login")}
                                className="cursor-pointer"
                            >
                                Login
                            </Button>
                            <Button className="cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
