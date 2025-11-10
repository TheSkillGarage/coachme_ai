import { useState } from "react";
import UploadResume from "./upload";
import Resumes from "./resumecard";
import CreateResume from "./create-edit/create";
import ResumeName from "./resume-name/resumename";
import ResumeComplete from "./resume-name/resumecomplete";
import type { ParsedResumeData } from "../../types";

type ResumeStep =
  | "upload"
  | "create-resume"
  | "preview"
  | "complete"
  | "resumes-list"
  | "resumename"

export default function Resume() {
  const [currentStep, setCurrentStep] = useState<ResumeStep | string>(
    "resumes-list"
  );
  const [redirectFromList, setRedirectFromList] = useState(false);
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null);

  const handleUploadComplete = (extractedData: ParsedResumeData | null) => {
    setParsedResumeData(extractedData);
    setCurrentStep("create-resume");
  };

  const handleResumeCreated = () => {
    setCurrentStep("resumename");
  };

//   const handleComplete = () => {
//   setCurrentStep("resumes-list");
// };

  return (
    <div className="min-h-screen">
      {/* Step 1: Upload Resume */}
      {currentStep === "upload" && (
        <UploadResume
          onContinueToNextStep={handleUploadComplete}
          redirectFromList={redirectFromList}
        />
      )}

      {/* Step 2: Create Resume Form - Now with prefilled data */}
      {currentStep === "create-resume" && (
        <CreateResume 
          initialData={parsedResumeData}
          onSave={handleResumeCreated}
          onCancel={() => setCurrentStep("resumes-list")}
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
          setCurrentStep={setCurrentStep} 
          setRedirectFromList={setRedirectFromList} 
        />
      )}
    </div>
  );
}