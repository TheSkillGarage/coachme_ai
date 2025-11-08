import React, { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

// Props ka type: sirf do steps use ho rahe hain
type Step = "resumename" | "resumecomplete";

interface ResumeNameProps {
  setCurrentStep: (step: Step) => void;
}

const ResumeName: React.FC<ResumeNameProps> = ({ setCurrentStep }) => {
  const [resumeName, setResumeName] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const handleContinue = () => {
    // yahi main fix hai: next step pe bhejo
    setCurrentStep("resumecomplete");
  };

  return (
    <div className="w-full h-full px-6 py-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => setCurrentStep("resumename")} // same page me back ka visual; agar previous step aur hai to waha set karo
        className="flex items-center gap-2 text-[#1D1D1F] hover:text-[#6D0079] transition mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Card Container */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 max-w-4xl mx-auto shadow-sm">
        <h2 className="text-2xl font-semibold text-[#1D1D1F]">
          Name Your Resume
        </h2>
        <p className="text-[#6E6E73] mt-1">
          Give your resume a name to help you identify it when applying for
          jobs.
        </p>

        {/* Inner Box */}
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

          {/* Toggle */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDefault((v) => !v)}
              className={`w-11 h-6 rounded-full p-1 flex items-center transition ${
                isDefault ? "bg-[#6D0079]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  isDefault ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-[#1D1D1F]">
              Set as default resume
            </span>
          </div>

          {/* Info */}
          <div className="mt-6 bg-[#F5F5F5] p-4 rounded-md text-sm text-[#1D1D1F]">
            Your resume will be saved and ready to use when applying for jobs.
            You can edit it anytime from your resume dashboard.
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <button
            type="button"
            className="flex items-center gap-1 cursor-pointer w-full md:w-auto px-6 py-2 border border-[#6E6E73] rounded-md text-[#6E6E73] hover:bg-gray-100"
          >
            <X size={13} /> Cancel
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center gap-1 cursor-pointer w-full md:w-auto px-6 py-2 bg-[#6D0079] text-white rounded-md hover:bg-[#580062] transition"
          >
            Continue <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeName;
