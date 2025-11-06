import { useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useResumeManager } from "../../../hooks/useResumeManager";
import { EmptyResumeState } from "./EmptyResume";
import { UploadResumeFlow } from "./UploadResume";
import { UploadSuccessState } from "./UploadSuccess";
import type { UploadStage } from "../../../types";

interface UploadResumeProps {
  onContinueToNextStep?: () => void;
}

export default function UploadResume({ onContinueToNextStep }: UploadResumeProps) {
  const [currentStage, setCurrentStage] = useState<UploadStage>("list");

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
      setCurrentStage("success");
      clearSelectedFile();
    }
  };

  const handleCancelUpload = () => {
    clearSelectedFile();
    resetUploadState();
    setCurrentStage("upload");
  };

  const handleContinue = () => {
    resetUploadState();
    setCurrentStage("list");
    
    if (onContinueToNextStep) {
      onContinueToNextStep();
    }
  };

  if (currentStage === "success") {
    return (
      <UploadSuccessState
        fileName={uploadedFileName}
        onCancel={handleCancelUpload}
        onContinue={handleContinue}
      />
    );
  }

  if (currentStage === "upload") {
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