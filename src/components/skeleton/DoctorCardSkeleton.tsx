export const DoctorSkeleton = () => {
    return (
        <div className="group bg-white dark:bg-[#080808] rounded-3xl sm:rounded-[40px] p-6 sm:p-8 lg:p-12 border border-gray-100 dark:border-white/5 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center animate-pulse">
            {/* Avatar Skeleton */}
            <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 dark:bg-white/10" />
                {/* Status dot skeleton */}
                <div className="absolute -bottom-1 right-2 h-5 w-5 bg-gray-200 dark:bg-white/10 rounded-full" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                        {/* Name */}
                        <div className="h-7 sm:h-8 w-48 sm:w-56 bg-gray-200 dark:bg-white/10 rounded-xl" />
                        
                        {/* Specialty badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded-full" />
                            <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-full" />
                        </div>
                    </div>
                    
                    {/* Rating & Experience */}
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-16 bg-gray-200 dark:bg-white/10 rounded-full" />
                        <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
                        <div className="h-6 w-12 bg-gray-200 dark:bg-white/10 rounded-full" />
                    </div>
                </div>

                {/* Info lines */}
                <div className="space-y-2">
                    <div className="h-4 w-64 bg-gray-200 dark:bg-white/10 rounded-lg" />
                    <div className="h-4 w-48 bg-gray-200 dark:bg-white/10 rounded-lg" />
                    <div className="h-4 w-40 bg-gray-200 dark:bg-white/10 rounded-lg" />
                </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex sm:flex-row flex-col gap-3 w-full lg:w-auto">
                <div className="h-16 sm:h-20 w-full sm:w-20 rounded-2xl sm:rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="h-16 sm:h-20 w-full sm:w-40 rounded-2xl sm:rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
        </div>
    );
};