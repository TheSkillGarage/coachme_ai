import type React from "react";
import { Upload } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { DocumentIcon } from "../../../assets";

interface EmptyResumeStateProps {
  onUploadClick: () => void;
}

export const EmptyResumeState: React.FC<EmptyResumeStateProps> = ({
  onUploadClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-5">
          <img src={DocumentIcon} alt="document icon" />
        </div>
        <h2 className="text-lg md:text-2xl font-semibold mb-2">No Resumes Yet</h2>
        <p className="text-[#494949] md:text-base mb-8">
          Upload your resume to get started with your job search
        </p>
        <div className="flex justify-center">
          <Button
            onClick={onUploadClick}
            bg="bg-[#66005e]"
            color="text-white"
            rounded="lg"
            size="lg"
            icon={<Upload className="w-4 h-4" />}
            iconPosition="left"
          >
            Upload Resume
          </Button>
        </div>
      </div>
    </div>
  );
};