import React, { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { ArrowRight, X } from "lucide-react";
import Button from "../../../components/ui/button/button";

interface ResumeNameProps {
  onContinue: () => void;
  onCancel: () => void;
}

const ResumeName: React.FC<ResumeNameProps> = ({ onContinue, onCancel }) => {
  const [resumeName, setResumeName] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full lg:px-6 py-8">
      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 lg:max-w-7xl mx-auto shadow-sm">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">
          Name Your Resume
        </h2>
        <p className="text-[#6E6E73] mt-1">
          Give your resume a name to help you identify it when applying for
          jobs.
        </p>
        <div className="border border-[#E5E5E5] rounded-xl p-6 mt-6">
          <label className="text-sm font-medium text-[#1D1D1F]">
            Resume Name
          </label>
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            placeholder="Blessing Resume"
            className="mt-2 w-full border border-[#E5E5E5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D0079]"
          />
          <p className="text-xs text-[#6E6E73] mt-2">
            Choose a name that helps you remember what this resume is for
          </p>
          <div className="mt-6 flex items-center gap-2">
          <Switch
            size="xl"
            checked={isActive}
            onChange={(val) => setIsActive(val)}
          />
            <span className="text-sm font-medium text-[#1D1D1F]">
              Set as default resume
            </span>
          </div>
          <div className="mt-6 bg-[#F5F5F5] p-4 rounded-md text-sm text-[#1D1D1F]">
            Your resume will be saved and ready to use when applying for jobs.
            You can edit it anytime from your resume dashboard.
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <Button
              variant="outline"
              onClick={onCancel}
              className="px-6 py-2 bg-transparent text-grey-400 border-gray-500"
              icon={<X className="w-4 h-4" />}
              iconPosition="left"
            >
              Cancel
            </Button>

            <Button
              onClick={onContinue}
              bg="bg-[#66005e]"
              color="text-white"
              rounded="lg"
              className="px-6 py-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
              icon={ <ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continue
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeName;
