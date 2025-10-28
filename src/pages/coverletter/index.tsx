import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import CustomSelect from "../../components/ui/advanceSelect";
import RichTextEditor from "../../components/ui/editor";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input/input";
import Textarea from "../../components/ui/textarea";
import CreateCoverLetterIntro from "./intro";
import Button from "../../components/ui/button/button";
import { Sparkles } from "lucide-react";
import LetterScreen from "./letterscreen";
import Initiaditor from "./lnitiaditor";
import { defaultData } from "./data";

export default function Main() {
    const tags: HelmetProps = {
        pageTitle: "Cover Letter",
        description: "",
    };

    const [multi, setMulti] = useState<string[]>([]);
    const [singleSkill, setSingleSkill] = useState<string | undefined>(undefined);
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [content, setContent] = useState("");
    const [showEditor, setShowEditor] = useState(false); // for intro screen
    const [showLetter, setShowLetter] = useState(false); // for letter preview
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 👈 NEW: controls the rich text editor

    const options = [
        { label: "React", value: "react" },
        { label: "TypeScript", value: "typescript" },
        { label: "UI/UX Designer", value: "uiux" },
        { label: "Project Manager", value: "pm" },
    ];

    const tones = [
        { label: "Tone", value: "Tone" },
        { label: "Conversational", value: "Conversational" },
        { label: "Formal", value: "Formal" },
    ];

    const handleSave = (value: string) => {
        setContent(value);
        console.log("Saved content:", value);
        setIsEditing(false);
        setShowLetter(true); // back to preview
    };

    const handleGenerateLetter = () => {
        if (!jobTitle || !companyName || !jobDescription) {
            alert("Please fill in all required fields before generating.");
            return;
        }

        setLoading(true);
        setShowLetter(false);
        setIsEditing(false);

        // Simulate generation delay
        setTimeout(() => {
            setLoading(false);
            setShowLetter(true);
        }, 2500);
    };

    return (
        <HelmetLayout {...tags}>
            <div className="w-full overflow-x-hidden">
                <AnimatePresence mode="wait">
                    {!showEditor ? (
                        // ✅ Intro Screen
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex items-center justify-center w-full min-h-[70vh] px-4"
                        >
                            <CreateCoverLetterIntro
                                onStart={() => {
                                    setShowEditor(true);
                                    setShowLetter(false);
                                }}
                            />
                        </motion.div>
                    ) : (
                        // ✅ Main Editor Screen
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="
                                flex flex-col-reverse lg:flex-row 
                                justify-between items-start 
                                w-full max-w-[1400px] mx-auto 
                                gap-6 
                                px-4 sm:px-6 lg:px-8 py-6
                                overflow-hidden
                            "
                        >
                            {/* ✅ Left Section (Job Details) */}
                            <Card
                                hoverable={false}
                                className="
                                    w-full lg:w-1/2 
                                    shadow-none border border-gray-100 
                                    p-4 sm:p-6 md:p-8 rounded-2xl
                                "
                            >
                                <div className="flex flex-col gap-y-1 mb-4">
                                    <h1 className="font-semibold text-lg md:text-xl">
                                        Job Details
                                    </h1>
                                    <p className="text-xs text-gray-400">
                                        Enter details about the job you’re applying for
                                    </p>
                                </div>

                                <div className="flex flex-col gap-y-4">
                                    <Input
                                        label="Job Title"
                                        placeholder="Frontend Developer"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                    />
                                    <Input
                                        label="Company Name"
                                        placeholder="Tech Corp"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                    <CustomSelect
                                        label="Tone"
                                        placeholder="Choose a tone..."
                                        options={tones}
                                        value={singleSkill}
                                        onChange={(v) => setSingleSkill(v as string | undefined)}
                                        multiple={false}
                                        searchable
                                        className="rounded-lg"
                                    />
                                    <Textarea
                                        label="Job Description"
                                        placeholder="Paste the job description here"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                    <CustomSelect
                                        label={
                                            <>
                                                Key Skills{" "}
                                                <span className="text-gray-400 text-sm ml-1">
                                                    (optional)
                                                </span>
                                            </>
                                        }
                                        placeholder="Select your skills..."
                                        options={options}
                                        value={multi}
                                        onChange={(v) => setMulti(v as string[])}
                                        multiple
                                        searchable
                                        className="rounded-lg"
                                    />
                                    <Button
                                        icon={<Sparkles />}
                                        iconPosition="left"
                                        className="mt-2 w-full sm:w-auto"
                                        onClick={handleGenerateLetter}
                                    >
                                        Generate Cover Letter
                                    </Button>
                                </div>
                            </Card>

                            {/* ✅ Right Section (Dynamic Views) */}
                            <div className="w-full lg:w-1/2 min-h-[400px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        // ⏳ Loading Animation
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Initiaditor loading={true} />
                                        </motion.div>
                                    ) : isEditing ? (
                                        // 📝 RichTextEditor when editing
                                        <motion.div
                                            key="editorView"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <RichTextEditor
                                                title="Edit Cover Letter"
                                                subtitle="Craft your personalized message."
                                                defaultContent={
                                                    content ||
                                                    defaultData
                                                }
                                                onSave={handleSave}
                                                saveButtonText="Update"
                                                onCancel={() => {
                                                    setIsEditing(false);
                                                    setShowLetter(true);
                                                }}
                                            />
                                        </motion.div>
                                    ) : showLetter ? (
                                        // 📄 Letter Preview
                                        <motion.div
                                            key="letter"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <LetterScreen onEdit={() => setIsEditing(true)} />
                                        </motion.div>
                                    ) : (
                                        // 🪄 Default Idle Initiator
                                        <motion.div
                                            key="initiator"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Initiaditor loading={false} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </HelmetLayout>
    );
}
