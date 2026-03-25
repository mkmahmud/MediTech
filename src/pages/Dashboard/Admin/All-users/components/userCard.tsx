import { Button } from '@/components/ui/button'
import { parseISO } from 'date-fns';
import { Mail, Phone, Trash } from 'lucide-react'
import { useAllUsersContext } from '../AllUsersContext';
import { userService } from '@/lib/services/userService';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { UserStatus } from '@/types/user';
import { toast } from 'sonner';

export default function UserCard({ user }: { user: any }) {
    const queryClient = useQueryClient();

    // Mutation for status change
    const updateStatusMutation = useMutation({
        mutationFn: (newStatus: UserStatus) => userService.updateUserStatus(user.id, newStatus),
        onSuccess: () => {
            toast.success('User status updated successfully');
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            toast.error('Failed to update user status');
        },
    });

    // Mutation for delete
    const deleteUserMutation = useMutation({
        mutationFn: () => userService.deleteUser(user.id),
        onSuccess: () => {
            toast.success('User deleted successfully');
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            toast.error('Failed to delete user');
        },
    });

    const date = user?.lastLogin ? parseISO(user.lastLogin) : null;

    const { setSelectedUser, setIsModelOpen } = useAllUsersContext();

    const handleViewProfile = () => {
        setSelectedUser && setSelectedUser(user);
        setIsModelOpen && setIsModelOpen(true);

    }


    const statusOptions: UserStatus[] = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'];

    // Handle user status update
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as UserStatus;
        if (newStatus === user.status) return;
        updateStatusMutation.mutate(newStatus);
    };

    const handleDelete = () => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        deleteUserMutation.mutate();
    };

    // 
    const statusColorMap = {
        ACTIVE: "border-green-500 text-green-700 bg-green-50",
        PENDING_VERIFICATION: "border-yellow-500 text-yellow-700 bg-yellow-50",
        SUSPENDED: "border-red-500 text-red-700 bg-red-50",
        INACTIVE: "border-gray-400 text-gray-700 bg-gray-100",
    };

    return (
        <div
            key={user.id}
            className={`group bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5   p-5 flex flex-col xl:flex-row items-center gap-8 hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 ${user.status === 'INACTIVE' ? '!bg-red-100 dark:bg-red-900/20  ' : ''}`}
        >
            {/* Identity Cell */}
            <div className="flex items-center gap-5 w-full xl:w-1/4">
                <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden flex-shrink-0 grayscale-[0.5] group-hover:grayscale-0 transition-all">
                    <img src={user.profileImageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-[11px] font-bold text-orange uppercase tracking-tighter">
                        ID: {user.id}
                    </p>
                </div>
            </div>

            {/* Contact Cell */}
            <div className="grid grid-cols-1 gap-2 w-full xl:w-1/4 border-l border-gray-50 dark:border-white/5 pl-8">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-bold">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-bold">{user.phoneNumber}</span>
                </div>
            </div>

            {/* Clinical Info Cell */}
            <div className="flex flex-col gap-1 w-full xl:w-1/5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Login</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{date ? date.toLocaleDateString() : 'N/A'}</p>
            </div>

            {/* Status & Security */}
            <div className="flex items-center gap-4 w-full xl:w-auto">
                <select
                    //@ts-ignore
                    className={`border rounded px-2 py-1 text-xs transition-colors ${statusColorMap[user.status] || ""}`}
                    value={user.status}
                    onChange={handleStatusChange}
                    disabled={updateStatusMutation.isPending || deleteUserMutation.isPending}
                >
                    {statusOptions.map((status) => (
                        <option className='' key={status} value={status}>
                            {status.replace('_', ' ')}
                        </option>
                    ))}
                </select>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
                <Button className=" " onClick={handleViewProfile}>
                    View Profile
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-300"
                    onClick={handleDelete}
                    disabled={updateStatusMutation.isPending || deleteUserMutation.isPending}
                >
                    <Trash className="text-red-500 w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
