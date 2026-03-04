import { useAuthStore } from '@/stores/auth/useAuthStore';
import { getTokenExpirationTime, isTokenExpired } from '@/lib/jwt';


export const useTokenExpiration = () => {
    const accessToken = useAuthStore((s) => s.accessToken);

    const getTimeUntilExpiration = (): number | null => {
        if (!accessToken) return null;
        return getTokenExpirationTime(accessToken);
    };

    const isExpired = (): boolean => {
        if (!accessToken) return true;
        return isTokenExpired(accessToken);
    };

    const isExpiringSoon = (warningTimeMs: number = 5 * 60 * 1000): boolean => {
        const timeLeft = getTimeUntilExpiration();
        if (timeLeft === null) return true;
        return timeLeft <= warningTimeMs;
    };

    const getFormattedTimeRemaining = (): string => {
        const timeLeft = getTimeUntilExpiration();
        if (timeLeft === null || isExpired()) return "Session Expired";

        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    };

    return {
        getTimeUntilExpiration,
        isExpired,
        isExpiringSoon,
        getFormattedTimeRemaining,
        accessToken
    };
};
