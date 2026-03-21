import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  FileText,
  History,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Dummy Data matching your Prisma Patient model
const DUMMY_PATIENTS = [
  {
    id: "pat-9921",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 0123",
    gender: "Male",
    dateOfBirth: "1988-05-12",
    lastVisit: "2026-03-15",
    status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "pat-8832",
    firstName: "Sarah",
    lastName: "Miller",
    email: "s.miller@provider.net",
    phone: "+1 (555) 0987",
    gender: "Female",
    dateOfBirth: "1992-11-24",
    lastVisit: "2026-03-10",
    status: "PENDING_VERIFICATION",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

export default function AdminPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-[#FBFBFB] dark:bg-[#050505] p-6 lg:p-12 transition-colors">

      {/* Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 border-orange/20 text-orange font-bold text-[10px] uppercase tracking-wider">
            Administration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Patient <span className="text-orange">Directory</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md">
            Manage patient records, verify identities, and monitor clinical audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl border-gray-100 dark:border-white/5 h-14 px-6 font-bold text-gray-500 hover:text-orange transition-all">
            <History className="w-4 h-4 mr-2" />
            Global Audit Log
          </Button>
          <Button className="bg-orange hover:bg-orange/90 text-white rounded-2xl h-14 px-8 font-bold shadow-xl shadow-orange/20 transition-all active:scale-95">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, ID, or email..."
            className="pl-12 h-14 rounded-[1.2rem] border-none bg-white dark:bg-white/5 text-sm font-medium focus-visible:ring-1 focus-visible:ring-orange/50 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="ghost" className="rounded-xl text-gray-400 font-bold text-xs gap-2">
            <Filter className="w-4 h-4" />
            Filter by Status
          </Button>
          <div className="h-6 w-px bg-gray-100 dark:bg-white/5 hidden md:block" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
            Total: {DUMMY_PATIENTS.length} Patients
          </p>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {DUMMY_PATIENTS.map((patient) => (
          <div
            key={patient.id}
            className="group bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-5 flex flex-col xl:flex-row items-center gap-8 hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300"
          >
            {/* Identity Cell */}
            <div className="flex items-center gap-5 w-full xl:w-1/4">
              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden flex-shrink-0 grayscale-[0.5] group-hover:grayscale-0 transition-all">
                <img src={patient.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-[11px] font-bold text-orange uppercase tracking-tighter">
                  ID: {patient.id}
                </p>
              </div>
            </div>

            {/* Contact Cell */}
            <div className="grid grid-cols-1 gap-2 w-full xl:w-1/4 border-l border-gray-50 dark:border-white/5 pl-8">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold">{patient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold">{patient.phone}</span>
              </div>
            </div>

            {/* Clinical Info Cell */}
            <div className="flex flex-col gap-1 w-full xl:w-1/5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Visit</p>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{patient.lastVisit}</p>
            </div>

            {/* Status & Security */}
            <div className="flex items-center gap-4 w-full xl:w-auto">
              <Badge className={`rounded-xl px-4 py-1.5 font-bold text-[10px] ${patient.status === 'ACTIVE'
                ? "bg-green-500/10 text-green-500"
                : "bg-orange/10 text-orange"
                }`}>
                {patient.status.replace('_', ' ')}
              </Badge>
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-white/5" title="HIPAA Compliant Record">
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-orange hover:bg-orange/5">
                <FileText className="w-5 h-5" />
              </Button>
              <Button className="rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-xs px-6 h-12 hover:bg-orange dark:hover:bg-orange dark:hover:text-white transition-all">
                View Profile
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-300">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <Button disabled variant="outline" className="rounded-xl border-gray-100 dark:border-white/5 font-bold text-xs h-10">Previous</Button>
        <div className="flex gap-1">
          <Button className="w-10 h-10 rounded-xl bg-orange text-white font-bold text-xs">1</Button>
          <Button variant="ghost" className="w-10 h-10 rounded-xl font-bold text-xs">2</Button>
        </div>
        <Button variant="outline" className="rounded-xl border-gray-100 dark:border-white/5 font-bold text-xs h-10 flex gap-2">
          Next <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}