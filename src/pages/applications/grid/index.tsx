import { MapPin, Clock } from 'lucide-react';

import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { renderBadgeByStatus } from '../helpers';
import type { Application } from '..';

interface ApplicationsGridProps {
  setIsShowDetails: (val: boolean) => void;
  filtered: Application[];
  setSelectedApplication: (item: Application) => void;
}

export const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({
  setIsShowDetails,
  filtered,
  setSelectedApplication,
}) => {
  return (
    <div
      className="
            grid
            grid-cols-1    
            xl:grid-cols-2
            gap-5
        "
    >
      {filtered.map((applicationItem) => {
        return (
          <Card className="w-full" hoverable={false} shadow="none">
            <div className="flex justify-between mb-2">
              <p className="font-semibold text-xl">
                {applicationItem.jobTitle}
              </p>
              <Badge
                className={`${renderBadgeByStatus(
                  applicationItem.status
                )} cursor-pointer`}
                onClick={() => {
                  setIsShowDetails(true);
                  setSelectedApplication(applicationItem);
                }}
              >
                {applicationItem.status}
              </Badge>
            </div>
            <div className="flex gap-2 mb-4">
              <p className="text-grey-500">{applicationItem.company}</p>
              <MapPin className="text-grey-300 w-5 h-5" />
              <p className="text-grey-300">{applicationItem.location}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="text-grey-300 w-5 h-5" />
                <p className="text-grey-300">
                  Applied {applicationItem.dateApplied}
                </p>
              </div>

              <p className="text-grey-500 text-lg font-semibold">
                {applicationItem.salary}
              </p>
            </div>
            <p>{applicationItem.description}</p>
          </Card>
        );
      })}
    </div>
  );
};
