"use client";

export default function UserCardSkeleton() {
    return (
        <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-5 flex flex-col xl:flex-row items-center gap-8 animate-pulse">

            {/* Identity Cell Skeleton */}
            <div className="flex items-center gap-5 w-full xl:w-1/4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gray-200 dark:bg-white/5 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-white/10 rounded-md" />
                    <div className="h-3 w-1/3 bg-gray-100 dark:bg-white/5 rounded-md" />
                </div>
            </div>

            {/* Contact Cell Skeleton */}
            <div className="grid grid-cols-1 gap-3 w-full xl:w-1/4 border-l border-gray-50 dark:border-white/5 pl-8">
                <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-white/10 rounded-full" />
                    <div className="h-3 w-1/2 bg-gray-100 dark:bg-white/5 rounded-md" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 bg-gray-200 dark:bg-white/10 rounded-full" />
                    <div className="h-3 w-2/3 bg-gray-100 dark:bg-white/5 rounded-md" />
                </div>
            </div>

            {/* Clinical Info Cell Skeleton */}
            <div className="flex flex-col gap-2 w-full xl:w-1/5">
                <div className="h-2.5 w-16 bg-gray-100 dark:bg-white/5 rounded-md" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded-md" />
            </div>

            {/* Status & Security Skeleton */}
            <div className="flex items-center gap-4 w-full xl:w-auto">
                <div className="h-8 w-24 bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="w-8 h-8 bg-gray-100 dark:bg-white/5 rounded-xl" />
            </div>

            {/* Actions Skeleton */}
            <div className="flex items-center gap-3 ml-auto">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-xl" />
                <div className="h-12 w-32 bg-gray-200 dark:bg-white/10 rounded-2xl" />
                <div className="w-6 h-6 bg-gray-50 dark:bg-white/5 rounded-full" />
            </div>
        </div>
    );
}