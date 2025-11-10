import { useState } from "react";
import UploadResume from "./upload";
import Resumes from "./resumecard";
import CreateResume from "./create-edit/create";
import type { ParsedResumeData } from "../../types";

type ResumeStep =
  | "upload"
  | "create-resume"
  | "preview"
  | "complete"
  | "resumes-list"
  | "resumename"
  | "resumecomplete";

export default function Resume() {
  const [currentStep, setCurrentStep] = useState<ResumeStep | string>(
    "resumes-list"
  );
  const [redirectFromList, setRedirectFromList] = useState(false);
  const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null);

  const handleUploadComplete = (extractedData: ParsedResumeData | null) => {
    // Store the parsed resume data
    setParsedResumeData(extractedData);
    // Move to the next step
    setCurrentStep("create-resume");
  };

  const handleResumeCreated = () => {
    // Move to preview after resume is created
    setCurrentStep("preview");
  };

  const handleComplete = () => {
  setCurrentStep("resumename"); // apna step open hoga unke complete ke baad
};

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

      {/* Step 3: Preview Resume (Not yet implemented) */}
      {currentStep === "preview" && (
        <div className="min-h-full bg-background px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-[#e8e8e8]">
              <h2 className="text-2xl font-semibold mb-4">Preview Your Resume</h2>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">Resume Preview Component</p>
                <p className="text-sm text-gray-400 mt-2">To be implemented</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleComplete}
                  className="px-6 py-2 bg-[#66005e] text-white rounded-lg hover:bg-[#4d0048]"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Complete */}
      {currentStep === "complete" && (
        <div className="min-h-full bg-background px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Resume Created Successfully!
            </h2>
            <p className="text-muted-foreground">
              Your resume is ready to download and share
            </p>
          </div>
        </div>
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