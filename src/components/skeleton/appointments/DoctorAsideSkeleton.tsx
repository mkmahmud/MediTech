import { Skeleton } from "@/components/ui/skeleton";

export const DoctorAsideSkeleton = () => {
    return (
        <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-5 sticky top-32 shadow-sm">

                {/* Doctor Image Skeleton */}
                <Skeleton className="aspect-[4/5] rounded-[2rem] mb-6 bg-gray-200 dark:bg-white/5" />

                <div className="px-2 space-y-3">
                    {/* Doctor Name Skeleton */}
                    <Skeleton className="h-8 w-3/4 rounded-lg" />

                    {/* Specialization Skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-3 h-3 rounded-full" />
                        <Skeleton className="h-4 w-1/2 rounded-md" />
                    </div>
                </div>

                {/* Info Rows Skeleton */}
                <div className="mt-6 pt-6 border-t border-gray-50 dark:border-white/5 space-y-5">

                    {/* Consultation Fee Row */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-20 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md bg-orange/20" />
                    </div>

                    {/* Type Row */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-12 rounded-md" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                    </div>

                    {/* Experience Row */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-16 rounded-md" />
                        <Skeleton className="h-4 w-14 rounded-md" />
                    </div>

                </div>
            </div>
        </aside>
    );
};