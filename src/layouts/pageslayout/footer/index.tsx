import {
    Mail,
    Linkedin,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import Logo from "../../../assets/coachmeai.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-50 text-gray-700">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo and Description */}
                <div>
                    <div className="flex flex-col items-start">
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
                        <p className="text-sm text-gray-600 mt-2 mb-4">
                            Your automated job application partner to land your dream job faster.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Mail, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Twitter, href: "#" },
                            ].map(({ icon: Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:border-primary-500 hover:text-primary-500 transition"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-primary-500">Automated Job Application</a></li>
                        <li><a href="#" className="hover:text-primary-500">Resume</a></li>
                        <li><a href="#" className="hover:text-primary-500">Cover Letter Generator</a></li>
                        <li><a href="#" className="hover:text-primary-500">Application Tracker</a></li>
                        <li><a href="#" className="hover:text-primary-500">Real-time Analytics</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#home" className="hover:text-primary-500">Home</a></li>
                        <li><a href="#features" className="hover:text-primary-500">Features</a></li>
                        <li><a href="#how-it-works" className="hover:text-primary-500">How it Works</a></li>
                        <li><a href="#testimonials" className="hover:text-primary-500">Testimonials</a></li>
                        <li><a href="#faqs" className="hover:text-primary-500">FAQs</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-primary-500">Terms and Condition</a></li>
                        <li><a href="#" className="hover:text-primary-500">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-6">
                <p className="text-center text-sm text-gray-500 py-4">
                    © {currentYear} CoachMe AI. All Rights Reserved
                </p>
            </div>
        </footer>
    );
}
