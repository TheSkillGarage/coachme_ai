import { useState, useEffect, useMemo, useRef } from "react";

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  loadMoreDelay?: number;
  rootMargin?: string;
  threshold?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  loaderRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  hasMore: boolean;
  displayCount: number;
  totalCount: number;
}

export function useInfiniteScroll<T>({
  items,
  itemsPerPage = 20,
  loadMoreDelay = 500,
  rootMargin = '100px',
  threshold = 0.1
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);


  const displayedItems = useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount]
  );

  const hasMore = displayCount < items.length;


  useEffect(() => {
    setDisplayCount(itemsPerPage);
  }, [items, itemsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);

          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + itemsPerPage, items.length));
            setIsLoading(false);
          }, loadMoreDelay);
        }
      },
      { threshold, rootMargin }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, items.length, itemsPerPage, loadMoreDelay, threshold, rootMargin]);

  return {
    displayedItems,
    loaderRef,
    isLoading,
    hasMore,
    displayCount,
    totalCount: items.length
  };
}