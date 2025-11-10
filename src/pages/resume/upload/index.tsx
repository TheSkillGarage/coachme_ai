import { useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useResumeManager } from "../../../hooks/useResumeManager";
import { EmptyResumeState } from "./EmptyResume";
import { UploadResumeFlow } from "./UploadResume";
import { UploadSuccessState } from "./UploadSuccess";
import type { UploadStage, ParsedResumeData } from "../../../types";
import { parseResumeFile } from "../../../utils/resumeParser";

interface UploadResumeProps {
  onContinueToNextStep?: (extractedData: ParsedResumeData | null) => void;
  redirectFromList?: boolean;
}

export default function UploadResume({ onContinueToNextStep, redirectFromList }: UploadResumeProps) {
  const [currentStage, setCurrentStage] = useState<UploadStage>("list");
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const {
    selectedFile,
    isDragging,
    fileInputRef,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearSelectedFile,
  } = useFileUpload();

  const {
    uploadProgress,
    uploadState,
    uploadedFileName,
    uploadResume,
    resetUploadState,
  } = useResumeManager();

  const handleStartUpload = () => {
    setCurrentStage("upload");
  };

  const handleUploadResume = async () => {
    if (selectedFile) {
      await uploadResume(selectedFile);
    
      setIsParsing(true);
      try {
        const extractedData = await parseResumeFile(selectedFile);
        setParsedData(extractedData);
        console.log("Extracted resume data:", extractedData);
      } catch (error) {
        console.error("Error parsing resume:", error);
        setParsedData(null);
      } finally {
        setIsParsing(false);
      }
      
      setCurrentStage("success");
      clearSelectedFile();
    }
  };

  const handleCancelUpload = () => {
    clearSelectedFile();
    resetUploadState();
    setParsedData(null);
    setCurrentStage("upload");
  };

  const handleContinue = () => {
    resetUploadState();
    setCurrentStage("list");
    
    if (onContinueToNextStep) {
    onContinueToNextStep(parsedData);
    }
  };

  if (currentStage === "success") {
    return (
      <UploadSuccessState
        fileName={uploadedFileName}
        onCancel={handleCancelUpload}
        onContinue={handleContinue}
        isParsing={isParsing}
      />
    );
  }

  if (currentStage === "upload" || redirectFromList) {
    return (
      <>
        <UploadResumeFlow
          selectedFile={selectedFile}
          isDragging={isDragging}
          uploadState={uploadState}
          uploadProgress={uploadProgress}
          uploadedFileName={uploadedFileName}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileInputClick={() => fileInputRef.current?.click()}
          onFileRemove={clearSelectedFile}
          onCancel={handleCancelUpload}
          onUpload={handleUploadResume}
          fileInputRef={fileInputRef}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.pptx,.png,.svg"
          className="hidden"
          onChange={(e) => handleFileInput(e.target.files)}
        />
      </>
    );
  }

  return (
    <div className="min-h-full bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto">
      <EmptyResumeState onUploadClick={handleStartUpload} />

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.pptx,.png,.svg"
          className="hidden"
          onChange={(e) => handleFileInput(e.target.files)}
        />
      </div>
    </div>
  );
}