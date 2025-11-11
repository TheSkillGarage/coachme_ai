import { useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useResumeManager } from "../../../hooks/useResumeManager";
import { EmptyResumeState } from "./EmptyResume";
import { UploadResumeFlow } from "./UploadResume";
import { UploadSuccessState } from "./UploadSuccess";
import { BackButton } from "../ui/back-button";
import type { UploadStage, ParsedResumeData } from "../../../types";
import { parseResumeFile } from "../../../utils/resumeParser";

interface UploadResumeProps {
  onContinueToNextStep?: (extractedData: ParsedResumeData | null) => void;
  redirectFromList?: boolean;
  onBackToList?: () => void; 
  onCancel: () => void;
}

export default function UploadResume({ 
  onContinueToNextStep, 
  redirectFromList,
  onBackToList,
  onCancel
}: UploadResumeProps) {
  const [currentStage, setCurrentStage] = useState<UploadStage>("list");
  const [stageHistory, setStageHistory] = useState<UploadStage[]>([]);
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

  const navigateToStage = (stage: UploadStage) => {
    setStageHistory((prev) => [...prev, currentStage]);
    setCurrentStage(stage);
  };

  const goBackStage = () => {
    if (stageHistory.length > 0) {
      const previousStage = stageHistory[stageHistory.length - 1];
      setStageHistory((prev) => prev.slice(0, -1));
      setCurrentStage(previousStage);
      
      if (currentStage === "upload") {
        clearSelectedFile();
      }
    } else {
      if (onBackToList) {
        onBackToList();
      }
    }
  };

  const handleStartUpload = () => {
    navigateToStage("upload");
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
      
      navigateToStage("success");
      clearSelectedFile();
    }
  };

  const handleCancelUpload = () => {
    clearSelectedFile();
    resetUploadState();
    setParsedData(null);
    goBackStage();
  };

  const handleContinue = () => {
    resetUploadState();
    setCurrentStage("list");
    setStageHistory([]);
    
    if (onContinueToNextStep) {
      onContinueToNextStep(parsedData);
    }
  };

  // Show back button for upload and success stages only
  const showBackButton = currentStage === "upload" || currentStage === "success" || redirectFromList;

  if (currentStage === "success") {
    return (
      <div className="min-h-full bg-background p-0 lg:px-6 lg:py-8">
        <div className="mx-auto">
          {showBackButton && <BackButton onClick={handleCancelUpload} />}
          <UploadSuccessState
            fileName={uploadedFileName}
            onCancel={onCancel}
            onContinue={handleContinue}
            isParsing={isParsing}
          />
        </div>
      </div>
    );
  }

  if (currentStage === "upload" || redirectFromList) {
    return (
      <div className="min-h-full bg-background p-0 lg:px-6 lg:py-8">
        <div className="mx-auto">
          {showBackButton && <BackButton onClick={handleCancelUpload} disabled={uploadState === "uploading"} />}
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
            onCancel={onCancel}
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
        </div>
      </div>
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