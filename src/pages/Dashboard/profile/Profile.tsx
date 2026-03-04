import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { userService } from "@/lib/services/userService";
import { useQuery } from "@tanstack/react-query";
import { DoctorProfile } from "./components/doctor/DoctorProfile";
import { PatientProfile } from "./components/patient/PatientProfile";
import { CommonProfile } from "./components/CommonProfile";
import { ProfileSkeleton } from "./components/skeleton/ProfileSkeleton";

export default function Profile() {
    const userRole = useAuthStore((state) => state.user?.role);
    const { user, setUser } = useUserStore();

    // Fetch fresh user data from API
    const { isLoading, refetch } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const freshData = await userService.getProfile();
            // Ensure store is updated with fresh API data
            setUser(freshData);
            return freshData;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        enabled: true,
    });

    // Show skeleton while loading
    if (isLoading) {
        return <ProfileSkeleton />;
    }

    // Render role-based profile component
    if (userRole === "DOCTOR") {
        return <DoctorProfile user={user} refetch={refetch} />;
    }

    if (userRole === "PATIENT") {
        return <PatientProfile user={user} refetch={refetch} />;
    }

    // For ADMIN, SUPER_ADMIN, and other roles
    return <CommonProfile user={user} refetch={refetch} />;
}