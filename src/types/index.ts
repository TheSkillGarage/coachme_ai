export interface FilterState {
    location: string;
    jobType: string[];
    workType: string[];
    salaryRange: number[];
    experience: string[];
    company: string;
  }

  export interface Job {
    id: number;
    title: string;
    company: string;
    logo: string;
    type: string;
    location: string;
    workType: string;
    postedTime: string;
    salary: string | null;
    description: string;
    skills: string[];
    fullDescription: string;
    companyDescription: string;
    similarJobs: number[];
    experienceLevel?: string;
  }
  
  export interface SimilarJob {
    id: number;
    title: string;
    company: string;
    logo: string;
    location: string;
  }
  
  export interface FilterState {
    location: string;
    jobType: string[];
    workType: string[];
    salaryRange: number[];
    experience: string[];
    company: string;
  }
  