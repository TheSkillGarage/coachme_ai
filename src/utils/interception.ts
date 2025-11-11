import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UseInterceptNavigationOptions {
    isDirty: boolean;
    onAttemptNavigate: (nextPath: string) => void;
}

export default function useInterceptNavigation({
    isDirty,
    onAttemptNavigate,
}: UseInterceptNavigationOptions) {
    const location = useLocation();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a[href]") as HTMLAnchorElement | null;
            if (!link) return;

            const nextPath = link.getAttribute("href") || "";
            if (
                !nextPath ||
                nextPath.startsWith("#") ||
                nextPath === location.pathname
            )
                return;

            // If there are unsaved changes, stop the navigation
            if (isDirty) {
                e.preventDefault();
                e.stopImmediatePropagation(); // stops other click handlers (like React Router)
                e.stopPropagation(); // prevents bubbling

                onAttemptNavigate(nextPath);
            }
        };

        // Use capture phase so it intercepts before React Router handles the click
        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [isDirty, onAttemptNavigate, location.pathname]);
}
