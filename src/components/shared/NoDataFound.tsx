import { SearchX, } from "lucide-react";

interface NoDataProps {
    title?: string;
    description?: string;
    onReset?: () => void;
}

export function NoDataFound({
    title = "No results found",
}: NoDataProps) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 animate-in fade-in zoom-in-95 duration-500">
            {/* Icon Container */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange/10 blur-2xl rounded-full" />
                <div className="relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-[32px] shadow-sm">
                    <SearchX className="w-12 h-12 text-orange" strokeWidth={1.5} />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-sm space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h3>

            </div>


        </div>
    );
}