import { useState, useEffect, useMemo, useCallback } from "react";
import { Bell, Filter } from "lucide-react";
import Button from "../../components/ui/button/button";
import HelmetLayout, { type HelmetProps } from "../../layouts/helmetlayout";
import { SwitchAI } from "../../components/switchai";
import JobListings from "./jobListing";
import SearchBar from "./searchbar";
import FiltersSidebar from "./filters/desktop";
import FiltersMobileDrawer from "./filters/mobile";
import type { FilterState, Job } from "../../types";
import { parseSalary } from "../../utils/utils";
import { mockJobs } from "../../data";
import "rc-slider/assets/index.css";


const tags: HelmetProps = {
  pageTitle: "User Dashboard",
  description: "",
};


export default function JobSearch() {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    jobType: [],
    workType: [],
    salaryRange: [0, 200],
    experience: [],
    company: "",
  });

  // Pre-optimized jobs with parsed salaries and searchable text
  const optimizedJobs = useMemo(() => 
    mockJobs.map(job => ({
      ...job,
      searchableText: `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase(),
      parsedSalary: parseSalary(job.salary),
      normalizedWorkType: job.workType.toLowerCase(),
      normalizedCompany: job.company.toLowerCase(),
      normalizedLocation: job.location.toLowerCase(),
    })), []
  );

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  // Saved to localStorage when savedJobs changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  // filtering logic 
  useEffect(() => {
    let jobs = optimizedJobs;

    // Filter by tab
    if (activeTab === "saved") {
      const savedSet = new Set(savedJobs);
      jobs = jobs.filter(job => savedSet.has(job.id));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(job => job.searchableText.includes(query));
    }

    // Filter by location - combine both search bar and filter sidebar
    const locationFilter = locationQuery || filters.location;
    if (locationFilter) {
      const location = locationFilter.toLowerCase();
      jobs = jobs.filter(job => 
        job.normalizedLocation.includes(location) ||
        job.normalizedWorkType.includes(location)
      );
    }

    // Apply other filters using Sets for O(1) lookups
    if (filters.jobType.length > 0) {
      const jobTypeSet = new Set(filters.jobType);
      jobs = jobs.filter(job => jobTypeSet.has(job.type));
    }

    if (filters.workType.length > 0) {
      const workTypeSet = new Set(filters.workType.map(type => type.toLowerCase()));
      jobs = jobs.filter(job => workTypeSet.has(job.normalizedWorkType));
    }

    if (filters.company) {
      const companyFilter = filters.company.toLowerCase();
      jobs = jobs.filter(job => job.normalizedCompany.includes(companyFilter));
    }

    // Filter by experience level
    if (filters.experience.length > 0) {
      const experienceSet = new Set(filters.experience);
      jobs = jobs.filter(job => job.experienceLevel && experienceSet.has(job.experienceLevel));
    }

    // Filter by salary range 
    const [filterMin, filterMax] = filters.salaryRange;
    jobs = jobs.filter(job => {
      if (!job.parsedSalary) return true;
      
      const { min: minSalary, max: maxSalary } = job.parsedSalary;
      
      // Job qualifies if ANY part of its salary range falls within filter range
      return minSalary <= filterMax && maxSalary >= filterMin;
    });

    setFilteredJobs(jobs);
  }, [activeTab, savedJobs, searchQuery, locationQuery, filters, optimizedJobs]);

  const toggleSaveJob = useCallback((jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      location: "",
      jobType: [],
      workType: [],
      salaryRange: [0, 200],
      experience: [],
      company: "",
    });
    setSearchQuery("");
    setLocationQuery("");
  }, []);

  const shareJob = useCallback((job: Job) => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: job.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${job.title} at ${job.company}\n${job.description}\n${window.location.href}`
      );
      alert('Job link copied to clipboard!');
    }
  }, []);

  return (
    <HelmetLayout {...tags}>
      <div className="min-h-screen bg-background">
        <p className="mb-2 font-semibold text-2xl">Find Your Perfect Job</p>
        <p className="mb-6 font-normal text-[16px]">
          Search thousands of job listings to find your next opportunity
        </p>

        <SwitchAI />
        
        <div className="mb-4">
          <SearchBar 
            jobSearch={searchQuery}
            setJobSearch={setSearchQuery}
            locationSearch={locationQuery}
            setLocationSearch={setLocationQuery}
          />
        </div>

        <div className="py-4 xl:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-8">
            <div className="hidden xl:block">
              <div className="mb-4 flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    activeTab === "all"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    activeTab === "saved"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Saved Jobs
                </button>
              </div>
              <FiltersSidebar 
                filters={filters} 
                setFilters={setFilters}
                onClearAll={clearAllFilters}
              />
            </div>
            <div className="space-y-4">
              <div className="xl:hidden">
                <div className="mb-4 flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      activeTab === "all"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All Jobs
                  </button>
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      activeTab === "saved"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Saved Jobs
                  </button>
                </div>

                <div className="flex justify-between items-center gap-3 mb-4">
                  <p className="font-medium">
                    {activeTab === "all" ? "All Jobs" : "Saved Jobs"}
                  </p>
                  <Button
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-secondary bg-transparent"
                    onClick={() => setShowFiltersDrawer(true)}
                    icon={<Filter className="w-4 h-4" />}
                  >
                    Filters
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 bg-white border w-full mb-4"
                  icon={<Bell className="w-4 h-4 text-primary-500" />}
                >
                  <span className="text-primary-500">Create Job Alert</span>
                </Button>
              </div>
              <div className="hidden xl:flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white border"
                  icon={<Bell className="w-4 h-4 text-primary-500" />}
                >
                  <span className="text-primary-500">Create Job Alert</span>
                </Button>
              </div>
              <JobListings 
                jobs={filteredJobs}
                savedJobs={savedJobs}
                onToggleSave={toggleSaveJob}
                onShare={shareJob}
              />
            </div>
          </div>
        </div>
        <FiltersMobileDrawer
          open={showFiltersDrawer}
          onOpenChange={setShowFiltersDrawer}
          filters={filters}
          setFilters={setFilters}
          onClearAll={clearAllFilters}
        />
      </div>
    </HelmetLayout>
  );
}
