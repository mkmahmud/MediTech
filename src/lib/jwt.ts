export interface JwtPayload {
    exp: number;
    iat: number;
    [key: string]: any;
}


export const decodeToken = (token: string): JwtPayload | null => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const decoded = JSON.parse(atob(parts[1]));
        return decoded;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};


export const getTokenExpirationTime = (token: string): number | null => {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return null;

    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;

    return remainingTime > 0 ? remainingTime : 0;
};


//   Check if token is expired

export const isTokenExpired = (token: string): boolean => {
    const remainingTime = getTokenExpirationTime(token);
    if (remainingTime === null) return true;
    return remainingTime === 0;
};

//   Check if token is about to expire (within 5 minutes)

export const isTokenExpiringSoon = (token: string, warningTimeMs: number = 5 * 60 * 1000): boolean => {
    const remainingTime = getTokenExpirationTime(token);
    if (remainingTime === null) return true;
    return remainingTime <= warningTimeMs;
};
