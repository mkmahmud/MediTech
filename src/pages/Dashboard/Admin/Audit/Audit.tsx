import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, ShieldAlert, Filter, RotateCcw, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AppPagination } from '@/components/shared/AppPagination';
import { NoDataFound } from '@/components/shared/NoDataFound';
import { AuditService } from '@/lib/services/audit/auditService';
import type { AuditLog, AuditLogFilters } from '@/types/audit';

const LIMIT = 12;

const ACTION_OPTIONS = ['ALL', 'LOGIN', 'LOGOUT', 'READ', 'CREATE', 'UPDATE', 'DELETE'];

function safeJsonPreview(value: string | null) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return value;
  }
}

export default function Audit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<AuditLogFilters>({
    userId: '',
    resource: '',
    action: '',
    success: '',
    startDate: '',
    endDate: '',
  });

  const offset = (currentPage - 1) * LIMIT;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['audit-logs', filters, currentPage],
    queryFn: () =>
      AuditService.getAuditLogs({
        ...filters,
        limit: LIMIT,
        offset,
      }),
    staleTime: 1000 * 20,
  });

  const logs = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const stats = useMemo(() => {
    const successCount = logs.filter((log) => log.success).length;
    const failedCount = logs.length - successCount;
    const phiCount = logs.filter((log) => log.phiAccessed).length;

    return { successCount, failedCount, phiCount };
  }, [logs]);

  const onFilterChange = (key: keyof AuditLogFilters, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setFilters({
      userId: '',
      resource: '',
      action: '',
      success: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-8 dark:text-white">
      <header className="flex flex-col gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-orange" />
          <span className="text-[10px] font-black text-gray-400">Compliance_Audit_Logs</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black italic">Audit Logs</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
              Monitor security actions, PHI access, and system activity across your platform.
            </p>
          </div>
          {isFetching && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </div>
          )}
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs text-gray-500">Current Page Records</p>
          <p className="text-2xl font-black mt-1">{logs.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs text-gray-500">Successful</p>
          <p className="text-2xl font-black mt-1 text-green-600">{stats.successCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs text-gray-500">PHI Access Events</p>
          <p className="text-2xl font-black mt-1 text-orange">{stats.phiCount}</p>
        </div>
      </section>

      <section className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange" />
            <h2 className="text-sm font-black">Filters</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
          <Input
            value={filters.userId || ''}
            onChange={(e) => onFilterChange('userId', e.target.value)}
            placeholder="User ID"
            className="h-10 rounded-xl"
          />

          <Input
            value={filters.resource || ''}
            onChange={(e) => onFilterChange('resource', e.target.value)}
            placeholder="Resource (e.g. Patient)"
            className="h-10 rounded-xl"
          />

          <Select
            value={filters.action || ''}
            onChange={(e) => onFilterChange('action', e.target.value === 'ALL' ? '' : e.target.value)}
            className="h-10 rounded-xl"
          >
            {ACTION_OPTIONS.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </Select>

          <Select
            value={filters.success || ''}
            onChange={(e) => onFilterChange('success', e.target.value)}
            className="h-10 rounded-xl"
          >
            <option value="">All Status</option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </Select>

          <Input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="h-10 rounded-xl"
          />

          <Input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="h-10 rounded-xl"
          />
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-orange" />
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50/60 p-6 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300">
            Failed to load audit logs. Please try again.
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02]">
            <NoDataFound
              title="No audit logs found"
              description="No logs match your current filters. Try clearing filters to view all records."
            />
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log: AuditLog) => {
              const userName = log.user
                ? `${log.user.firstName || ''} ${log.user.lastName || ''}`.trim() || log.user.email
                : 'System';

              return (
                <article
                  key={log.id}
                  className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-black text-white dark:bg-white dark:text-black">
                          {log.action}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-200">
                          {log.method}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${log.success
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                          {log.success ? 'SUCCESS' : 'FAILED'}
                        </span>
                        {log.phiAccessed && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-orange/15 text-orange border border-orange/30">
                            PHI_ACCESSED
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold break-all">
                        <Activity className="w-4 h-4 text-orange shrink-0" />
                        <span>{log.resource}</span>
                        {log.resourceId && <span className="text-gray-500">#{log.resourceId}</span>}
                      </div>

                      <p className="text-xs text-gray-500 break-all">{log.endpoint}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <p><span className="font-semibold">User:</span> {userName}</p>
                        <p><span className="font-semibold">IP:</span> {log.ipAddress}</p>
                        <p><span className="font-semibold">Time:</span> {new Date(log.timestamp).toLocaleString()}</p>
                        {log.patientId && <p><span className="font-semibold">Patient ID:</span> {log.patientId}</p>}
                      </div>

                      {!log.success && log.errorMessage && (
                        <p className="text-xs text-red-600 dark:text-red-300">
                          <span className="font-semibold">Error:</span> {log.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  {(log.oldValues || log.newValues) && (
                    <details className="mt-4 rounded-xl border border-gray-100 dark:border-white/10 p-3">
                      <summary className="cursor-pointer text-xs font-bold text-gray-500">
                        View Change Payload
                      </summary>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-3">
                        {log.oldValues && (
                          <pre className="text-[11px] leading-5 overflow-auto bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/10">
                            {safeJsonPreview(log.oldValues)}
                          </pre>
                        )}
                        {log.newValues && (
                          <pre className="text-[11px] leading-5 overflow-auto bg-gray-50 dark:bg-black/20 rounded-lg p-3 border border-gray-100 dark:border-white/10">
                            {safeJsonPreview(log.newValues)}
                          </pre>
                        )}
                      </div>
                    </details>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={setCurrentPage}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
