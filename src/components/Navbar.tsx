'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          IntelliCourse
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
         <Link href="/login">
  <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
    Get Started
  </span>
</Link>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white dark:bg-gray-900 transition">
         <Link href="/login" onClick={() => setMenuOpen(false)}>
  <span className="block py-2 text-sm text-gray-800 dark:text-gray-100">
    Log In
  </span>
</Link>
</div>
      )}
    </nav>
  );
}
