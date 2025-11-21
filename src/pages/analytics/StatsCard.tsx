import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeColor?: string;
  icon: ReactNode;
  iconBg: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeColor = "text-green-600",
  icon,
  iconBg,
}: StatsCardProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border-[#E5E7EB] p-3 flex flex-col gap-3">
      
      <div className="w-full flex justify-between items-center whitespace-nowrap">
        <p className="text-[14px] font-medium text-[#5f6773]"> {title} </p>

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      <p className="text-[24px] font-bold">{value}</p>

      <p className={`text-[14px] font-medium whitespace-nowrap ${changeColor}`}>
        {change}
      </p>
    </div>
  );
}
