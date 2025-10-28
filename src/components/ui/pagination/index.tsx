import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/utils';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  delta = 2
) {
  const range: (number | string)[] = [];

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push('...');
  if (totalPages > 1) range.push(totalPages);

  return range;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pages = getPaginationRange(currentPage, totalPages);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  return (
    totalPages > 1 && (
      <div className="flex items-center justify-center px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={cn(
              'p-2 rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer',
              currentPage === 1 && 'opacity-50 cursor-not-allowed',
              'h-8 w-8'
            )}
          >
            <ChevronLeft className="w-full h-full" />
          </button>
          {pages.map((p) => {
            return p === currentPage ? (
              <p className="text-white bg-primary-500 py-1.5 px-[13px] rounded-sm">
                {p}
              </p>
            ) : (
              <p className="text-grey-200 font-medium">{p}</p>
            );
          })}{' '}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={cn(
              'p-2 rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer',
              currentPage === totalPages && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  );
};
