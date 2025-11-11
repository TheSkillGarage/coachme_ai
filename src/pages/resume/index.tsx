import { useState } from "react";
import UploadResume from "./upload";
import Resumes from "./resumecard";
import CreateResume from "./create-edit/create";
import ResumeName from "./resume-name/resumename";
import ResumeComplete from "./resume-name/resumecomplete";
import type { ParsedResumeData } from "../../types";
import { BackButton } from "./ui/back-button";

export type ResumeStep =
  | "upload"
  | "create-resume"
  | "preview"
  | "complete"
  | "resumes-list"
  | "resumename";

export default function Resume() {
  const [currentStep, setCurrentStep] = useState<ResumeStep>("resumes-list");
  const [stepHistory, setStepHistory] = useState<ResumeStep[]>([]);
  const [redirectFromList, setRedirectFromList] = useState(false);
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null);

  const navigateToStep = (step: ResumeStep) => {
    if (currentStep !== step) {
      setStepHistory((prev) => [...prev, currentStep]);
      setCurrentStep(step);
    }
  };

  const goBack = () => {
    if (stepHistory.length > 0) {
      const previousStep = stepHistory[stepHistory.length - 1];
      setStepHistory((prev) => prev.slice(0, -1));
      setCurrentStep(previousStep);
    }
  };

  const shouldShowBackButton = 
    stepHistory.length > 0 && 
    currentStep !== "resumes-list" && 
    currentStep !== "upload";

  const handleUploadComplete = (extractedData: ParsedResumeData | null) => {
    setParsedResumeData(extractedData);
    navigateToStep("create-resume");
  };

  const handleResumeCreated = () => {
    navigateToStep("resumename");
  };

  return (
    <div className="min-h-screen">
      {shouldShowBackButton && (<BackButton onClick={goBack} />)}

      {/* Step 1: Upload Resume */}
      {currentStep === "upload" && (
        <UploadResume
          onContinueToNextStep={handleUploadComplete}
          redirectFromList={redirectFromList}
          onBackToList={() => goBack()}
        />
      )}

      {/* Step 2: Create Resume Form */}
      {currentStep === "create-resume" && (
        <CreateResume
          initialData={parsedResumeData}
          onSave={handleResumeCreated}
          onCancel={() => {
            setStepHistory([]); // Clear history
            setCurrentStep("resumes-list");
          }}
        />
      )}

      {/* Step 6: Name Your Resume */}
      {currentStep === "resumename" && (
        <ResumeName setCurrentStep={setCurrentStep} />
      )}

      {/* Step 7: Resume Complete */}
      {currentStep === "complete" && (
        <ResumeComplete setCurrentStep={setCurrentStep} />
      )}

      {/* Step 5: Resumes list */}
      {currentStep === "resumes-list" && (
        <Resumes
          setCurrentStep={navigateToStep}
          setRedirectFromList={setRedirectFromList}
        />
      )}
    </div>
  );
}