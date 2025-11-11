import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Grip,
  List,
} from 'lucide-react';
import { useState } from 'react';

import Button from '../../../components/ui/button/button';
import { CustomDropdown } from '../../../components/ui/dropdown';
import { statuses } from '../helpers';
import { Drawer } from '../../../components/ui/drawer';
import Radio from '../../../components/ui/radiobutton';

interface ApplicationsSortProps {
  setTableView: (view: string) => void;
  setItemsPerPage: (items: number) => void;
  setSearchQuery: (query: string) => void;
  setSortConfig: React.Dispatch<
    React.SetStateAction<{ field: string; direction: 'asc' | 'desc' }>
  >;
  setDrawerOpen: (open: boolean) => void;
  searchQuery: string;
  sortConfig: { field: string; direction: 'asc' | 'desc' };
  tableView: string;
  drawerOpen: boolean;
}

export const ApplicationsSort: React.FC<ApplicationsSortProps> = ({
  setTableView,
  setItemsPerPage,
  setSearchQuery,
  setSortConfig,
  setDrawerOpen,
  searchQuery,
  sortConfig,
  tableView,
  drawerOpen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="flex w-full justify-between box-border">
      <div className="flex flex-1 flex-row items-center gap-2 lg:gap-4">
        <div className="flex gap-4">
          <div className="flex-none">
            <CustomDropdown
              setOpen={(open) => setIsDropdownOpen(open)}
              trigger={
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen((prev) => !prev);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                    handleFilterByStatus('');
                  }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(false);
                      handleFilterByStatus(status);
                    }}
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
          <p className="hidden text-[#888888] text-[16px] whitespace-nowrap lg:flex">
            Sort by:
          </p>

          <div className="hidden flex-1 justify-between gap-4 lg:flex">
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

          <div className="flex lg:hidden">
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              side="bottom"
              title="Sort by"
              height="h-[360px]"
              showCloseButton={true}
              closeOnOverlayClick={true}
              className="rounded-t-lg"
            >
              <hr className="border-grey-50 mt-1 mb-5" />
              <form className="flex flex-col gap-2">
                {[
                  { label: 'Date', key: 'dateApplied' },
                  { label: 'Title', key: 'jobTitle' },
                  { label: 'Company', key: 'company' },
                  { label: 'Status', key: 'status' },
                ].map(({ label, key }) => (
                  <label
                    key={key}
                    className={`
                      flex
                      rounded-md
                      items-center justify-between px-3 py-3 cursor-pointer
                      ${
                        sortConfig.field === key
                          ? 'border-primary-500 bg-purple-500'
                          : 'hover:border-primary-500 hover:bg-purple-500'
                      }
                    `}
                  >
                    <span>{label}</span>
                    <Radio
                      type="radio"
                      name="sortOption"
                      value={key}
                      checked={sortConfig.field === key}
                      onChange={() => {
                        handleSort(key);
                        setDrawerOpen(false);
                      }}
                      className="w-4 h-4 accent-purple-500"
                    />
                  </label>
                ))}
              </form>
            </Drawer>
            <button
              onClick={() => setDrawerOpen(true)}
              className="
                flex
                min-h-[51px]
                text-sm text-[#484848]
                bg-white
                rounded-md border border-[#969696]
                items-center gap-2 px-3 py-2
              "
            >
              <ArrowDownUp className="w-6 h-6 text-[#484848]" />
              <span className="font-medium">Sort</span>
            </button>
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
  );
};
