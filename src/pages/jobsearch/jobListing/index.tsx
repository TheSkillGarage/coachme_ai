import { Bookmark, MapPin, Clock, Briefcase, Share2 } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { Link } from "react-router-dom";
import type { Job } from "../../../types";

interface JobListingsProps {
  jobs: Job[];
  savedJobs: number[];
  onToggleSave: (jobId: number) => void;
  onShare: (job: Job) => void;
}

export default function JobListings({ jobs, savedJobs, onToggleSave, onShare }: JobListingsProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-4 lg:p-6 bg-white rounded hover:shadow-sm transition-shadow"
        >
          <div className="flex gap-3 lg:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
                {job.logo}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm flex-wrap">
                    <span className="text-muted-foreground">{job.company}</span>
                    <span className="text-muted-foreground hidden lg:inline">•</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onShare(job)}
                    className="p-1 text-muted-foreground hover:text-primary transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleSave(job.id)}
                    className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 ml-1 cursor-pointer"
                  >
                    <Bookmark
                      className="w-5 h-5"
                      fill={savedJobs.includes(job.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>

              {/* Desktop Only - Location, Time, Description, Footer */}
              <div className="hidden lg:block">
                <div className="flex gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
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
                  {job.salary && (
                    <span className="text-sm font-semibold lg:ml-auto">
                      {job.salary}
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex justify-between items-center flex-wrap gap-3">
                  <Link to={`/user/jobs/${job.id}`}>
                    <button className="text-primary-600 text-sm font-medium hover:underline cursor-pointer">
                      View Details
                    </button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <Button className="">Apply Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Only - Location, Time, Description, Footer*/}
          <div className="lg:hidden mt-3">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-muted-foreground text-gray-400">{job.location}</span>
              <span className="bg-[#ffdafc] text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium ml-auto">
                {job.workType}
              </span>
            </div>

            <div className="flex items-center justify-between mb-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" />
                {job.postedTime}
              </div>
              {job.salary && (
                <span className="text-sm font-semibold text-foreground">
                  {job.salary}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {job.description}
            </p>
            <div className="flex gap-3 items-center">
              <Link to={`/user/jobs/${job.id}`} className="flex-1">
                <button className="text-primary-600 text-sm font-medium hover:underline cursor-pointer">
                  View Details
                </button>
              </Link>
              <Button className="flex-1">Apply Now</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}