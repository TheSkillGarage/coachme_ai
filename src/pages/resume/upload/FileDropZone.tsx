import type React from "react";
import { UploadIcon } from "../../../assets";

interface FileDropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
}) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      className={`rounded border-2 border-dashed border-[rgba(184,184,184,1)] p-12 mb-20 cursor-pointer transition-colors ${
        isDragging ? "border-purple-700 bg-purple-50 dark:bg-purple-950/20" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <img src={UploadIcon} alt="upload icon" className="mb-2" />
        <p className="text-foreground font-medium mb-1">
          Drag & Drop your file here or{" "}
          <span className="text-primary-400 mx-1">Browse Files</span> to Upload
        </p>
        <p className="text-sm text-muted-foreground mt-4 text-gray-400">
          Supported file types: PDF, DOCX, XLSX, PPTX, PNG, SVG (Max 5MB)
        </p>
      </div>
    </div>
  );
};