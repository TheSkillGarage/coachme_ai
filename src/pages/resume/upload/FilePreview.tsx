import type React from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/button/button";
import { FileIcon } from "../../../assets";
import { formatFileSize } from "../../../utils/fileValidation";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  disabled = false,
}) => {
  return (
    <div className="bg-[rgba(240,240,240)] rounded-lg p-6 mb-6 border border-[rgba(240,240,240)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={FileIcon} alt="upload icon" className="mb-2" />
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="text-sm text-muted-foreground text-grey-100">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={disabled}
          className="text-red-500 hover:text-red-600 disabled:opacity-50"
          icon={<X className="w-4 h-4" />}
          iconPosition="left"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};