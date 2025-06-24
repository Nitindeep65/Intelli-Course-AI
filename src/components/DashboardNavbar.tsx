'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Bell, Settings, CircleUserRound } from 'lucide-react';
import Image from 'next/image';

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
      {/* Logo/Title */}
      <Link href="/dashboard" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        {/* IntelliCourse AI removed */}
        Dashboard
      </Link>

      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-500">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:text-indigo-500 text-gray-700 dark:text-gray-200"
          >
            <Image
  src={session?.user?.image || '/default-avatar.png'}
  width={32} // ✅ number
  height={32} // ✅ number
  alt="User Avatar"
  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
/>

            <span className="text-sm hidden sm:block">
              {session?.user?.name || 'User'}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings size={16} /> Settings
              </Link>
              <Link
                href="/dashboard/summary"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <CircleUserRound size={16} /> Personalized Summary
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
