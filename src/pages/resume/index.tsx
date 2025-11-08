import { useState } from "react";
import UploadResume from "./upload";
import Resumes from "./resumecard";

type ResumeStep = "upload" | "create-resume" | "preview" | "complete" | "resumes-list";

export default function Resume() {
  const [currentStep, setCurrentStep] = useState<ResumeStep | string>("resumes-list");
  const [redirectFromList, setRedirectFromList] = useState(false);

  const handleUploadComplete = () => {
    // Move to the next step after upload is complete
    setCurrentStep("create-resume");
  };

  const handleResumeCreated = () => {
    // Move to preview after resume is created
    setCurrentStep("preview");
  };

  const handleComplete = () => {
    // Final step
    setCurrentStep("complete");
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

      {/* Step 2: Create Resume Form (Not yet implemented) */}
      {currentStep === "create-resume" && (
        <div className="min-h-full bg-background px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-[#e8e8e8]">
              <h2 className="text-2xl font-semibold mb-4">Create Your Resume</h2>
              <p className="text-muted-foreground mb-6">
                Fill in your details to create a professional resume
              </p>
              {/* TODO: Add CreateResumeForm component here */}
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">Create Resume Form Component</p>
                <p className="text-sm text-gray-400 mt-2">To be implemented</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleResumeCreated}
                  className="px-6 py-2 bg-[#66005e] text-white rounded-lg hover:bg-[#4d0048]"
                >
                  Preview Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview Resume (Not yet implemented) */}
      {currentStep === "preview" && (
        <div className="min-h-full bg-background px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-[#e8e8e8]">
              <h2 className="text-2xl font-semibold mb-4">Preview Your Resume</h2>
              {/* TODO: Add ResumePreview component here */}
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

      {/* Step 4: Complete (Not yet implemented) */}
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
            <h2 className="text-2xl font-semibold mb-2">Resume Created Successfully!</h2>
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
