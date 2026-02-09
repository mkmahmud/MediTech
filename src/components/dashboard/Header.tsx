import { Menu, ShieldCheck, Search, Bell } from "lucide-react"

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#fcfcfc]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="lg:hidden h-12 w-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-2xl shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-orange" />
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Secure_Protocol_Active</span>
          </div>
          <h2 className="text-sm font-black uppercase tracking-tighter italic leading-none mt-1">Terminal_Mainframe</h2>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-10">
        <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-gray-100/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 group focus-within:border-orange/50 transition-all">
          <Search className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-orange" />
          <input 
            type="text" 
            placeholder="EXECUTE_QUERY..." 
            className="bg-transparent border-none outline-none text-[9px] font-black uppercase tracking-widest w-32 placeholder:text-gray-400" 
          />
          <span className="text-[8px] font-black text-gray-300 dark:text-gray-600 px-1.5 py-0.5 border border-gray-200 dark:border-white/10 rounded">⌘K</span>
        </div>

        <div className="flex items-center gap-4 border-l border-gray-100 dark:border-white/10 pl-4 lg:pl-10">
          <div className="relative cursor-pointer hover:scale-110 transition-transform">
            <Bell className="w-5 h-5 text-gray-400 hover:text-orange" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-orange rounded-full border-2 border-[#fcfcfc] dark:border-[#030303] animate-pulse" />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-black uppercase leading-none">A.Dimitrov</p>
              <p className="text-[7px] font-bold text-orange uppercase tracking-widest mt-1">ID: 0x882_A</p>
            </div>
            <div className="w-11 h-11 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center font-black text-xs shadow-xl shadow-black/5">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}