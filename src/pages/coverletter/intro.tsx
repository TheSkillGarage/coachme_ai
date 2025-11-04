import { FileText, Sparkles } from "lucide-react";
import Button from "../../components/ui/button/button"; // your custom button
import { useState } from "react";
import CoverLetters from "./letterdata/carddata";
interface IntroProps {
    onStart?: () => void;
}

export default function CreateCoverLetterIntro({ onStart }: IntroProps) {
    const [data] = useState(true)
    return (
        <>
            {data ? <CoverLetters onStart={onStart} /> : <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
                {/* Icon */}
                <div className=" ">
                    <FileText size={30} className="w-30 h-30 text-primary-500" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-grey-500">
                    Create Your First Cover Letter
                </h2>

                {/* Subtitle */}
                <p className="text-gray-500">
                    Let AI help you craft the perfect cover letter for your job application
                </p>

                {/* Steps */}
                <div className="space-y-2 text-grey-500">
                    <p className="font-medium">How it Works:</p>

                    <div className="flex flex-col items-start text-sm text-gray-600 space-y-4">
                        <div className="pl-15 flex items-center gap-2">
                            <span className="bg-purple-500 text-primary-500 font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                1
                            </span>
                            <span>Enter Job Title</span>
                        </div>

                        <div className="pl-10 flex items-center gap-2">
                            <span className="bg-purple-500 text-primary-500 font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                2
                            </span>
                            <span>Customize Tone and Style</span>
                        </div>

                        <div className="pl-5 flex items-left gap-2">
                            <span className="bg-purple-500 text-primary-500 font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                3
                            </span>
                            <span className="text-left">Generate and Edit your Cover Letter</span>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="pt-4">
                    <Button
                        icon={<Sparkles className="w-4 h-4" />}
                        iconPosition="left"
                        variant="solid"
                        bg="bg-primary-500"
                        color="text-white"
                        onClick={onStart}
                        className="px-6 py-3 rounded-lg font-medium hover:bg-primary-500 transition-all duration-300 flex items-center gap-2"
                    >

                        Create Cover Letter
                    </Button>
                </div>
            </div>}
        </>
    );
}
