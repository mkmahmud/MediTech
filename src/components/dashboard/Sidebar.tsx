import { NavLink, Link, useLocation } from 'react-router'
import { motion } from "framer-motion"
import {
    Dna, Activity, ChevronRight, Cpu, ArrowLeft,
    LayoutDashboard, Users, Calendar, Settings
} from "lucide-react"

const NAV_ITEMS = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { path: "/dashboard/patients", label: "Patient_Nodes", icon: Users },
    { path: "/dashboard/appointments", label: "Cycle_Registry", icon: Calendar },
    { path: "/dashboard/settings", label: "System_Config", icon: Settings },
];

export default function Sidebar({ closeMobileMenu }: { closeMobileMenu?: () => void }) {
    const location = useLocation();

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#050505] p-6 border-r border-gray-100 dark:border-white/5">
            {/* Brand Identity */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="relative">
                    <div className="w-10 h-10 bg-orange flex items-center justify-center rounded-xl shadow-lg shadow-orange/20 relative z-10">
                        <Dna className="text-white w-6 h-6" />
                    </div>
                    <div className="absolute inset-0 bg-orange/40 blur-lg rounded-xl animate-pulse" />
                </div>
                <div>
                    <span className="text-sm font-black uppercase tracking-[0.3em] block leading-none">Clinical.OS</span>
                    <span className="text-[8px] font-bold text-orange uppercase tracking-widest mt-1">v2.4.0_STABLE</span>
                </div>
            </div>

            {/* Navigation Registry */}
            <nav className="flex-1 space-y-1">
                <div className="flex items-center justify-between px-4 mb-4">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Core_Systems</p>
                    <Activity className="w-3 h-3 text-gray-300" />
                </div>
                {NAV_ITEMS.map((item) => (
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
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-all relative z-10 ${location.pathname === item.path ? 'opacity-100 translate-x-0 text-orange' : 'opacity-0 -translate-x-2'}`} />
                        {location.pathname === item.path && (
                            <motion.div layoutId="activeGlow" className="absolute inset-0 bg-gradient-to-r from-orange/20 to-transparent pointer-events-none" />
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer Status */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
                <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-3 h-3 text-orange" />
                        <span className="text-[8px] font-black uppercase text-gray-400">Node_Health</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full">
                        <div className="h-full w-[88%] bg-orange rounded-full" />
                    </div>
                </div>
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-orange transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Terminate_Session</span>
                </Link>
            </div>
        </div>
    );
}