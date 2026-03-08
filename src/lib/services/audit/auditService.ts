
import type { AuditLogFilters, AuditLogsResponse } from "@/types/audit";
import api from "../../api";


export const AuditService = {

    // Get audit logs for admin
    getAuditLogs: async (filters: AuditLogFilters = {}): Promise<AuditLogsResponse> => {
        const params = new URLSearchParams();

        if (filters.userId) params.append("userId", filters.userId);
        if (filters.resource) params.append("resource", filters.resource);
        if (filters.action) params.append("action", filters.action);
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
        if (filters.success !== undefined && filters.success !== "") params.append("success", filters.success);
        if (filters.limit !== undefined) params.append("limit", String(filters.limit));
        if (filters.offset !== undefined) params.append("offset", String(filters.offset));

        const query = params.toString();
        const { data } = await api.get<AuditLogsResponse>(`/audit/logs${query ? `?${query}` : ""}`);
        return data;
    },

    getMyLogs: async (limit = 100): Promise<AuditLogsResponse> => {
        const { data } = await api.get(`/audit/my-logs?limit=${limit}`);
        return data;
    },

    getPatientAuditLogs: async (patientId: string, limit = 100): Promise<AuditLogsResponse> => {
        const { data } = await api.get(`/audit/patient/${patientId}?limit=${limit}`);
        return data;
    },

    getPHIAccessLogs: async (params?: { startDate?: string; endDate?: string; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.startDate) query.append("startDate", params.startDate);
        if (params?.endDate) query.append("endDate", params.endDate);
        if (params?.limit !== undefined) query.append("limit", String(params.limit));

        const qs = query.toString();
        const { data } = await api.get(`/audit/phi-access${qs ? `?${qs}` : ""}`);
        return data;
    },

};