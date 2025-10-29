import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Copy, Download, Save, SquarePen } from "lucide-react";
import LetterDialog, { type LetterDialogData } from "./letterdialog";

interface LetterScreenProps {
    onEdit: () => void;
}

export default function LetterScreen({ onEdit }: LetterScreenProps) {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<"save" | "download">("save");

    const letterContent = `
Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer
position at TechCorp. With over 5 years of experience in web
development and a passion for creating intuitive user interfaces,
I believe I would be a valuable addition to your team.

Throughout my career, I have developed expertise in React,
TypeScript, and modern frontend frameworks. In my current role
at InnovateSoft, I led the development of a customer-facing
application that improved user engagement by 40% and reduced
bounce rates by 25%.

I am particularly drawn to TechCorp's mission to make technology
accessible to everyone. Your recent project on developing inclusive
design systems aligns perfectly with my interest in creating
accessible web applications.

I would welcome the opportunity to discuss how my skills and
experience can contribute to TechCorp's continued success.

Sincerely,
[Your Name]
`.trim();

    // ✅ Handler for confirm action
    const handleDialogConfirm = (data: LetterDialogData) => {
        if ("format" in data) {
            // --- DOWNLOAD FLOW ---
            const { fileName, format } = data;
            downloadLetter(letterContent, fileName, format);
        } else {
            // --- SAVE FLOW ---
            console.log("Letter saved with title:", data.title);
        }
        setShowDialog(false);
    };

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
                <p className="text-grey-400 text-xs md:text-xs whitespace-pre-line">
                    {letterContent}
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
                        onClick={() => navigator.clipboard.writeText(letterContent)}
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
                        onClick={() => {
                            setDialogMode("save");
                            setShowDialog(true);
                        }}
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
                    onClick={() => {
                        setDialogMode("download");
                        setShowDialog(true);
                    }}
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

            {/* Dialog */}
            <LetterDialog
                open={showDialog}
                mode={dialogMode}
                onClose={() => setShowDialog(false)}
                onConfirm={handleDialogConfirm}
            />
        </Card>
    );
}

// ✅ Download helper
function downloadLetter(
    content: string,
    fileName: string,
    format: "pdf" | "docx" | "txt"
) {
    if (format === "txt") {
        const blob = new Blob([content], { type: "text/plain" });
        triggerDownload(blob, `${fileName}.txt`);
    } else if (format === "docx") {
        const html = `
        <!DOCTYPE html>
        <html><head><meta charset="utf-8"></head>
        <body><pre>${content}</pre></body></html>`;
        const blob = new Blob([html], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        triggerDownload(blob, `${fileName}.docx`);
    } else if (format === "pdf") {
        import("jspdf").then(({ jsPDF }) => {
            const doc = new jsPDF();
            const lines = doc.splitTextToSize(content, 180);
            doc.text(lines, 10, 10);
            doc.save(`${fileName}.pdf`);
        });
    }
}

function triggerDownload(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
