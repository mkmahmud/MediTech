import {
  Cpu, ShieldAlert,
  Database, Globe, Save,
  Activity
} from "lucide-react";

const SETTING_SECTIONS = [
  {
    id: "kernel",
    title: "Kernel_Configuration",
    icon: Cpu,
    items: [
      { label: "Auto_Diagnostics", desc: "Run background system health checks", status: "Enabled", active: true },
      { label: "Data_Sync_Frequency", desc: "Real-time uplink with central server", status: "0.5ms", active: false },
    ]
  },
  {
    id: "security",
    title: "Security_Protocols",
    icon: ShieldAlert,
    items: [
      { label: "Biometric_Lock", desc: "Require fingerprint for patient nodes", status: "Active", active: true },
      { label: "Encryption_Level", desc: "AES-256 Military Grade Hardware encryption", status: "Lvl_04", active: true },
    ]
  }
];

export default function Settings() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">System_Settings</h1>
          <p className="text-[10px] font-bold text-orange uppercase tracking-[0.4em] mt-2">Operational_Parameters_Registry</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10">
          <Save className="w-4 h-4" /> Commit_Changes
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Settings Area */}
        <div className="xl:col-span-2 space-y-8">
          {SETTING_SECTIONS.map((section) => (
            <section key={section.id} className="bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-[32px] overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-orange" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-sm">{section.title}</h3>
              </div>

              <div className="divide-y divide-gray-50 dark:divide-white/5">
                {section.items.map((item, idx) => (
                  <div key={idx} className="p-8 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-widest">{item.label}</p>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-[9px] font-black text-orange uppercase tracking-widest">{item.status}</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-orange' : 'bg-gray-200 dark:bg-white/10'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Sidebar Info/Status */}
        <div className="space-y-8">
          <div className="p-8 bg-black text-white dark:bg-white dark:text-black rounded-[32px] shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">User_Profile_Node</h4>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-orange/20 rounded-2xl flex items-center justify-center text-orange font-black text-xl">AD</div>
              <div>
                <p className="font-black uppercase tracking-tighter text-lg leading-none italic">A_Dimitrov</p>
                <p className="text-[9px] font-bold text-orange uppercase tracking-widest mt-1">Admin_Level_10</p>
              </div>
            </div>
            <button className="w-full py-4 border border-white/20 dark:border-black/20 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-orange hover:border-orange hover:text-white transition-all">
              Update_Node_Credentials
            </button>
          </div>

          <div className="p-8 border border-gray-100 dark:border-white/5 rounded-[32px] space-y-6">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">System_Health</p>
            {[
              { label: "Storage", val: "42%", icon: Database },
              { label: "Uptime", val: "99.9%", icon: Globe },
              { label: "Latency", val: "12ms", icon: Activity }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <stat.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-[10px] font-black uppercase">{stat.label}</span>
                </div>
                <span className="text-[10px] font-black italic">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}