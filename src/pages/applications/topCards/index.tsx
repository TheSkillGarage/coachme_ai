import { ClipboardList, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

import { TopCard } from '../../../components/topcard';
import {
  calculateMonthlyChangeByStatus,
  renderIconBgByStatus,
  renderIconByStatus,
  renderTitleByStatus,
  statuses,
} from '../helpers';
import { applicationsData } from '../data';
import { cn } from '../../../utils/utils';

export const TopCards: React.FC = () => {
  const metrics = useMemo(
    () => calculateMonthlyChangeByStatus(applicationsData),
    []
  );

  return (
    <>
      <TopCard
        key="totalAll"
        title="Total Applications"
        description=""
        icon={<ClipboardList className="w-4 h-4 text-primary-500" />}
        iconBg="bg-purple-500"
        titleStyles="md:text-[14px] font-medium"
        isNoButton
        cardProps={{
          shadow: 'none',
          hoverable: false,
          className: 'min-w-[204px]',
        }}
      >
        <p className="font-semibold text-2xl mb-4">{metrics.totalAll.total}</p>
        <p className="flex text-grey-400 text-sm gap-1">
          <span
            className={cn(
              metrics.totalAll.trend === 'up'
                ? 'text-green-500'
                : 'text-red-500',
              'flex gap-0.5 items-center'
            )}
          >
            {metrics.totalAll.trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(metrics.totalAll.percentChange).toFixed(0)}%
          </span>
          <span>from last month</span>
        </p>
      </TopCard>

      {Object.entries(metrics.byStatus)
        .sort(([a], [b]) => statuses.indexOf(a) - statuses.indexOf(b))
        .map(([status, stat]) => (
          <TopCard
            key={status}
            title={renderTitleByStatus(status)}
            description=""
            icon={renderIconByStatus(status)}
            iconBg={renderIconBgByStatus(status)}
            titleStyles="md:text-[14px] font-medium"
            isNoButton
            cardProps={{
              shadow: 'none',
              hoverable: false,
              className: 'min-w-[204px]',
            }}
          >
            <p className="font-semibold text-2xl mb-4">{stat.total}</p>
            <p className="flex text-grey-400 text-sm gap-1">
              <span
                className={cn(
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500',
                  'flex gap-0.5 items-center'
                )}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(stat.percentChange).toFixed(0)}%
              </span>
              <span>from last month</span>
            </p>
          </TopCard>
        ))}
    </>
  );
};
