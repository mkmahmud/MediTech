import { HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black pt-16 pb-8 transition-colors duration-300 ">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">

        {/* --- Brand Section --- */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-brand-primary dark:text-brand-orange flex items-center space-x-1 text-orange">
            <HeartHandshake className='' /><span className="text-brand-soft">Medi.</span>
          </Link>
          <p className="text-md text-gray-500 leading-relaxed max-w-sm dark:text-gray-400">
            Empowering patients with seamless digital healthcare solutions.
            Reliable, secure, and always available.
          </p>
          {/* Social Icons with Soft Backgrounds */}
          <div className="flex gap-3">
            {['Fb', 'Tw', 'Ln', 'Ig'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-primary font-bold hover:bg-orange hover:text-white transition-all dark:bg-white/5">
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* --- Navigation Columns --- */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-orange">Platform</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li><Link to="#" className="hover:text-primary transition-colors">Find Doctors</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Lab Tests</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Medicines</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-orange">Company</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-6 col-span-2 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-orange">Support</h4>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-primary/10 dark:border-soft/20">
              <p className="text-xs text-gray-500 mb-2">Emergency 24/7</p>
              <p className="text-lg font-bold text-primary">+880 123 456 789</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Footer Bar --- */}
      <div className="pt-2 border-t border-gray-100  text-center">
        <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
          <p>© {currentYear} Meditech Inc.</p>
          <Link to="#" className="hover:underline">Privacy</Link>
          <Link to="#" className="hover:underline">Terms</Link>
        </div>


      </div>
    </footer>
  );
}