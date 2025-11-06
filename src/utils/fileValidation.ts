import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from "../constants";

export const isValidFile = (file: File): boolean => {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return (
    !!fileExtension &&
    SUPPORTED_FORMATS.includes(fileExtension) &&
    file.size <= MAX_FILE_SIZE
  );
};

export const formatFileSize = (bytes: number): string => {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
};