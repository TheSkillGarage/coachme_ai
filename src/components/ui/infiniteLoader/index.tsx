import CircleLoader from "../../loader";

interface InfiniteScrollLoaderProps {
  loaderRef: React.RefObject<HTMLDivElement | null>; 
  isLoading: boolean;
  hasMore: boolean;
  totalItems: number;
  loadingText?: string;
}

export default function InfiniteScrollLoader({
  loaderRef,
  isLoading,
  hasMore,
  totalItems,
  loadingText = "No more jobs to show"
}: InfiniteScrollLoaderProps) {
  if (!hasMore && totalItems > 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 font-medium">🎉 You've reached the end!</p>
        <p className="text-sm text-gray-400 mt-1">{loadingText}</p>
      </div>
    );
  }

  if (!hasMore) return null;

  return (
    <div ref={loaderRef} className="flex justify-center items-center py-8">
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <CircleLoader className="w-5 h-5" />
        </div>
      ) : (
        <div className="h-1" />
      )}
    </div>
  );
}