import { Badge } from '../../../components/ui/badge';
import { Table } from '../../../components/ui/table';
import { renderBadgeByStatus } from '../helpers';
import type { Application } from '..';

interface ApplicationsTableProps {
  setIsShowDetails: (val: boolean) => void;
  filtered: Application[];
  setSelectedApplication: (item: Application) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  setIsShowDetails,
  filtered,
  setSelectedApplication,
}) => {
  const applicationsColumns = [
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'salary', label: 'Salary' },
    { key: 'dateApplied', label: 'Date Applied' },
    {
      key: 'status',
      label: 'Status',
      render: (applicationItem: Application) => (
        <Badge
          className={`${renderBadgeByStatus(applicationItem.status)}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsShowDetails(true);
            setSelectedApplication(applicationItem);
          }}
        >
          {applicationItem.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="max-w-[392px] md:max-w-full">
      <div className="overflow-x-hidden">
        <Table columns={applicationsColumns} data={filtered} striped={false} />
      </div>
    </div>
  );
};
