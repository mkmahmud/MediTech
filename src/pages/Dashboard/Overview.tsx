import { motion } from "framer-motion"
import {
  Activity,
  Users,
  Zap,
  ArrowUpRight,
  Plus,
  Clock,
  ShieldCheck,
  MoreHorizontal,
  Dna
} from "lucide-react"
import { Button } from "@/components/ui/button"

const STATS = [
  { label: "Active_Nodes", value: "124", change: "+12%", icon: Users },
  { label: "Throughput", value: "98.2%", change: "+0.4%", icon: Activity },
  { label: "Sync_Latency", value: "14ms", change: "-2ms", icon: Zap },
  { label: "Integrity", value: "99.9%", change: "Stable", icon: ShieldCheck },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "Protocol", title: "Neural_Mapping_Initialized", time: "02m_AGO", status: "Active" },
  { id: 2, type: "User", title: "Dr_Jenkins_Uplinked", time: "14m_AGO", status: "Success" },
  { id: 3, type: "System", title: "Archive_Sync_Complete", time: "28m_AGO", status: "Success" },
];

export default function DashboardOverview() {
  const fontStack = { fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" };

  return (
    <div style={fontStack} className="min-h-screen bg-[#fcfcfc] dark:bg-[#030303] text-[#1a1a1a] dark:text-white p-6 lg:p-10">

      {/* --- TOP COMMAND BAR --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-orange animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange">Command_Center_v2.0</span>
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">System_Overview</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl border-2 border-gray-100 dark:border-white/5 h-14 px-8 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            Export_Logs
          </Button>
          <Button className="rounded-2xl bg-orange h-14 px-8 font-black uppercase text-[10px] tracking-widest text-white hover:scale-105 transition-all shadow-xl shadow-orange/20">
            <Plus className="w-4 h-4 mr-2" /> New_Protocol
          </Button>
        </div>
      </div>

      {/* --- TELEMETRY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] p-8 space-y-4 hover:border-orange/30 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:bg-orange group-hover:text-white transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[9px] font-black px-2 py-1 rounded-md ${stat.change.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-4xl font-black uppercase tracking-tighter italic">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* --- CENTRAL ANALYTICS (8 COLS) --- */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[48px] p-10 h-[500px] relative overflow-hidden group">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Throughput_Monitoring</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time Data Stream</p>
              </div>
              <MoreHorizontal className="text-gray-300" />
            </div>

            {/* Visual Placeholder for a Chart */}
            <div className="absolute inset-x-10 bottom-10 h-64 flex items-end gap-2">
              {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 40, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="flex-1 bg-gray-100 dark:bg-white/5 rounded-t-xl group-hover:bg-orange/20 transition-colors relative group/bar"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black dark:bg-white rounded-[40px] p-10 text-white dark:text-black flex flex-col justify-between h-[300px] group cursor-pointer overflow-hidden relative">
              <Dna className="absolute -right-10 -top-10 w-48 h-48 opacity-10 rotate-12" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Initialize_New<br />Service_Node</h3>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Expansion Protocol</p>
              </div>
              <ArrowUpRight className="w-10 h-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform relative z-10" />
            </div>
            <div className="bg-orange rounded-[40px] p-10 text-white flex flex-col justify-between h-[300px] shadow-2xl shadow-orange/30 cursor-pointer group">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Operational<br />Security_Audit</h3>
                <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Last Run: 24h Ago</p>
              </div>
              <ShieldCheck className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* --- LIVE FEED SIDEBAR (4 COLS) --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[48px] p-8 h-full">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Live_Activity</h3>
              <div className="h-1 w-8 bg-orange rounded-full" />
            </div>

            <div className="space-y-8">
              {RECENT_ACTIVITY.map((act) => (
                <div key={act.id} className="relative pl-8 border-l border-gray-100 dark:border-white/10 py-1">
                  <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-orange" />
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{act.type}</p>
                    <p className="text-[8px] font-bold text-gray-300">{act.time}</p>
                  </div>
                  <h4 className="text-sm font-black uppercase italic tracking-tight">{act.title}</h4>
                  <p className="text-[9px] font-bold text-green-500 mt-2 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {act.status}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-12 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest h-14 hover:bg-gray-50 dark:hover:bg-white/5">
              View_Full_Registry
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}