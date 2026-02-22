import { HeartHandshake, Lightbulb, Moon, LayoutGrid, Fingerprint, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../../../stores/themeStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export default function Navbar() {
  // Get User logged in or not
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Doctors', path: '/doctors', tag: 'MD_NET' },
    { name: 'Services', path: '/services', tag: 'SRV_MOD' },
    { name: 'Tests', path: '/tests', tag: 'LAB_RES' },
    { name: 'About', path: '/about', tag: 'SYS_INF' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 font-roboto">
      {/* The Desktop Glass Shell */}
      <div
        className={`max-w-7xl mx-auto h-16 flex items-center justify-between px-6 rounded-[1.5rem] transition-all duration-500 border ${scrolled
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-gray-200 dark:border-white/10 shadow-2xl h-14'
          : 'bg-white dark:bg-black border-transparent shadow-sm'
          }`}
      >

        {/* --- 1. BRANDING --- */}
        <Link to="/" className="flex items-center   group">
          <div className="relative">
            <div className="absolute inset-0   blur-lg rounded-full animate-pulse  " />
            <div className="relative h-10 w-10 flex items-center justify-center rounded-xl  ">
              <HeartHandshake className="w-5 h-5 text-orange group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter dark:text-white uppercase leading-none">
              Medi<span className="text-orange"> Tech</span>
            </span>

          </div>
        </Link>

        {/* ---   THE FLOATING NAV (Desktop) --- */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50/50 dark:bg-white/[0.03] p-1.5 rounded-full border border-gray-100 dark:border-white/5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-6 py-2 group"
              >
                <div className="flex flex-col items-center relative z-10">
                  <span className={`  text-sm font-medium   transition-all duration-300 ${isActive ? 'text-orange translate-y-[-1px]' : 'text-gray-500 group-hover:text-black dark:group-hover:text-white '
                    }`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -bottom-1 w-1 h-1 bg-orange rounded-full shadow-[0_0_8px_#f97316]"
                    />
                  )}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* --- 3. THE UTILITY HUD (Desktop) --- */}
        <div className="flex items-center gap-3">
          {/* Status Badge (Desktop Only) */}


          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5   text-gray-400 hover:text-orange transition-all hover:scale-110"
          >
            {isDarkMode ? <Lightbulb className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>



          {
            isLoggedIn ? <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium   active:scale-95 transition-all"
            >
              Dashboard
            </Link> : <Link
              to="/auth/login"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium   active:scale-95 transition-all"
            >
              Login
            </Link>
          }

          {/* Mobile Menu (Kept Mobile Design style) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN MENU (The one you liked) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 z-[110] bg-white dark:bg-[#030303] flex flex-col px-10 py-6"
          >
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-8">
              <Link to="/" className="flex items-center   group">
                <div className="relative">
                  <div className="absolute inset-0   blur-lg rounded-full animate-pulse  " />
                  <div className="relative h-10 w-10 flex items-center justify-center rounded-xl  ">
                    <HeartHandshake className="w-5 h-5 text-orange group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tighter dark:text-white uppercase leading-none">
                    Medi<span className="text-orange"> Tech</span>
                  </span>

                </div>
              </Link>

              <div className='flex items-center  space-x-2'>
                <button
                  onClick={toggleDarkMode}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5   text-gray-400 hover:text-orange transition-all hover:scale-110"
                >
                  {isDarkMode ? <Lightbulb className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-2xl">
                  <LayoutGrid className="w-6 h-6 rotate-45 text-orange" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-16">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex flex-col"
                >
                  <span className="text-[10px] font-mono text-orange mb-1">0{i + 1}. // {link.tag}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black uppercase tracking-tighter dark:text-white transition-all group-hover:italic group-hover:text-primary">
                      {link.name}
                    </span>
                    <ChevronRight className="w-6 h-6 text-gray-100 dark:text-white/5 group-hover:text-orange transition-colors" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <div className="h-[1px] w-full bg-gradient-to-r from-orange to-transparent opacity-20" />

              {
                isLoggedIn ? <Link
                  to="/dashboard"
                  className="  flex items-center gap-2 px-6 py-2.5 bg-black  dark:bg-white text-white justify-center dark:text-black rounded-full text-sm font-medium      "
                >
                  <Fingerprint className="w-4 h-4" />
                  Dashboard
                </Link> : <Link
                  to="/auth/login"
                  className=" flex items-center gap-2 px-6 py-2.5 bg-black  dark:bg-white text-white justify-center dark:text-black rounded-full text-sm font-medium     "
                >
                  <Fingerprint className="w-4 h-4" />
                  Login
                </Link>
              }

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}