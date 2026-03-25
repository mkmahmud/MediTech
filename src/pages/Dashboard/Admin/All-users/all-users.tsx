import { Badge } from "@/components/ui/badge";
import SearchBar from "./components/search";
import { AllUsersProvider, useAllUsersContext } from "./AllUsersContext";
import UserCard from "./components/userCard";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/services/userService";
import { AppPagination } from "@/components/shared/AppPagination";
import UserCardSkeleton from "./components/skeleton/userCard";
import { NoDataFound } from "@/components/shared/NoDataFound";
import ViewUserModal from "./components/viewUser";



export default function AllUsers() {
    return (
        <AllUsersProvider>
            <AllUsersContent />
        </AllUsersProvider>
    );
}

function AllUsersContent() {
    // All params
    const { queryParams, setQueryParams, isModelOpen, setIsModelOpen } = useAllUsersContext();


    // get data 
    const { data, isLoading } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: () => {
            return userService.getAllUsers(queryParams);
        },
        staleTime: 1000 * 60 * 5,
    });




    return (
        <section>
            <div className="  ">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 border-orange/20 text-orange font-bold text-[10px] uppercase tracking-wider">
                            Administration
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                            All <span className="text-orange">Users</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md">
                            Manage all users records, verify identities, and monitor clinical audit trails.
                        </p>
                    </div>
                </header>
            </div>
            {/* Filters & Search */}
            <div>
                <SearchBar />
            </div>
            {/* User Cards */}
            <div>
                {/* Loading */}
                {
                    isLoading && (
                        Array.from({ length: 5 }).map((_, index) => (
                            <UserCardSkeleton key={index} />
                        ))
                    )
                }
                {/* Data */}
                {
                    data && data?.data?.map((patient: any) => (
                        <UserCard user={patient} />
                    ))
                }
                {/* No data */}
                {
                    !isLoading && data?.data?.length === 0 && (
                        <NoDataFound title="No User Found" description="Try Another Filters" />
                    )
                }
            </div>

            {/* Details Modal */}
            <ViewUserModal
                open={isModelOpen as boolean}
                onClose={() => setIsModelOpen && setIsModelOpen(false)}
            />

            <AppPagination
                currentPage={data?.meta?.page || 1}
                totalPages={data?.meta?.totalPages || 1}
                hasPreviousPage={data?.meta?.hasPreviousPage || false}
                hasNextPage={data?.meta?.hasNextPage || false}
                onPageChange={(page) => setQueryParams(prev => ({ ...prev, page: Number(page) }))}
                isLoading={isLoading || false}
                total={data?.meta?.total || 0}

            />
        </section>
    );
}
