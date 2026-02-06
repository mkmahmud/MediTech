import { HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu items for Meditech
  const navLinks = [
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Tests', path: '/tests' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className=" relative w-full z-50 transition-all duration-300 bg-transparent text-app-text">
      <div className="flex items-center justify-between h-20">

        {/*  Logo --- */}
        <div className="flex-shrink-0 ml-4">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-brand-primary dark:text-brand-orange flex items-center space-x-1 text-orange">
            <HeartHandshake className='' /><span className="text-brand-soft">Medi.</span>
          </Link>
        </div>

        {/* ---   Expandable Menus (Desktop) --- */}
        <div className="hidden md:flex items-center justify-center group">
          {/* The "Hover Trigger" area */}
          <div className="flex items-center space-x-2 px-6 py-2 rounded-full border border-transparent group-hover:border-gray-200 dark:group-hover:border-brand-primary/30 group-hover:bg-white/10 backdrop-blur-md transition-all duration-500 overflow-hidden max-w-[60px] group-hover:max-w-[600px]">

            {/* Icon that shows when collapsed */}
            <div className="flex-shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary dark:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>

            {/* Hidden links that slide/fade in on hover */}
            <div className="flex space-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-medium hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ---   Actions --- */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="hidden sm:block px-6 py-2.5 rounded-full bg-orange text-white font-semibold hover:bg-primary transition-all shadow-md active:scale-95"
          >
            Sign In
          </Link>

          {/* Mobile Menu Toggle  */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-brand-primary/20"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-deep shadow-xl rounded-b-2xl p-6 flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium border-b border-gray-100 dark:border-gray-800 pb-2">
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="w-full text-center py-3 bg-brand-orange text-white rounded-xl">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}