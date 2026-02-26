import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppPaginationProps {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export function AppPagination({
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPageChange,
    isLoading = false
}: AppPaginationProps) {

    // Logic to generate page numbers (1, 2, 3... etc)
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= showMax) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Logic for ellipsis if totalPages > 5
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    // Don't render if there's only one page
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-gray-200 dark:border-white/10 hover:bg-orange/10 hover:text-orange transition-all"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage || isLoading}
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((p, index) => (
                    <div key={index}>
                        {p === '...' ? (
                            <div className="px-2">
                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </div>
                        ) : (
                            <Button
                                variant={currentPage === p ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(p as number)}
                                disabled={isLoading}
                                className={`w-9 h-9 rounded-xl font-bold text-[12px] transition-all ${currentPage === p
                                        ? "bg-orange hover:bg-orange/90 text-white shadow-md shadow-orange/20 border-none"
                                        : "border-gray-200 dark:border-white/10 text-gray-600 hover:border-orange hover:text-orange"
                                    }`}
                            >
                                {p}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-gray-200 dark:border-white/10 hover:bg-orange/10 hover:text-orange transition-all"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage || isLoading}
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
}