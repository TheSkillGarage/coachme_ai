import type React from "react";
import { ArrowLeft, CheckCircle, X, ArrowRight, Loader2 } from "lucide-react"; // ✅ ADD Loader2
import Button from "../../../components/ui/button/button";

interface UploadSuccessStateProps {
  fileName: string;
  onCancel: () => void;
  onContinue: () => void;
  isParsing?: boolean; 
}

export const UploadSuccessState: React.FC<UploadSuccessStateProps> = ({
  fileName,
  onCancel,
  onContinue,
  isParsing = false,
}) => {
  return (
    <div className="min-h-full bg-background p-0 lg:px-6 lg:py-8">
      <div className="mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground rounded-full px-3 py-2 bg-white border border-[rgba(255,255,255,1)] transition-all"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back
          </Button>
        </div>

        <div className="bg-white px-4 md:px-10 pt-4 md:pt-10 pb-4 md:pb-12 rounded-xl border border-[#e8e8e8]">
          <h2 className="text-[#1b1b1b] text-xl md:text-2xl font-semibold mb-2">
            Upload Your Resume
          </h2>
          <p className="text-sm mb-8">
            Upload your resume to get started with your job search
          </p>
          {isParsing ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">{fileName}</p>
                <p className="text-sm text-blue-700">
                  Analyzing your resume and extracting information...
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">{fileName}</p>
                <p className="text-sm text-green-700">
                  Your resume has been uploaded successfully. Click continue to proceed.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isParsing}
              className="px-6 py-2 bg-transparent text-primary-400"
              icon={<X className="w-4 h-4" />}
              iconPosition="left"
            >
              Cancel
            </Button>

            <Button
              onClick={onContinue}
              disabled={isParsing}
              bg="bg-[#66005e]"
              color="text-white"
              rounded="lg"
              className="px-6 py-2 hover:bg-purple-800 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
              icon={isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} // ✅ CHANGE: Show spinner while parsing
              iconPosition="right"
            >
              {isParsing ? "Analyzing..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};