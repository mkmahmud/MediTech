import { Link } from "react-router"
import { motion } from "framer-motion"
import {  ShieldCheck, Activity, Globe, Cpu, Users, Zap, Microscope, Shield } from "lucide-react"
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const clinicalFontStack = { fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" };

  const stats = [
    { label: "Active_Nodes", value: "50K+", icon: Users },
    { label: "Uptime_Protocol", value: "99.9%", icon: Activity },
    { label: "Encryption_Standard", value: "AES-256", icon: ShieldCheck },
    { label: "Global_Reach", value: "24/7", icon: Globe },
  ];

  const principles = [
    { title: "Precision", desc: "Every diagnosis is backed by high-fidelity data and top-tier expertise.", icon: Microscope },
    { title: "Speed", desc: "Instant clinical uplinks. No waiting rooms, no delays, just care.", icon: Zap },
    { title: "Trust", desc: "HIPAA-hardened security protocols for total patient confidentiality.", icon: Shield },
    { title: "Access", desc: "A global network of specialists available from any coordinate.", icon: Globe },
  ];


  return (
    <div style={clinicalFontStack} className="min-h-screen bg-white dark:bg-[#030303] text-gray-900 dark:text-white">

      {/* --- HERO SECTION: SYSTEM ARCHIVE --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden ">
        <div className="absolute inset-0 opacity-30 grayscale"
          style={{ backgroundImage: "url('/about-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className="absolute inset-0  " />

        <div className="relative z-10 text-center space-y-6 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange animate-pulse" />
            <span className="text-[10px] font-mono font-black text-orange uppercase tracking-[0.3em]">Protocol_Mission_v2.0</span>
          </motion.div>

          <h1 className="text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
            Redefining <br />
            <span className="text-orange italic">Human_Care.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium uppercase tracking-tight">
            Medi is not just an application. It is a clinical grid designed to bridge the gap between human biological needs and high-fidelity technology.
          </p>
        </div>
      </section>

      {/* --- STATS GRID: SYSTEM CAPACITY --- */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-3xl shadow-2xl"
            >
              <stat.icon className="w-6 h-6 text-orange mb-4" />
              <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
              <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

       {/* --- PRINCIPLES: MINIMALIST GRID --- */}
      <section className="pt-32 px-6 lg:px-24 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            {principles.map((p, i) => (
              <div key={i} className="bg-white dark:bg-[#050505] p-12 space-y-8 hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors">
                <p className="text-orange font-mono font-bold text-xs uppercase tracking-widest">0{i + 1} //</p>
                <h3 className="text-3xl font-black uppercase tracking-tighter">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION: CLINICAL LOGIC --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-[12px] font-mono font-black text-orange uppercase tracking-[0.5em]">The_Core_Logic</h2>
            <h3 className="text-5xl font-black tracking-tighter uppercase leading-none">Surgical <br /> Precision Care.</h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
            We believe healthcare should be as instantaneous as any other digital protocol. Our platform utilizes neural routing to connect patients with the exact specialist required, eliminating the latency of traditional clinics.
          </p>
          <ul className="space-y-4">
            {['Encrypted Tele-Uplinks', 'Real-time Vital Monitoring', 'Automated Clinical Records'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                <Zap className="w-4 h-4 text-orange" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-square bg-gray-100 dark:bg-[#0a0a0a] rounded-[4rem] overflow-hidden border border-gray-200 dark:border-white/10 group">
          <div className="absolute inset-0 bg-orange/5 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute inset-10 border border-dashed border-gray-300 dark:border-white/10 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="w-32 h-32 text-orange/20" />
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION: INITIALIZE --- */}
      <section className="py-24 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        />
        <div className="relative z-10 space-y-10">
          <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
            Ready to <span className="text-orange italic">Sync?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-orange hover:text-white transition-all">
                Initialize_Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="default" className="h-16 px-12 rounded-2xl border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/5">
                Execute_Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

     


    </div>
  )
}