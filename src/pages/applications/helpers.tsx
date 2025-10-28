import { Briefcase, Clock, CircleX, CircleCheck, Calendar } from 'lucide-react';
import type { Application } from '.';

export const renderBadgeByStatus = (status: string) => {
  switch (status) {
    case 'Applied':
      return 'bg-[#DBEAFE] text-[#1E40AF] min-w-fit max-h-[30px] px-1 xl:py-1 xl:px-2 border border-[#1E40AF]';
    case 'Interview Scheduled':
      return 'bg-[#FEF9C3] text-[#904D0E] min-w-fit max-h-[30px] px-1 xl:py-1 xl:px-2 border border-[#904D0E]';
    case 'Offer Received':
      return 'bg-[#F0FDF4] text-[#166534] min-w-fit max-h-[30px] px-1 xl:py-1 xl:px-2 border border-[#166534]';
    case 'Rejected':
      return 'bg-[#FFEEEE] text-[#C80000] min-w-fit max-h-[30px] px-1 xl:py-1 xl:px-2 border border-[#C80000]';
    default:
      return 'bg-[#DBEAFE] text-[#1E40AF] min-w-fit max-h-[30px] px-1 xl:py-1 xl:px-2 border border-[#1E40AF]';
  }
};

export const parseDMY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export const calculateMonthlyChangeByStatus = (data: Application[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const groupedByStatus = data.reduce<Record<string, Application[]>>(
    (acc, item) => {
      if (!acc[item.status]) acc[item.status] = [];
      acc[item.status].push(item);
      return acc;
    },
    {}
  );

  const result: Record<
    string,
    {
      currentMonthCount: number;
      lastMonthCount: number;
      total: number;
      diff: number;
      percentChange: number;
      trend: 'up' | 'down' | 'steady';
    }
  > = {};

  let totalCurrentAll = 0;
  let totalLastAll = 0;
  let totalAppliedCurrent = 0;
  let totalAppliedLast = 0;

  for (const [status, items] of Object.entries(groupedByStatus)) {
    const currentMonthCount = items.filter((item) => {
      const d = parseDMY(item.dateApplied);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    const lastMonthCount = items.filter((item) => {
      const d = parseDMY(item.dateApplied);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    }).length;

    const total = currentMonthCount + lastMonthCount;
    const diff = currentMonthCount - lastMonthCount;
    const percentChange =
      lastMonthCount === 0 ? 100 : (diff / lastMonthCount) * 100;

    totalCurrentAll += currentMonthCount;
    totalLastAll += lastMonthCount;

    if (status.toLowerCase() === 'applied') {
      totalAppliedCurrent += currentMonthCount;
      totalAppliedLast += lastMonthCount;
    }

    result[status] = {
      currentMonthCount,
      lastMonthCount,
      total,
      diff,
      percentChange,
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'steady',
    };
  }

  const overallDiff = totalCurrentAll - totalLastAll;
  const overallPercent =
    totalLastAll === 0 ? 100 : (overallDiff / totalLastAll) * 100;

  const appliedDiff = totalAppliedCurrent - totalAppliedLast;
  const appliedPercent =
    totalAppliedLast === 0 ? 100 : (appliedDiff / totalAppliedLast) * 100;

  return {
    byStatus: result,
    totalAll: {
      currentMonthCount: totalCurrentAll,
      lastMonthCount: totalLastAll,
      total: totalCurrentAll + totalLastAll,
      diff: overallDiff,
      percentChange: overallPercent,
      trend: overallDiff > 0 ? 'up' : overallDiff < 0 ? 'down' : 'steady',
    },
    totalApplied: {
      currentMonthCount: totalAppliedCurrent,
      lastMonthCount: totalAppliedLast,
      total: totalAppliedCurrent + totalAppliedLast,
      diff: appliedDiff,
      percentChange: appliedPercent,
      trend: appliedDiff > 0 ? 'up' : appliedDiff < 0 ? 'down' : 'steady',
    },
  };
};

export const renderTitleByStatus = (status: string) => {
  switch (status) {
    case 'Applied':
      return 'Pending Applications';
    case 'Interview Scheduled':
      return 'Interviews Scheduled';
    case 'Offer Received':
      return 'Offers Received';
    case 'Rejected':
      return 'Rejections';
    default:
      return '';
  }
};

export const renderIconByStatus = (status: string) => {
  switch (status) {
    case 'Applied':
      return <Clock className="w-4 h-4 text-[#FF6600]" />;
    case 'Interview Scheduled':
      return <Calendar className="w-4 h-4 text-grey-400" />;
    case 'Offer Received':
      return <CircleCheck className="w-4 h-4 text-[#166534]" />;
    case 'Rejected':
      return <CircleX className="w-4 h-4 text-[#C80000]" />;
    default:
      return <Briefcase className="w-4 h-4 text-primary-500" />;
  }
};

export const renderIconBgByStatus = (status: string) => {
  switch (status) {
    case 'Applied':
      return 'bg-[#FFEADC]';
    case 'Interview Scheduled':
      return 'bg-[#F8F8F8]';
    case 'Offer Received':
      return 'bg-[#F0FDF4]';
    case 'Rejected':
      return 'bg-[#F8F8F8]';
    default:
      return 'bg-purple-500';
  }
};

export const statuses = [
  'Interview Scheduled',
  'Offer Received',
  'Rejected',
  'Applied',
];
