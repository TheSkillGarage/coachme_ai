import React, { useState, useMemo } from "react";
import { cn } from "../../../utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

export function Table<T>({
    columns,
    data,
    striped = true,
    bordered = false,
    hoverable = true,
    rounded = true,
    emptyMessage = "No data available",
    onRowClick,
    className,
    itemsPerPage = 5,
}: TableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination details
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [currentPage, data, itemsPerPage]);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

    return (
        <div
            className={cn(
                "overflow-hidden w-full border border-gray-200 bg-white",
                rounded && "rounded-xl shadow-sm",
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
                                        "text-left px-4 py-3 border-b border-gray-200",
                                        bordered && "border-r last:border-r-0",
                                        col.className
                                    )}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-sm text-gray-700">
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-6 text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(
                                        "transition-colors",
                                        hoverable && "hover:bg-gray-50 cursor-pointer",
                                        striped && rowIndex % 2 === 1 && "bg-gray-50"
                                    )}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={cn(
                                                "px-4 py-3 border-b border-gray-100",
                                                bordered && "border-r last:border-r-0",
                                                col.className
                                            )}
                                        >
                                            {col.render
                                                ? col.render(item)
                                                : (item[col.key as keyof T] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={cn(
                                "p-2 rounded-md border text-gray-600 hover:bg-gray-100 transition",
                                currentPage === 1 && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={cn(
                                "p-2 rounded-md border text-gray-600 hover:bg-gray-100 transition",
                                currentPage === totalPages && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
