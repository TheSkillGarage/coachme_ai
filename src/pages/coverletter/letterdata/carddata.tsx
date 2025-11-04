import { MoreVertical, Sparkles } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { Card } from "../../../components/ui/card";

interface LetterCard {
    id: number;
    title: string;
    company: string;
    position: string;
    preview: string;
    fileName: string;
    createdAt: string;
    isDefault?: boolean;
}

interface IntroProps {
    onStart?: () => void;
}

export default function CoverLetters({ onStart }: IntroProps) {
    const letters: LetterCard[] = [
        {
            id: 1,
            title: "TechCorp Cover Letter",
            company: "TechCorp",
            position: "Frontend Developer",
            preview:
                "Dear Hiring Manager, I am writing to express my interest in the Frontend Developer position at TechCorp. With...",
            fileName: "TechCorp Letter",
            createdAt: "18/5/25",
            isDefault: true,
        },
        {
            id: 2,
            title: "DataFlow Solutions",
            company: "DataFlow Solutions",
            position: "Fullstack Engineer",
            preview:
                "Dear Hiring Manager, I am writing to express my interest in the Fullstack Engineer position at DataFlow Solutions. With...",
            fileName: "DataFlow Letter",
            createdAt: "18/5/25",
        },
        {
            id: 3,
            title: "InnovateNow Cover Letter",
            company: "Innovate Now Solutions",
            position: "Fullstack Engineer",
            preview:
                "Dear Hiring Manager, I am writing to express my interest in the Fullstack Engineer position at Innovate Now Solution. With...",
            fileName: "InnovateNow Letter",
            createdAt: "18/5/25",
        },
        {
            id: 4,
            title: "InnovateNow Cover Letter",
            company: "Innovate Now Solutions",
            position: "Fullstack Engineer",
            preview:
                "Dear Hiring Manager, I am writing to express my interest in the Fullstack Engineer position at Innovate Now Solution. With...",
            fileName: "InnovateNow Letter",
            createdAt: "18/5/25",
        },
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-xl font-semibold text-grey-500">
                        Your Cover Letters
                    </h1>
                    <p className="text-sm text-grey-300">
                        Manage and organize your saved cover letters
                    </p>
                </div>
                <Button
                    className="mt-3 sm:mt-0 bg-[#67005E] hover:bg-[#52004A] text-white rounded-lg flex items-center gap-2 px-4 py-2"
                    icon={<Sparkles className="w-4 h-4" />} iconPosition="left"
                    onClick={onStart}
                >

                    Create New Cover Letter
                </Button>
            </div>

            {/* ===== Cover Letter Cards ===== */}
            <div className="w-full flex flex-wrap justify-center sm:justify-start gap-6">
                {letters.map((letter) => (
                    <Card
                        key={letter.id}
                        className="
                            flex flex-col justify-between 
                            w-full sm:w-[48%] lg:w-[31.5%]
                            rounded-2xl border border-gray-200 bg-transparent 
                            shadow-sm hover:shadow-md transition-all duration-200
                            
                        "
                    >
                        {/* Top Content */}
                        <div className="p-5 space-y-2">
                            <h2 className="font-semibold text-[16px] leading-snug">
                                {letter.title}
                            </h2>
                            <p className="text-sm text-gray-600 leading-tight">
                                {letter.company}
                                <br />
                                {letter.position}
                            </p>
                            <p className="text-gray-500 text-sm mt-2 line-clamp-4">
                                {letter.preview}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                            <div>
                                <h3 className="font-semibold text-[15px]">
                                    {letter.fileName}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Created: {letter.createdAt}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {letter.isDefault && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                        Default
                                    </span>
                                )}
                                <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
