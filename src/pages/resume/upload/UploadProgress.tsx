import type React from "react";
import { FileText, X } from "lucide-react";
import Button from "../../../components/ui/button/button";

interface UploadProgressProps {
  fileName: string;
  progress: number;
  onCancel?: () => void;
  disabled?: boolean;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  fileName,
  progress,
  onCancel,
  disabled = false,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3 bg-[rgba(240,240,240)] rounded-lg p-4 border border-[rgba(240,240,240)]">
        <FileText className="w-5 h-5 text-purple-700" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{fileName}</p>
          <p className="text-sm text-muted-foreground">0.9 MB</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={disabled}
          className="text-red-500 hover:text-red-600 disabled:opacity-50"
          icon={<X className="w-4 h-4" />}
          iconPosition="left"
        >
          Remove
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Uploading...</p>
          <p className="text-sm font-medium text-foreground">{Math.round(progress)}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#66005e] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};