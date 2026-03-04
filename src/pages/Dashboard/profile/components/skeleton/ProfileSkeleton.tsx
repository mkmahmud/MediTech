import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-10 font-['Roboto'] pb-20">
      {/* HEADER SKELETON */}
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-3xl p-8">
          <div className="flex items-start gap-6 flex-1">
            {/* Profile Image Skeleton */}
            <Skeleton className="w-32 h-32 rounded-3xl" />

            {/* User Info Skeleton */}
            <div className="flex-1 space-y-4 flex-1">
              <Skeleton className="h-10 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-40" />
            </div>
          </div>

          {/* Edit Button Skeleton */}
          <Skeleton className="h-11 w-32 rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Personal Info Section */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl p-8">
            <Skeleton className="h-6 w-40 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Role-specific Section */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl p-8">
            <Skeleton className="h-6 w-40 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="space-y-8">
          {/* System Status */}
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-8">
            <Skeleton className="h-6 w-32 mx-auto mb-8 dark:bg-gray-400" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full dark:bg-gray-400" />
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-blue/10 border border-blue/20 rounded-3xl p-6">
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
