import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker.mjs?worker";
import type { ParsedResumeData } from "../types";

pdfjsLib.GlobalWorkerOptions.workerPort = new worker();

/**
 * Parse resume file and extract structured data
 */
export async function parseResumeFile(file: File): Promise<ParsedResumeData | null> {
  try {
    const fileType = file.name.split(".").pop()?.toLowerCase();
    let extractedText = "";

    // Extract text based on file type
    if (fileType === "pdf") {
      extractedText = await extractTextFromPDF(file);
    } else if (fileType === "docx" || fileType === "doc") {
      extractedText = await extractTextFromDOCX(file);
    } else {
      console.error("Unsupported file type");
      return null;
    }

    // Parse the extracted text into structured data
    const parsedData = parseResumeText(extractedText);
    return parsedData;
  } catch (error) {
    console.error("Error parsing resume:", error);
    return null;
  }
}

/**
 * Extract text from DOCX file
 */
async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
    let fullText = "";
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
  
      // Type guard to ensure we only use TextItem objects
      const pageText = textContent.items
        .map((item) => {
          if ("str" in item) {
            // item is a TextItem
            return item.str;
          }
          return "";
        })
        .join(" ");
  
      fullText += pageText + "\n";
    }
  
    return fullText;
  }
/**
 * Parse extracted text into structured data using regex patterns
 * Note: This is a basic implementation. For production, consider using:
 * - AI APIs (OpenAI, Claude API) for better accuracy
 * - Specialized resume parsing services (Affinda, Sovren, etc.)
 */
function parseResumeText(text: string): ParsedResumeData {
  // Email regex
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const email = emailMatch ? emailMatch[0] : "";

  // Phone regex (supports various formats)
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "";

  // Extract name (assumes name is at the beginning)
  const lines = text.split("\n").filter((line) => line.trim());
  const nameMatch = lines[0]?.match(/^([A-Z][a-z]+)\s+([A-Z][a-z]+)/);
  const firstName = nameMatch ? nameMatch[1] : "";
  const lastName = nameMatch ? nameMatch[2] : "";

  // Location regex (city, state patterns)
  const locationMatch = text.match(/([A-Z][a-z]+,?\s*[A-Z]{2})|([A-Z][a-z]+,\s*[A-Z][a-z]+)/);
  const location = locationMatch ? locationMatch[0] : "";

  // Extract summary (usually after "Summary" or "Objective" heading)
  const summaryMatch = text.match(/(?:Summary|Objective|Profile)[:\s]*([^\n]+(?:\n[^\n]+)*?)(?=\n\n|\n[A-Z])/i);
  const summary = summaryMatch ? summaryMatch[1].trim() : "";

  // Extract experiences (basic pattern)
  const experiences = extractExperiences(text);

  // Extract education
  const educations = extractEducation(text);

  // Extract skills
  const skills = extractSkills(text);

  return {
    personal: {
      firstName,
      lastName,
      email,
      phone,
      location,
      summary,
    },
    experiences,
    educations,
    skills,
  };
}

/**
 * Extract work experience from text
 */
function extractExperiences(text: string): ParsedResumeData["experiences"] {
  const experiences: ParsedResumeData["experiences"] = [];
  
  // Look for experience section
  const experienceSection = text.match(/(?:Experience|Work History)[:\s]*([\s\S]*?)(?=\n(?:Education|Skills|Projects|$))/i);
  
  if (experienceSection) {
    const expText = experienceSection[1];
    // Split by job entries (basic pattern)
    const jobEntries = expText.split(/\n(?=[A-Z])/);
    
    jobEntries.forEach((entry) => {
      const lines = entry.split("\n").filter((l) => l.trim());
      if (lines.length >= 2) {
        experiences.push({
          jobTitle: lines[0]?.trim() || "",
          company: lines[1]?.trim() || "",
          startDate: extractDate(entry, "start") || "",
          endDate: extractDate(entry, "end") || "",
          description: lines.slice(2).join(" ").trim() || "",
        });
      }
    });
  }
  
  // Return at least one empty experience if none found
  return experiences.length > 0 ? experiences : [
    { jobTitle: "", company: "", startDate: "", endDate: "", description: "" }
  ];
}

/**
 * Extract education from text
 */
function extractEducation(text: string): ParsedResumeData["educations"] {
  const educations: ParsedResumeData["educations"] = [];
  
  const educationSection = text.match(/(?:Education)[:\s]*([\s\S]*?)(?=\n(?:Experience|Skills|Projects|$))/i);
  
  if (educationSection) {
    const eduText = educationSection[1];
    const eduEntries = eduText.split(/\n(?=[A-Z])/);
    
    eduEntries.forEach((entry) => {
      const lines = entry.split("\n").filter((l) => l.trim());
      if (lines.length >= 1) {
        educations.push({
          degree: lines[0]?.trim() || "",
          course: "",
          institution: lines[1]?.trim() || "",
          graduationDate: extractDate(entry, "graduation") || "",
          location: "",
        });
      }
    });
  }
  
  return educations.length > 0 ? educations : [
    { degree: "", course: "", institution: "", graduationDate: "", location: "" }
  ];
}

/**
 * Extract skills from text
 */
function extractSkills(text: string): string[] {
  const skillsSection = text.match(/(?:Skills)[:\s]*([\s\S]*?)(?=\n(?:Experience|Education|Projects|$))/i);
  
  if (skillsSection) {
    const skillsText = skillsSection[1];
    const skills = skillsText
      .split(/[,•\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return skills;
  }
  
  return [];
}

/**
 * Extract dates from text
 */
function extractDate(text: string, type: "start" | "end" | "graduation"): string | null {
  // Match various date formats: Jan 2020, 01/2020, 2020, etc.
  const dateMatches = text.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d{4}|\d{1,2}\/\d{4}|\d{4}/g);
  
  if (!dateMatches) return null;
  
  if (type === "start") return dateMatches[0] || null;
  if (type === "end") return dateMatches[1] || "Present";
  if (type === "graduation") return dateMatches[0] || null;
  
  return null;
}

// ============================================
// ALTERNATIVE: Use AI API for better parsing
// ============================================

/**
 * Parse resume using AI (OpenAI/Claude API)
 * This provides much better accuracy than regex
 */
// export async function parseResumeWithAI(text: string): Promise<ParsedResumeData> {
//   // Example using OpenAI API
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a resume parser. Extract structured data from the resume text in JSON format.",
//         },
//         {
//           role: "user",
//           content: `Parse this resume and return JSON with personal info, experiences, educations, and skills:\n\n${text}`,
//         },
//       ],
//     }),
//   });

//   const data = await response.json();
//   const parsedData = JSON.parse(data.choices[0].message.content);
  
//   return parsedData;
// }