import React from 'react';
import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/utils';

interface TopCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBg?: string; // customizable background color for the icon
  actionText?: string;
  onActionClick?: () => void;
  cardProps?: Partial<React.ComponentProps<typeof Card>>;
  isNoButton?: boolean;
  children?: React.ReactNode;
  titleStyles?: string;
}

export const TopCard: React.FC<TopCardProps> = ({
  title,
  description,
  icon,
  iconBg = 'bg-primary-100', // default color
  actionText = 'Get Started',
  onActionClick,
  cardProps,
  isNoButton,
  children,
  titleStyles,
}) => {
  return (
    <Card
      {...cardProps}
      className="p-4 flex flex-col justify-between h-full rounded-xl border border-gray-100 shadow-sm bg-white select-none"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={cn(
              'font-semibold text-gray-900 text-sm md:text-base',
              titleStyles
            )}
          >
            {title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>

        {icon && (
          <div className={`p-1 rounded-full ${iconBg} text-primary-700`}>
            {icon}
          </div>
        )}
      </div>

      {children ? <>{children}</> : null}

      {isNoButton ? null : (
        <button
          onClick={onActionClick}
          className="text-primary-700 font-medium text-sm flex items-center gap-1 hover:underline cursor-pointer"
        >
          {actionText}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </Card>
  );
};
