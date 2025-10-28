import { Briefcase, Calendar, User, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

import { Card } from '../../components/ui/card';
import Dialog from '../../components/ui/dialog';

export interface NotificationDetails {
  position: string;
  companyName: string;
  location: string;
  date: string;
  time: string;
}

export type NotificationType = 'interview' | 'application' | 'profile';

export interface Notification {
  title: string;
  description: string;
  date: string;
  itemType: NotificationType;
  itemDetails: NotificationDetails;
}

interface NotificationProps {
  notification: Partial<Notification>;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'interview':
      return (
        <div className="bg-[#DBEAFE] rounded-3xl p-1">
          <Calendar className="w-4 h-4 text-[#2563EB]" />
        </div>
      );
    case 'application':
      return (
        <div className="bg-purple-500 rounded-3xl p-1">
          <Briefcase className="w-4 h-4 text-primary-500" />
        </div>
      );
    case 'profile':
      return (
        <div className="bg-[#F1F1F1] rounded-3xl p-1">
          <User className="w-4 h-4 text-grey-500" />
        </div>
      );
    default:
      <div className="bg-purple-500 rounded-3xl p-1">
        <Briefcase className="w-4 h-4 text-primary-500" />
      </div>;
  }
};

const timeAgo = (date: string | number | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) {
    const remainingDays = days - months * 30;
    const extraWeeks = Math.floor(remainingDays / 7);
    return `${months} mnth${months !== 1 ? "s" : ""}${
      extraWeeks ? ` ${extraWeeks} wk${extraWeeks !== 1 ? "s" : ""}` : ""
    } ago`;
  }

  const remainingMonths = Math.floor((days - years * 365) / 30);
  return `${years} yr${years !== 1 ? "s" : ""}${
    remainingMonths ? ` ${remainingMonths} mth${remainingMonths !== 1 ? "s" : ""}` : ""
  } ago`;
};

export const NotificationCard: React.FC<NotificationProps> = ({
  notification,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="px-2 py-3 md:p-[20px]" hoverable={false} shadow="none">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-3">
            {getIcon(notification.itemType as NotificationType)}
            <p className="font-semibold text-[16px]">{notification.title}</p>
          </div>
          <p className="font-normal text-[14px] text-grey-300">
            {timeAgo(String(notification.date))}
          </p>
        </div>
        <p className="font-normal text-[14px] text-grey-300 ml-9">
          {notification.description}
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="text-primary-700 font-medium text-sm flex items-center gap-1 hover:underline cursor-pointer"
          >
            View Details
          </button>
        </div>
      </Card>

      {isOpen && (
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={notification.title}
          className="md:min-w-[632px] pt-2 md:px-4 md:pt-6 md:pb-4 text-2xl"
          titleSize="2xl"
        >
          <div className="pt-4">
            <p className="font-semibold text-xl mb-2">
              {notification.itemDetails?.position}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[16px] text-grey-500">
                {notification.itemDetails?.companyName}
              </span>{' '}
              <MapPin className="text-grey-300 h-4 w-4" />
              <span className="text-[16px] text-grey-300">
                {notification.itemDetails?.location}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[16px] text-grey-300 mb-6">
              <Clock className="text-grey-300 h-5 w-5" />
              <p>
                Received: <span>{notification.itemDetails?.date}</span>
                {' '}at{' '}
                <span>{notification.itemDetails?.time}</span>
              </p>
            </div>
            <div className="bg-[#F8F8F8] p-2 rounded-xl">
              <p className="font-semibold text-[18px] mb-2">Information</p>
              <p className="text-[14px] text-grey-300">
                {notification.description}
              </p>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
