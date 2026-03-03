import { Skeleton } from "@/components/ui/skeleton";

export const AppointmentSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
                <div
                    key={index}
                    className="border border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-white/[0.02]"
                >
                    {/* Header with Status */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-3 w-20 rounded" />
                        </div>
                        <Skeleton className="h-3 w-16 rounded" />
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-3 w-32 rounded" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-3 w-40 rounded" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="h-3 w-32 rounded" />
                        </div>
                    </div>

                    {/* Chief Complaint */}
                    <div className="mb-6">
                        <Skeleton className="h-3 w-24 rounded mb-2" />
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-3 w-3/4 rounded" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Skeleton className="flex-1 h-10 rounded-xl" />
                        <Skeleton className="flex-1 h-10 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
};
