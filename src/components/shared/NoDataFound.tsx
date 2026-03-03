import { SearchX, } from "lucide-react";

interface NoDataProps {
    title?: string;
    description?: string;
    onReset?: () => void;
}

export function NoDataFound({
    title = "Nothing Found",
    description,
}: NoDataProps) {
    return (
        <div className="text-center py-16">
            <SearchX strokeWidth={1.5} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            {description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{description}</p>
            )}
        </div>

    );
}