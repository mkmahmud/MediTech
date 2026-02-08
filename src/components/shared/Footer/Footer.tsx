import { HeartHandshake, ShieldCheck, Zap, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#030303] text-black dark:text-white pt-20 pb-6 px-6 border-t border-gray-100 dark:border-white/5 relative overflow-hidden transition-colors">

      {/* Background Decor (Matching your grid system) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16">

          {/* --- 1. System Identity --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col">
              <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-2 group">
                <HeartHandshake className="text-orange w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span>Medi<span className="text-orange">.</span></span>
              </Link>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em] mt-2 ml-1">
                Clinical Intelligence OS
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs font-medium">
              Empowering healthcare through high-precision digital architecture.
              Secure. Fragmented. Available.
            </p>

            {/* Tactical Social Icons */}
            <div className="flex gap-2">
              {[
                { icon: <Twitter className="w-4 h-4" />, label: 'TW' },
                { icon: <Github className="w-4 h-4" />, label: 'GH' },
                { icon: <Linkedin className="w-4 h-4" />, label: 'LN' }
              ].map((item) => (
                <a key={item.label} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-orange/30 hover:text-orange transition-all">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- 2. Navigation Modules --- */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">

            {/* Column 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-orange rounded-full" />
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black dark:text-white">Directory</h4>
              </div>
              <ul className="space-y-3 text-[13px] font-bold text-gray-500 dark:text-gray-400">
                <li><Link to="/doctors" className="hover:text-orange flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-orange transition-all">01</span> Find Doctors</Link></li>
                <li><Link to="/services" className="hover:text-orange flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-orange transition-all">02</span> Services</Link></li>
                <li><Link to="/tests" className="hover:text-orange flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-orange transition-all">03</span> Lab Tests</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-primary rounded-full" />
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black dark:text-white">Protocol</h4>
              </div>
              <ul className="space-y-3 text-[13px] font-bold text-gray-500 dark:text-gray-400">
                <li><Link to="/about" className="hover:text-primary flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-primary transition-all">04</span> About OS</Link></li>
                <li><Link to="/careers" className="hover:text-primary flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-primary transition-all">05</span> Careers</Link></li>
                <li><Link to="/contact" className="hover:text-primary flex items-center gap-2 group"><span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 text-primary transition-all">06</span> Support</Link></li>
              </ul>
            </div>

            {/* Column 3: Emergency Card */}
            <div className="col-span-2 md:col-span-1">
              <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-orange uppercase font-bold tracking-tighter">Emergency Hub</span>
                  <div className="w-2 h-2 rounded-full bg-orange animate-ping" />
                </div>
                <p className="text-xl font-black text-black dark:text-white tracking-tighter">+880 123 456 789</p>
                <button className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-orange dark:hover:bg-primary dark:hover:text-white transition-all">
                  Instant Access
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Bottom Status Bar (The "Footer HUD") --- */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span>SSL: ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-orange" />
              <span>LATENCY: 14MS</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>REGION: DHAKA_BD</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-gray-400">
            <p>© {currentYear} MEDI_CONSOLE</p>
            <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">PRIVACY_POLICY</Link>
            <Link to="#" className="hover:text-black dark:hover:text-white transition-colors">TERMS_OF_USE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}