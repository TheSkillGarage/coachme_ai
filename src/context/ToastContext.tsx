import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// Only create and export the context — no components here
export const ToastContext = createContext<ToastContextType | undefined>(undefined);
