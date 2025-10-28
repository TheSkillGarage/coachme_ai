import { Search, X, List, Grip, ListFilter } from 'lucide-react';

import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input/input';
import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/ui/button/button';
import { StatusDialog } from './statusDialog';
import { ApplicationsTable } from './table';
import { applicationsData } from './data';
import { ApplicationsGrid } from './grid';
import { TopCards } from './topCards';
import { Pagination } from '../../components/ui/pagination';
import { parseDMY } from './helpers';

const tags: HelmetProps = {
  pageTitle: 'User Dashboard',
  description: '',
};

export interface Application {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  dateApplied: string;
  status: string;
  description?: string;
}

export default function Main() {
  const [tableView, setTableView] = useState('table');
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const sorted = [...filtered].sort(
      (a, b) =>
        parseDMY(b.dateApplied).getTime() - parseDMY(a.dateApplied).getTime()
    );

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return sorted.slice(start, end);
  }, [currentPage, filtered, itemsPerPage]);

  useEffect(() => {
    if (!applicationsData) return;

    const search = applicationsData.filter((item: Application) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    setFiltered(search);
  }, [searchQuery, applicationsData]);

  const changeView = (view: string) => {
    setTableView(view);
    setSearchQuery('');

    if (view === 'grid') {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(5);
    }
  };

  return (
    <HelmetLayout {...tags}>
      <div className="flex-1 overflow-y-hidden overflow-x-hidden">
        <p className="mb-2 font-semibold text-2xl">Application Tracker</p>
        <p className="mb-6 font-normal text-[16px]">
          Track and manage your job applications
        </p>
        
        <div
          className="
            grid
            grid-cols-1          
            xl:grid-cols-5    
            gap-3
            md:gap-4
            mb-6
        "
        >
          <TopCards />
        </div>

        <div>
          <Card hoverable={false} shadow="none">
            <div className="flex justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Input
                  className="xl:min-w-[484px]"
                  placeholder="Search"
                  leftIcon={Search}
                  rightIcon={X}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onRightIconClick={() => setSearchQuery('')}
                />
                <Button
                  icon={<ListFilter />}
                  iconPosition="left"
                  variant="outline"
                  className="text-grey-200 border-grey-200"
                >
                  Filter
                </Button>
              </div>
              <div className="flex bg-[#F8F8F8] p-1 rounded-xl">
                <div
                  className={`${
                    tableView === 'grid' ? 'bg-purple-500' : 'bg-[#F8F8F8]'
                  } cursor-pointer p-2.5 rounded-lg`}
                  onClick={() => changeView('grid')}
                >
                  <Grip />
                </div>
                <div
                  className={`${
                    tableView === 'table' ? 'bg-purple-500' : 'bg-[#F8F8F8]'
                  } cursor-pointer p-2.5 rounded-lg`}
                  onClick={() => changeView('table')}
                >
                  <List />
                </div>
              </div>
            </div>
            {tableView === 'table' ? (
              <ApplicationsTable
                setIsShowDetails={setIsShowDetails}
                filtered={paginatedData}
                setSelectedApplication={setSelectedApplication}
              />
            ) : (
              <ApplicationsGrid
                setIsShowDetails={setIsShowDetails}
                filtered={paginatedData}
                setSelectedApplication={setSelectedApplication}
              />
            )}
          </Card>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {isShowDetails ? (
        <StatusDialog
          key={selectedApplication?.id}
          isShowDetails={isShowDetails}
          setIsShowDetails={setIsShowDetails}
          applicationItem={selectedApplication as Application}
        />
      ) : null}
    </HelmetLayout>
  );
}
