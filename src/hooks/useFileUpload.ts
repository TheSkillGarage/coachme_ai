import { useState, useRef } from "react";
import { isValidFile } from "../utils/fileValidation";
import { FILE_VALIDATION_MESSAGES } from "../constants";

export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      } else {
        alert(FILE_VALIDATION_MESSAGES.GENERAL_ERROR);
        setSelectedFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileInput(e.dataTransfer.files);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    selectedFile,
    setSelectedFile,
    isDragging,
    fileInputRef,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearSelectedFile,
  };
};