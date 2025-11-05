import { useState } from "react";
import type { Resume, UploadState } from "../types";
import { formatFileSize } from "../utils/fileValidation";

export const useResumeManager = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const uploadResume = async (file: File): Promise<void> => {
    setUploadState("uploading");
    setUploadProgress(0);
    setUploadedFileName(file.name);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const newResume: Resume = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      uploadedAt: new Date().toLocaleDateString(),
      size: formatFileSize(file.size),
    };

    setResumes([newResume, ...resumes]);
    setUploadProgress(100);
    setUploadState("success");
  };

  const deleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  const resetUploadState = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setUploadedFileName("");
  };

  return {
    resumes,
    uploadProgress,
    uploadState,
    uploadedFileName,
    uploadResume,
    deleteResume,
    resetUploadState,
  };
};