import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Copy, Download, Save, SquarePen } from "lucide-react";
import LetterDialog from "./letterdialog";
interface LetterScreenProps {
    onEdit: () => void;
}
export default function LetterScreen({ onEdit }: LetterScreenProps) {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<"save" | "download">("save");
    return (
        <Card
            hoverable={false}
            className="
                flex flex-col justify-center items-center 
                shadow-none border border-gray-100 
                rounded-xl w-full min-h-[80vh] 
                gap-y-6 px-4 sm:px-6 py-6 
                overflow-hidden
            "
        >
            {/* Letter Content */}
            <Card
                hoverable={false}
                className="
                    shadow-none border border-gray-100 
                    rounded-lg w-full max-w-3xl p-4 sm:p-6 
                    text-gray-700 text-sm leading-relaxed
                "
            >
                <p className="text-grey-400 text-xs md:text-xs">
                    <span className="block py-4 font-medium text-gray-700">
                        Dear Hiring Manager,
                    </span>
                    I am writing to express my interest in the Frontend Developer
                    position at TechCorp. With over 5 years of experience in web
                    development and a passion for creating intuitive user
                    interfaces, I believe I would be a valuable addition to your
                    team.
                    <br />
                    <br />
                    Throughout my career, I have developed expertise in React,
                    TypeScript, and modern frontend frameworks. In my current role
                    at InnovateSoft, I led the development of a customer-facing
                    application that improved user engagement by 40% and reduced
                    bounce rates by 25%.
                    <br />
                    <br />
                    I am particularly drawn to TechCorp's mission to make
                    technology accessible to everyone. Your recent project on
                    developing inclusive design systems aligns perfectly with my
                    interest in creating accessible web applications.
                    <br />
                    <br />
                    I would welcome the opportunity to discuss how my skills and
                    experience can contribute to TechCorp's continued success.
                    Thank you for considering my application.
                    <div className="py-4">
                        <span className="block font-medium">Sincerely,</span>
                        <span className="block">[Your Name]</span>
                    </div>
                </p>
            </Card>

            {/* Action Buttons */}
            <div
                className="
                    flex flex-col sm:flex-row justify-between items-center 
                    w-full max-w-3xl gap-3 sm:gap-4
                "
            >
                {/* Left Buttons */}
                <div
                    className="
                        flex flex-wrap justify-center sm:justify-start 
                        gap-1  sm:w-auto
                    "
                >
                    <button
                        onClick={onEdit}
                        className="
                            flex items-center justify-center gap-1
                            cursor-pointer px-3 py-2 rounded-lg text-sm 
                            border border-gray-200 text-gray-600 
                            hover:border-primary-500 hover:text-primary-500
                            transition-colors duration-200
                            w-full sm:w-auto
                        "
                    >
                        <SquarePen size={16} />
                        <span>Edit</span>
                    </button>

                    <button
                        className="
                            flex items-center justify-center gap-1
                            cursor-pointer px-3 py-2 rounded-lg text-sm 
                            border border-gray-200 text-gray-600 
                            hover:border-primary-500 hover:text-primary-500
                            transition-colors duration-200
                            w-full sm:w-auto
                        "
                    >
                        <Copy size={14} />
                        <span>Copy</span>
                    </button>

                    <button
                        onClick={() => { setDialogMode("save"); setShowDialog(true); }}
                        className="
                            flex items-center justify-center gap-1 
                            cursor-pointer px-3 py-2 rounded-lg text-sm 
                            border border-gray-200 text-gray-600 
                            hover:border-primary-500 hover:text-primary-500
                            transition-colors duration-200
                            w-full sm:w-auto
                        "
                    >
                        <Save size={14} />
                        <span>Save</span>
                    </button>
                </div>

                {/* Download Button */}
                <button
                    onClick={() => { setDialogMode("download"); setShowDialog(true); }}
                    className="
                        flex items-center justify-center gap-2 
                        cursor-pointer text-white px-4 py-2 
                        rounded-lg text-sm bg-primary-500 
                        hover:bg-primary-600 transition-colors duration-200
                        w-full sm:w-auto
                    "
                >
                    <Download size={14} />
                    <span>Download</span>
                </button>
            </div>

            <LetterDialog
                open={showDialog}
                mode={dialogMode}
                onClose={() => setShowDialog(false)}
                onConfirm={(data) => {
                    console.log("Dialog result:", data);
                }}
            />
        </Card>
    );
}
