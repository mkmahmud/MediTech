import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { ClipboardList, Filter, Loader2, ShieldCheck, CalendarDays, CircleDashed } from "lucide-react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { prescriptionsService } from "@/lib/services/prescriptions/prescriptionsService";
import type { Prescription } from "@/types/prescription";
import { FormField } from "@/components/ui/form-field";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/SelectGroup";
import { Button } from "@/components/ui/button";
import { NoDataFound } from "@/components/shared/NoDataFound";
import { AppPagination } from "@/components/shared/AppPagination";
import PrescriptionDetailsModal from "@/pages/Dashboard/Patient/Prescriptions/components/PrescriptionDetailsModal";

type FilterFormValues = {
  doctorId: string;
  status: "" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  limit: string;
};

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Expired", value: "EXPIRED" },
];

const LIMIT_OPTIONS = [
  { label: "8 / page", value: "8" },
  { label: "12 / page", value: "12" },
  { label: "20 / page", value: "20" },
  { label: "40 / page", value: "40" },
];

function statusBadgeClass(status: Prescription["status"]) {
  if (status === "ACTIVE") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
  if (status === "COMPLETED") return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  if (status === "CANCELLED") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  return "bg-orange/15 text-orange border border-orange/30";
}

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}

export default function Prescriptions() {
  const { user } = useAuthStore();
  const patientId = user?.patientId;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterFormValues>({
    doctorId: "",
    status: "",
    limit: "12",
  });

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      doctorId: "",
      status: "",
      limit: "12",
    },
  });

  const limit = Number(appliedFilters.limit) || 12;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["prescriptions", patientId, appliedFilters, currentPage],
    queryFn: () =>
      prescriptionsService.getPrescriptions({
        patientId,
        doctorId: appliedFilters.doctorId.trim() || undefined,
        status: appliedFilters.status || undefined,
        limit,
        offset,
      }),
    enabled: !!patientId,
    staleTime: 1000 * 30,
  });

  const prescriptions = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const applyFilters = methods.handleSubmit((values) => {
    setCurrentPage(1);
    setSelectedPrescriptionId(null);
    setAppliedFilters(values);
  });

  const resetFilters = () => {
    methods.reset({ doctorId: "", status: "", limit: "12" });
    setCurrentPage(1);
    setSelectedPrescriptionId(null);
    setAppliedFilters({ doctorId: "", status: "", limit: "12" });
  };

  const activeCount = prescriptions.filter((item) => item.status === "ACTIVE").length;

  return (
    <div className="space-y-8 dark:text-white">
      <header className="flex flex-col gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-orange" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prescription_Registry</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black">Prescriptions</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
              Track your prescribed medications, issue dates, and prescription status.
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
          <p className="text-2xl font-black mt-1">{prescriptions.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs text-gray-500">Active Prescriptions</p>
          <p className="text-2xl font-black mt-1 text-green-600 dark:text-green-400">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs text-gray-500">Total Records</p>
          <p className="text-2xl font-black mt-1 text-orange">{total}</p>
        </div>
      </section>

      <section className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange" />
            <h2 className="text-sm font-black">Filters</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={applyFilters} className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            <FormField name="doctorId" label="Doctor ID">
              <InputGroup
                name="doctorId"
                placeholder="Filter by doctor UUID"
                icon="user"
                className="h-10 rounded-xl border-gray-200 dark:border-white/10"
              />
            </FormField>

            <FormField name="status" label="Status">
              <SelectGroup
                name="status"
                options={STATUS_OPTIONS}
                className="h-10 rounded-xl border border-gray-200 dark:border-white/10"
              />
            </FormField>

            <FormField name="limit" label="Page Size">
              <SelectGroup
                name="limit"
                options={LIMIT_OPTIONS}
                className="h-10 rounded-xl border border-gray-200 dark:border-white/10"
              />
            </FormField>

            <Button type="submit" className="h-10 rounded-xl w-full">
              Apply Filters
            </Button>
          </form>
        </FormProvider>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-orange" />
          </div>
        ) : isError ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50/60 p-6 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300">
            Failed to load prescriptions. Please try again.
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="rounded-[24px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02]">
            <NoDataFound
              title="No prescriptions found"
              description="No prescriptions match your current filters."
            />
          </div>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((item) => {
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 transition-all hover:border-orange/30"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${statusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-200">
                          {item.medications?.length || 0} MEDS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <p className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-orange" /> Issued: {formatDate(item.issuedAt || item.createdAt)}</p>
                        <p className="flex items-center gap-2"><CircleDashed className="w-4 h-4 text-orange" /> Expires: {formatDate(item.expiresAt)}</p>
                        <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange" /> Sent To Pharmacy: {item.sentToPharmacy ? "Yes" : "No"}</p>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          Notes: {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPrescriptionId(item.id);
                          setIsPrescriptionModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
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

      <PrescriptionDetailsModal
        open={isPrescriptionModalOpen}
        onOpenChange={setIsPrescriptionModalOpen}
        prescriptionId={selectedPrescriptionId}
        patientId={patientId}
        patientName={user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : undefined}
      />
    </div>
  );
}
