import type React from "react";
import { FileText, Eye, Download, Trash2 } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { UploadIcon } from "../../../assets";
import type { Resume } from "../../../types";

interface ResumeListProps {
  resumes: Resume[];
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onUploadClick: () => void;
  onDeleteResume: (id: string) => void;
}

export const ResumeList: React.FC<ResumeListProps> = ({
  resumes,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadClick,
  onDeleteResume,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your Resumes</h2>
        <p className="text-muted-foreground">Manage and organize your resume files</p>
      </div>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-lg p-8 mb-6 transition-colors ${
          isDragging
            ? "border-purple-700 bg-purple-50 dark:bg-purple-950/20"
            : "border-muted-foreground/30 bg-muted/30"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <img src={UploadIcon} alt="upload icon" className="mb-2" />
          <p className="text-foreground font-medium">Drop your resume here</p>
          <p className="text-muted-foreground text-sm">or</p>
          <Button
            variant="outline"
            bg="bg-[#66005e]"
            onClick={onUploadClick}
            className="mt-3 bg-transparent"
          >
            Browse Files
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-700 dark:text-purple-300" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{resume.name}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded {resume.uploadedAt} • {resume.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
               icon={<Eye className="w-4 h-4" />}
                iconPosition="left"
              >
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteResume(resume.id)}
                className="text-muted-foreground hover:text-red-500"
                icon={<Trash2 className="w-4 h-4" />}
                iconPosition="left"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};