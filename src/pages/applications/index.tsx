import {
  Search,
  X,
  List,
  Grip,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

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
import { parseDMY, statuses } from './helpers';
import { CustomDropdown } from '../../components/ui/dropdown';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: 'dateApplied',
    direction: 'desc',
  });

  const filtered = useMemo(() => {
    return applicationsData.filter((item: Application) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
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

  const changeView = (view: string) => {
    setTableView(view);
    setSearchQuery('');

    if (view === 'grid') {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(5);
    }
  };

  const handleFilterByStatus = (status: string) => {
    setSearchQuery(status);
  };

  const handleSort = (field: string) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { field, direction: 'asc' };
    });
  };

  return (
    <HelmetLayout {...tags}>
      <div className="min-h-screen p-0 bg-background">
        <p className="font-semibold text-2xl mb-2">Application Tracker</p>
        <p className="font-normal text-[16px] mb-6">
          Track and manage your job applications
        </p>
        <div className="grid grid-cols-1 mb-6 gap-3 md:gap-4 xl:grid-cols-5">
          <TopCards />
        </div>

        <div>
          <Card hoverable={false} shadow="none">
            <div className="flex mb-8 justify-between gap-4">
              <div className="flex flex-1 flex-row items-center gap-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search"
                    leftIcon={Search}
                    rightIcon={X}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onRightIconClick={() => setSearchQuery('')}
                    className="[&>div]:h-[51px] xl:max-w-[239px]"
                  />
                  <div className="flex-none w-[166px]">
                    <CustomDropdown
                      setOpen={(open) => setIsDropdownOpen(open)}
                      trigger={
                        <Button
                          variant="outline"
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className="
                            flex
                            w-[166px] h-[51px]
                            text-[#484848] leading-none
                            border border-grey-200 rounded-md
                            transition-colors
                            items-center justify-between px-3 hover:bg-gray-50 box-border overflow-hidden [&>span]:flex [&>span]:items-center [&>span]:justify-between [&>span]:w-full
                          "
                        >
                          <span className="flex-1 min-w-0 text-left truncate">
                            {searchQuery !== '' ? searchQuery : 'All statuses'}
                          </span>
                          {isDropdownOpen ? (
                            <ChevronUp className="w-4 h-4 text-grey-400 shrink-0 ml-2 relative top-[1px]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-grey-400 shrink-0 ml-2 relative top-[1px]" />
                          )}
                        </Button>
                      }
                    >
                      <div className="flex flex-col p-1 gap-2.5">
                        <button
                          onClick={() => handleFilterByStatus('')}
                          className="
                            w-full
                            p-1
                            text-left text-[#484848]
                            hover:bg-[#F7F7F7] cursor-pointer
                          "
                        >
                          All statuses
                        </button>

                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleFilterByStatus(status)}
                            className="
                              w-full
                              p-1
                              text-left text-[#484848]
                              hover:bg-[#F7F7F7] cursor-pointer truncate
                            "
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </CustomDropdown>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#888888] text-[16px] whitespace-nowrap">
                    Sort by:
                  </p>

                  <div className="flex flex-1 justify-between gap-4">
                    {[
                      { label: 'Date', key: 'dateApplied' },
                      { label: 'Title', key: 'jobTitle' },
                      { label: 'Company', key: 'company' },
                      { label: 'Status', key: 'status' },
                    ].map(({ label, key }) => {
                      const isActive = sortConfig.field === key;
                      const isAsc = sortConfig.direction === 'asc';

                      return (
                        <button
                          key={key}
                          onClick={() => handleSort(key)}
                          className={`
                            flex-1 flex
                            rounded-md
                            transition-colors
                            justify-center items-center gap-2 px-3 py-[15px] cursor-pointer
                            ${
                              isActive
                                ? 'bg-purple-500 text-primary-500'
                                : 'text-grey-500 hover:bg-purple-500 hover:text-primary-500'
                            }
                          `}
                        >
                          <span>{label}</span>
                          {isActive &&
                            (isAsc ? (
                              <ArrowUp className="w-4 h-4 text-current" />
                            ) : (
                              <ArrowDown className="w-4 h-4 text-current" />
                            ))}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex p-1 bg-[#F8F8F8] rounded-xl">
                <div
                  onClick={() => changeView('grid')}
                  className={`
                    p-2.5
                    rounded-lg
                    cursor-pointer
                    ${tableView === 'grid' ? 'bg-purple-500' : 'bg-[#F8F8F8]'}
                  `}
                >
                  <Grip />
                </div>
                <div
                  onClick={() => changeView('table')}
                  className={`
                    p-2.5
                    rounded-lg
                    cursor-pointer
                    ${tableView === 'table' ? 'bg-purple-500' : 'bg-[#F8F8F8]'}
                  `}
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
