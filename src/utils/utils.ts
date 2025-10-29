import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely.
 * - Removes duplicates
 * - Allows conditional className logic
 * Example: cn("p-2", condition && "bg-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseSalary = (salary: string | null): { min: number; max: number } | null => {
  if (!salary) return null;
  
  try {
    const numbers = salary.match(/\$?([0-9,]+)/g);
    if (!numbers || numbers.length < 2) return null;
    
    const min = parseInt(numbers[0].replace(/[$,]/g, '')) / 1000;
    const max = parseInt(numbers[1].replace(/[$,]/g, '')) / 1000;
    
    return { min, max };
  } catch (error) {
    console.error('Failed to parse salary:', salary, error);
    return null;
  }
};
