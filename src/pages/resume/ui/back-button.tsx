import type React from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../../../components/ui/button/button";

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  disabled = false 
}) => {
  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
        className="text-muted-foreground hover:text-foreground rounded-full px-3 py-2 bg-white border border-[rgba(255,255,255,1)] transition-all"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
      >
        Back
      </Button>
    </div>
  );
};