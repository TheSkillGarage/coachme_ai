import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import { Input } from "../../../components/ui/input/input";
import Radio from "../../../components/ui/radiobutton";
import Button from "../../../components/ui/button/button";
import { Card } from "../../../components/ui/card";

interface LetterDialogProps {
    open: boolean;
    mode: "save" | "download";
    onClose: () => void;
    onConfirm: (data: any) => void;
}

export default function LetterDialog({
    open,
    mode,
    onClose,
    onConfirm,
}: LetterDialogProps) {
    const [format, setFormat] = React.useState("pdf");
    const [name, setName] = React.useState("TechCorp Cover Letter");

    const handleConfirm = () => {
        const payload =
            mode === "save" ? { name } : { name, format };
        onConfirm(payload);
        onClose();
    };

    const isSave = mode === "save";


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="dialog"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-[90%] max-w-md"
                    >
                        <Card className="relative p-6 rounded-2xl shadow-lg border border-gray-100 bg-white">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Header */}
                            <div className="mb-2">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {isSave ? "Save Cover Letter" : "Download Cover Letter"}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {isSave
                                        ? "Give your cover letter a name to save it to your library"
                                        : "Choose your preferred file format and name"}
                                </p>
                            </div>

                            {/* Input */}
                            <div className="mt-4 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {isSave ? "Title" : "File Name"}
                                </label>
                                <Input
                                    placeholder="e.g. TechCorp Cover Letter"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Format Selection (only for download) */}
                            {!isSave && (
                                <div className="mt-5 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Format
                                    </label>
                                    <div className="flex lg:flex flex-wrap items-center gap-5 mt-1">
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                name="format"
                                                value="pdf"
                                                checked={format === "pdf"}
                                                onChange={(e) => setFormat(e.target.value)}
                                            />
                                            <FileText
                                                className={`h-5 w-5 ${format === "pdf"
                                                    ? "text-grey-200"
                                                    : "text-grey-200"
                                                    }`}
                                            />
                                            <span className="text-sm text-grey-400">PDF</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Radio
                                                name="format"
                                                value="docx"
                                                checked={format === "docx"}
                                                onChange={(e) => setFormat(e.target.value)}
                                            />
                                            <FileText
                                                className={`h-5 w-5 ${format === "docx"
                                                    ? "text-grey-200"
                                                    : "text-grey-200"
                                                    }`}
                                            />
                                            <span className="text-sm text-grey-400">Word (.docx)</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Radio
                                                name="format"
                                                value="txt"
                                                checked={format === "txt"}
                                                onChange={(e) => setFormat(e.target.value)}
                                            />
                                            <FileText
                                                className={`h-5 w-5 ${format === "txt"
                                                    ? "text-grey-200"
                                                    : "text-grey-200"
                                                    }`}
                                            />
                                            <span className="text-sm text-grey-400">Text (.txt)</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer Buttons */}
                            <div className="flex justify-end gap-3 mt-8">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="border-gray-300 text-grey-500 flex items-center gap-1"
                                >
                                    ✕ Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className="bg-primary-500 text-white flex items-center gap-1"
                                >
                                    ✓ {isSave ? "Save" : "Download"}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
