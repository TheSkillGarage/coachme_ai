import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "../../../components/uiToast/ToastProvider";
import {
  Bookmark,
  Share2,
  MapPin,
  Clock,
  ArrowLeft,
  Briefcase,
  Search
} from "lucide-react";
import Button from "../../../components/ui/button/button";
import { mockJobs } from "../../../data";

export default function JobDetailsPage() {
  const { showToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  
  // Find the job from mock data
  const job = mockJobs.find((j) => j.id === Number(id));

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      const savedIds = JSON.parse(saved);
      setSavedJobs(savedIds);
      setIsSaved(savedIds.includes(Number(id)));
    }
  }, [id]);

  // Toggle save job
  const toggleSave = () => {
    const newSavedJobs = isSaved 
      ? savedJobs.filter(jobId => jobId !== Number(id))
      : [...savedJobs, Number(id)];
    
    setSavedJobs(newSavedJobs);
    setIsSaved(!isSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  // Get similar jobs based on the similarJobs array in the job data
  const getSimilarJobs = () => {
    if (!job || !job.similarJobs || job.similarJobs.length === 0) {
      // Fallback: get 3 random jobs excluding current job
      return mockJobs
        .filter(j => j.id !== Number(id))
        .slice(0, 3)
        .map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          logo: job.logo,
          location: job.location,
          type: job.type
        }));
    }

    // Get the actual similar jobs based on the IDs
    return job.similarJobs
      .map(jobId => mockJobs.find(j => j.id === jobId))
      .filter(Boolean)
      .map(job => ({
        id: job!.id,
        title: job!.title,
        company: job!.company,
        logo: job!.logo,
        location: job!.location,
        type: job!.type
      }));
  };

  const similarJobs = getSimilarJobs();

  const shareJob = () => {
    if (navigator.share && job) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: job.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Job link copied to clipboard!');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-500 mb-6">
            The job you're looking for doesn't exist in our database.
          </p>
          <Link to="/user/jobs" className="mx-auto flex justify-center">
            <Button variant="outline" icon={<ArrowLeft className="w-4 h-4 text-primary-700" />} iconPosition="left" className="text-primary-700">
              Return to Job Search
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Go Back */}
      <div className="mx-auto px-4 pt-6">
        <Link
          to="/user/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors bg-white py-2 px-4 rounded-2xl border-[0.4px] border-[rgba(150,150,150,1)]"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
        </Link>
      </div>

      {/* Job Header */}
      <div className="mx-auto mt-4 lg:px-4">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex gap-3 lg:gap-4 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
                {job.logo}
              </div>
            </div>

            {/* Title, Company, Job Type */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h1 className="text-lg lg:text-2xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-sm flex-wrap">
                    <span className="text-muted-foreground">{job.company}</span>
                    <span className="text-muted-foreground hidden lg:inline">•</span>
                    <span className="inline-flex items-center gap-1 text-xs lg:text-sm text-gray-500">
                      <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 lg:gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={toggleSave}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Bookmark
                      className="w-5 h-5"
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                  <button 
                    onClick={shareJob}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Desktop Only - Location, Work Type, Time, Salary */}
              <div className="hidden lg:flex gap-4 mt-2 text-sm text-muted-foreground flex-wrap items-center">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {job.location}
                </div>
                <div className="bg-[#ffdafc] text-primary-700 px-2 py-0.5 rounded-2xl text-xs font-medium">
                  {job.workType}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {job.postedTime}
                </div>
                <p className="ml-auto text-lg font-semibold text-foreground">
                  {job.salary}
                </p>
              </div>

              {/* Desktop Only - Description and Skills */}
              <div className="hidden lg:block">
                <p className="mt-4 text-sm text-foreground">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 border border-gray-200 text-sm px-3 py-1 rounded-full text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <Button className="text-white">Apply Now</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Only - Location, Work Type, Time, Salary */}
          <div className="lg:hidden mt-3">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-muted-foreground text-gray-400">
                {job.location}
              </span>
              <span className="bg-[#ffdafc] text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium ml-4">
                {job.workType}
              </span>
            </div>

            <div className="flex items-center mb-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" />
                {job.postedTime}
              </div>
              <span className="text-sm font-semibold text-foreground ml-4">
                {job.salary}
              </span>
            </div>

            {/* Mobile Only - Description and Skills */}
            <p className="text-sm text-muted-foreground mb-4">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 border border-gray-200 text-xs px-2 py-1 rounded-full text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <Button className="w-full text-white">Apply Now</Button>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="mx-auto mt-6 lg:px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">
            {job.fullDescription}
          </div>
        </div>
      </div>

      {/* About Company */}
      <div className="mx-auto mt-6 lg:px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">About The Company</h2>
          <p className="text-sm leading-relaxed text-foreground">
            {job.companyDescription}
          </p>
        </div>
      </div>

      {/* Similar Jobs */}
      <div className="mx-auto mt-6 mb-10 lg:px-4">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
          <h2 className="text-lg font-semibold mb-3">Similar Jobs</h2>
          <div className="space-y-3">
            {similarJobs.length > 0 ? (
              similarJobs.map((similarJob) => (
                <Link key={similarJob.id} to={`/user/jobs/${similarJob.id}`}>
                  <div className="flex items-start gap-3 pb-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {similarJob.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {similarJob.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {similarJob.company}
                        <span>•</span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          {similarJob.location}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {similarJob.type}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No similar jobs found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}