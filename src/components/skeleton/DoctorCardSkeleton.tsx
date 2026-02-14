export const DoctorSkeleton = () => {
    return (
        <div className="bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-4 animate-pulse">
            {/* Image Area Skeleton */}
            <div className="aspect-[4/5] rounded-[2rem] bg-gray-200 dark:bg-white/10 mb-6" />

            {/* Text Area Skeleton */}
            <div className="px-4 pb-4">
                <div className="flex justify-between items-center mb-3">
                    {/* Name Bar */}
                    <div className="h-5 w-32 bg-gray-200 dark:bg-white/10 rounded-lg" />
                    {/* Rating Bar */}
                    <div className="h-4 w-10 bg-gray-200 dark:bg-white/10 rounded-lg" />
                </div>

                {/* Designation Bar */}
                <div className="h-3 w-24 bg-gray-200 dark:bg-white/10 rounded-lg" />
            </div>
        </div>
    );
};