import { NavLink, Link, useLocation } from 'react-router'
import { motion } from "framer-motion"
import {
    ChevronRight, ArrowLeft,
    LayoutDashboard, Users, Calendar, Settings,
    HeartHandshake, ClipboardList, Pill, Beaker,
    Activity, ShieldAlert, UserCircle,
    UserPlus
} from "lucide-react"
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/stores/auth/useAuthStore';

// Dynamic Navigation Configuration
const ALL_NAV_ITEMS = [
    {
        path: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        end: true,
        roles: ["SUPER_ADMIN", "ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN", "PATIENT"]
    },
    {
        path: "/dashboard/patients",
        label: "Patient_Nodes",
        icon: Users,
        roles: ["SUPER_ADMIN", "ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"]
    },
    {
        path: "/dashboard/appointments",
        label: "Cycle_Registry",
        icon: Calendar,
        roles: ["SUPER_ADMIN", "ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"]
    },
    {
        path: "/dashboard/vitals",
        label: "Vitals_Track",
        icon: Activity,
        roles: ["DOCTOR", "NURSE", "PATIENT"]
    },
    {
        path: "/dashboard/pharmacy",
        label: "Med_Inventory",
        icon: Pill,
        roles: ["SUPER_ADMIN", "PHARMACIST", "DOCTOR"]
    },
    {
        path: "/dashboard/lab",
        label: "Lab_Analysis",
        icon: Beaker,
        roles: ["SUPER_ADMIN", "LAB_TECHNICIAN", "DOCTOR"]
    },
    {
        path: "/dashboard/billing",
        label: "Financial_Node",
        icon: ClipboardList,
        roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "PATIENT"]
    },
    {
        path: "/dashboard/users",
        label: "Staff_Registry",
        icon: ShieldAlert,
        roles: ["SUPER_ADMIN", "ADMIN"]
    },
    {
        path: "/dashboard/profile",
        label: "My_Profile",
        icon: UserCircle,
        roles: ["SUPER_ADMIN", "ADMIN", "DOCTOR", "NURSE", "PATIENT", "RECEPTIONIST", "PHARMACIST", "LAB_TECHNICIAN"]
    },
    {
        path: "/dashboard/settings",
        label: "System_Config",
        icon: Settings,
        roles: ["SUPER_ADMIN", "ADMIN"]
    },
    {
        path: "/dashboard/add-users",
        label: "Add User",
        icon: UserPlus,
        roles: ["SUPER_ADMIN", "ADMIN"]
    },
];

export default function Sidebar({ closeMobileMenu }: { closeMobileMenu?: () => void }) {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const userRole = user?.role;
    const { logout } = useAuth();




    // Filtering logic based on user role
    const filteredNav = ALL_NAV_ITEMS.filter(item => item.roles.includes(userRole || ""));

    const handleLogout = async () => {
        await logout();
    }

    const clinicalFontStack = { fontFamily: "'Roboto', 'Open Sans', 'Arial', sans-serif" };

    return (
        <div style={clinicalFontStack} className="flex flex-col h-full bg-white dark:bg-[#050505] p-6 border-r border-gray-100 dark:border-white/5">
            {/* Brand Identity */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="relative">
                    <div className="w-10 h-10 bg-orange flex items-center justify-center rounded-xl shadow-orange/20 relative z-10">
                        <HeartHandshake className="text-white w-6 h-6" />
                    </div>
                    <div className="absolute inset-0 bg-orange/40 blur-lg rounded-xl animate-pulse" />
                </div>
                <div>
                    <span className="text-md font-Roboto font-bold uppercase block leading-none">MediTech</span>
                    <span className="text-xs font-bold text-orange uppercase mt-1">v0.0.1</span>
                </div>
            </div>

            {/* Navigation Registry */}
            <nav className="flex-1 space-y-1">
                {filteredNav.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                            `relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all group overflow-hidden ${isActive
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xl shadow-black/20'
                                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                            }`
                        }
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-Roboto">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-all relative z-10 ${location.pathname === item.path ? 'opacity-100 translate-x-0 text-orange' : 'opacity-0 -translate-x-2'}`} />
                        {location.pathname === item.path && (
                            <motion.div layoutId="activeGlow" className="absolute inset-0 bg-gradient-to-r from-orange/20 to-transparent pointer-events-none" />
                        )}
                    </NavLink>
                ))}
            </nav>

            <Button variant="destructive" size="lg" className="text-white mt-6 w-full" onClick={handleLogout}>
                <span className="text-[10px] font-black uppercase tracking-widest">Log Out</span>
            </Button>

            {/* Footer Status */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-orange transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back TO Home </span>
                </Link>
            </div>
        </div>
    );
}