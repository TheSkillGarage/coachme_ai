import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Button from "../../../components/ui/button/button";

interface ResumeCompleteProps {
  onComplete: () => void;
}

const ResumeComplete: React.FC<ResumeCompleteProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full lg:px-6 py-6 flex flex-col">

      <div className="bg-white border border-[#E5E5E5] rounded-2xl p-10 w-full max-w-7xl mx-auto shadow-sm text-center">

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
          <Button
            variant="outline"
            onClick={onComplete}
            className="px-6 py-2 bg-transparent text-grey-500"
            >
            View All Resumes
            </Button>

            <Button
             onClick={() => navigate("/user/jobs")}
              bg="bg-[#66005e]"
              color="text-white"
              rounded="lg"
              className="px-6 py-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
            >
             Start Job Search
              </Button>
        </div>

      </div>
    </div>
  );
};

export default ResumeComplete;
