import React from "react";
import { ArrowLeft, Check } from "lucide-react";

// Step type same as humne resumename.tsx me use kiya tha
type Step = "resumename" | "resumecomplete";

interface ResumeCompleteProps {
  setCurrentStep: (step: Step) => void;
}

const ResumeComplete: React.FC<ResumeCompleteProps> = ({ setCurrentStep }) => {
  return (
    <div className="w-full h-full px-6 py-6 flex flex-col">

      {/* Back Button */}
      <button
        onClick={() => setCurrentStep("resumename")}
        className="cursor-pointer flex items-center gap-2 text-[#1D1D1F] hover:text-[#6D0079] transition rounded-lg px-4 py-2 w-fit mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Center Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 w-full max-w-4xl mx-auto shadow-sm text-center">

        <div className="w-14 h-14 rounded-full bg-[#E8FAEA] flex items-center justify-center mx-auto">
          <Check size={30} className="text-green-600" />
        </div>

        <h2 className="text-2xl font-semibold text-[#1D1D1F] mt-4">
          Resume Added Successfully
        </h2>

        <p className="text-[#6E6E73] mt-2 max-w mx-auto">
          Your resume has been added to your profile and is ready to use when applying for jobs.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => setCurrentStep("resumename")}
            className="cursor-pointer px-6 py-2 border border-[#6E6E73] text-[#1D1D1F] rounded-md hover:bg-gray-100 w-full md:w-auto"
          >
            View All Resumes
          </button>

          <button
            onClick={() => console.log("Start Job Search")}
            className="cursor-pointer px-6 py-2 bg-[#6D0079] text-white rounded-md hover:bg-[#580062] transition w-full md:w-auto"
          >
            Start Job Search
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeComplete;
