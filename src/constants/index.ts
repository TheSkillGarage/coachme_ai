export const SUPPORTED_FORMATS = ["pdf", "doc", "docx", "xlsx", "pptx", "png", "svg"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const FILE_VALIDATION_MESSAGES = {
  INVALID_FORMAT: "Invalid file format. Please upload a supported file type.",
  FILE_TOO_LARGE: "File size exceeds 5MB limit.",
  GENERAL_ERROR: "Invalid file. Please check format and size (max 5MB).",
};