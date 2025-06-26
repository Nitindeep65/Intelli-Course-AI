"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navigationLinks = [
  {
    name: "Features",
    href: "/features",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "AI Quiz Generator",
        href: "/features/quiz",
        icon: <BookOpen className="w-4 h-4" />, 
        description: "Create personalized quizzes",
      },
      {
        name: "AI Tutor Chat",
        href: "/features/tutor",
        icon: <Sparkles className="w-4 h-4" />, 
        description: "Get instant help",
      },
      {
        name: "Live Sessions",
        href: "/features/live-sessions",
        icon: <Zap className="w-4 h-4" />, 
        description: "Interactive learning",
      },
      {
        name: "Achievements",
        href: "/features/achievements",
        icon: <Trophy className="w-4 h-4" />, 
        description: "Track your progress",
      },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-lg ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md border-b"
          : "bg-white/70 dark:bg-gray-900/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                IntelliCourse
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                AI Learning Platform
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navigationLinks.map((link) => (
              <div key={link.name} className="relative" ref={dropdownRef}>
                {link.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActiveLink(link.href)
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActiveLink(link.href)
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="absolute left-0 top-full mt-2 w-80 z-50 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl py-2">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/login"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Get Started
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}