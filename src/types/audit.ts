export type AuditAction =
    | 'LOGIN'
    | 'LOGOUT'
    | 'READ'
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'OTHER';

export interface AuditLogUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface AuditLog {
    id: string;
    userId: string | null;
    user?: AuditLogUser | null;
    action: AuditAction | string;
    resource: string;
    resourceId: string | null;
    phiAccessed: boolean;
    patientId: string | null;
    ipAddress: string;
    userAgent: string | null;
    endpoint: string;
    method: string;
    oldValues: string | null;
    newValues: string | null;
    success: boolean;
    errorMessage: string | null;
    timestamp: string;
}

export interface AuditLogFilters {
    userId?: string;
    resource?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    success?: string;
    limit?: number;
    offset?: number;
}

export interface AuditLogsResponse {
    data: AuditLog[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}
