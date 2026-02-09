import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';


export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#fcfcfc] dark:bg-[#030303] text-[#1a1a1a] dark:text-white overflow-hidden font-['Roboto']">

      {/* Google Fonts Loader */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');`}
      </style>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-80 flex-col">
        <Sidebar />
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] z-[70] lg:hidden shadow-2xl"
            >
              <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-14">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>


      </div>
    </div>
  )
}