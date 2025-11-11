import { Search, X, ArrowUp, ArrowDown } from 'lucide-react';

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
import { ApplicationsSort } from './sort';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: 'dateApplied',
    direction: 'desc',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortLabels: Record<string, string> = {
    dateApplied: 'Date',
    jobTitle: 'Title',
    company: 'Company',
    status: 'Status',
  };

  const filtered = useMemo(() => {
    return applicationsData.filter((item: Application) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationsData, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.field === 'dateApplied') {
        aValue = parseDMY(a.dateApplied).getTime();
        bValue = parseDMY(b.dateApplied).getTime();
      } else if (sortConfig.field === 'company') {
        aValue = a.company.toLowerCase();
        bValue = b.company.toLowerCase();
      } else if (sortConfig.field === 'jobTitle') {
        aValue = a.jobTitle.toLowerCase();
        bValue = b.jobTitle.toLowerCase();
      } else if (sortConfig.field === 'status') {
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      } else {
        const result = String(aValue).localeCompare(String(bValue));
        return sortConfig.direction === 'asc' ? result : -result;
      }
    });
  }, [filtered, sortConfig]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sorted.slice(start, end);
  }, [sorted, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <HelmetLayout {...tags}>
      <div className="min-h-screen p-0 bg-background box-border overflow-x-hidden">
        <p className="font-semibold text-2xl mb-2">Application Tracker</p>
        <p className="font-normal text-[16px] mb-6">
          Track and manage your job applications
        </p>
        <div
          className="
            grid grid-cols-1
            mb-6 gap-3 box-border
            md:gap-4
            xl:grid-cols-5
          "
        >
          <TopCards />
        </div>

        <div className="box-border">
          <Card
            hoverable={false}
            shadow="none"
            className="pt-4 px-2 box-border md:p-4"
          >
            <div className="flex flex-col mb-8 gap-4 box-border xl:flex-row">
              <div>
                <Input
                  placeholder="Search"
                  leftIcon={Search}
                  rightIcon={X}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onRightIconClick={() => setSearchQuery('')}
                  className="[&>div]:h-[51px] xl:max-w-[239px]"
                />
              </div>
              <ApplicationsSort
                setTableView={setTableView}
                setItemsPerPage={setItemsPerPage}
                setSearchQuery={setSearchQuery}
                setSortConfig={setSortConfig}
                setDrawerOpen={setDrawerOpen}
                searchQuery={searchQuery}
                sortConfig={sortConfig}
                tableView={tableView}
                drawerOpen={drawerOpen}
              />
              <div className="flex items-center gap-2 lg:hidden">
                <p className="text-[#888888] text-[16px]">Sorted by:</p>

                <Button
                  onClick={() => {
                    setSortConfig((prev) => ({
                      ...prev,
                      direction: prev.direction === 'asc' ? 'desc' : 'asc',
                    }));
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setDrawerOpen(true);
                  }}
                  className="
                    text-primary-500
                    bg-purple-500
                    [&>span]:flex [&>span]:items-center px-3 py-[15px] cursor-pointer
                  "
                >
                  <span className="mr-2">
                    {sortLabels[sortConfig.field] ?? 'Sort'}
                  </span>
                  {sortConfig.direction === 'asc' ? (
                    <ArrowUp className="w-4 h-4 text-current" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-current" />
                  )}
                </Button>
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
