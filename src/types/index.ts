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
  
  export interface NotificationDetails {
    position: string;
    companyName: string;
    location: string;
    date: string;
    time: string;
  }
  
  export type NotificationType = 'interview' | 'application' | 'profile';
  
  export interface Notification {
    title: string;
    description: string;
    date: string;
    itemType: NotificationType;
    itemDetails: NotificationDetails;
  }

  export interface StatCard {
    label: string
    value: number
    icon: React.ReactNode
    color: string
    bgColor: string
  }

  export interface Resume {
    id: string;
    name: string;
    uploadedAt: string;
    size: string;
  }
  
  export type UploadState = "idle" | "uploading" | "success";
  
  export type UploadStage = "list" | "upload" | "success";