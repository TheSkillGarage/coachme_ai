import type React from "react";
import { Upload, X } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { FileDropZone } from "./FileDropZone";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import type { UploadState } from "../../../types";

interface UploadResumeFlowProps {
  selectedFile: File | null;
  isDragging: boolean;
  uploadState: UploadState;
  uploadProgress: number;
  uploadedFileName: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputClick: () => void;
  onFileRemove: () => void;
  onCancel: () => void;
  onUpload: () => void;
}

export const UploadResumeFlow: React.FC<UploadResumeFlowProps> = ({
  selectedFile,
  isDragging,
  uploadState,
  uploadProgress,
  uploadedFileName,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputClick,
  onFileRemove,
  onCancel,
  onUpload,
}) => {
  return (
    <div className="min-h-full bg-background p-0 lg:px-6 lg:py-8">
      <div className="mx-auto">
        <div className="bg-Neutral px-4 md:px-10 pt-4 md:pt-10 pb-4 md:pb-12 rounded-xl outline-1 outline-offset-[-1px] outline-[#e8e8e8]">
          <h2 className="text-[#1b1b1b] text-xl md:text-2xl font-semibold mb-2">
            Upload Your Resume
          </h2>
          <p className="text-base mb-8">
            Upload your resume to get started with your job search
          </p>

          <FileDropZone
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={onFileInputClick}
          />

          {selectedFile && uploadState !== "uploading" && (
            <FilePreview file={selectedFile} onRemove={onFileRemove} />
          )}

          {uploadState === "uploading" && (
            <UploadProgress
              fileName={uploadedFileName}
              progress={uploadProgress}
              disabled={true}
            />
          )}

          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={uploadState === "uploading"}
              className="px-6 py-2 bg-transparent text-primary-400"
              icon={<X className="w-4 h-4" />}
              iconPosition="left"
            >
              Cancel
            </Button>
            <Button
              onClick={onUpload}
              disabled={!selectedFile || uploadState === "uploading"}
              bg="bg-[#66005e]"
              color="text-white"
              rounded="lg"
              className={`px-6 py-2 transition-all shadow-sm hover:shadow-md
          ${
            !selectedFile || uploadState === "uploading"
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#4d0048]"
          }`}
              icon={<Upload className="w-4 h-4" />}
              iconPosition="left"
            >
              {uploadState === "uploading" ? "Uploading Resume" : "Upload Resume"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};