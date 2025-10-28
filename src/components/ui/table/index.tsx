import React, { useState, useMemo } from 'react';
import { cn } from '../../../utils/utils';
import { Pagination } from '../pagination';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  rounded?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
  itemsPerPage?: number;
  isPaginated?: boolean;
}

export function Table<T>({
  columns,
  data,
  striped = true,
  bordered = false,
  hoverable = true,
  rounded = true,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  itemsPerPage = 5,
  isPaginated,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination details
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, data, itemsPerPage]);

  return (
    <div
      className={cn(
        'overflow-hidden w-full border border-gray-200 bg-white',
        rounded && 'rounded-xl shadow-sm',
        className
      )}
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm font-semibold">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'text-left px-4 py-3 border-b border-gray-200',
                    bordered && 'border-r last:border-r-0',
                    col.className
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {(() => {
              const activeData = isPaginated ? paginatedData : data;

              if (activeData.length === 0) {
                return (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center py-6 text-gray-500"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                );
              }

              return activeData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'transition-colors',
                    hoverable && 'hover:bg-gray-50 cursor-pointer',
                    striped && rowIndex % 2 === 1 && 'bg-gray-50'
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        'px-4 py-3 border-b border-gray-100',
                        bordered && 'border-r last:border-r-0',
                        col.className
                      )}
                    >
                      {col.render
                        ? col.render(item)
                        : (item[col.key as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {isPaginated && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
