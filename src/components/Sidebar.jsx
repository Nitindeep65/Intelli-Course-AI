'use client';

import React from 'react';
import Link from 'next/link';
import {
  CircleUserRound,
  BookOpenCheck,
  MessagesSquare,
  LayoutDashboard,
  Bot,
  Video,
  Trophy
} from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="w-6 h-6 text-indigo-600" />,
    title: "Continue Learning",
    link: "/dashboard/courses",
  },
  {
    icon: <BookOpenCheck className="w-6 h-6 text-green-600" />,
    title: "AI Quiz Generator",
    link: "/dashboard/Quiz",
  },
  {
    icon: <MessagesSquare className="w-6 h-6 text-yellow-500" />,
    title: "AI Tutor Chat",
    link: "/dashboard/tutor",
  },
  {
    icon: <CircleUserRound className="w-6 h-6 text-pink-600" />,
    title: "Personalized Summary",
    link: "/dashboard/summary",
  },
  {
    icon: <Video className="w-6 h-6 text-red-500" />,
    title: "Live Coding Sessions",
    link: "/dashboard/live-sessions",
  },
  {
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    title: "Achievements",
    link: "/dashboard/achievements",
  },
  {
    icon: <Bot className="w-6 h-6 text-blue-500" />,
    title: "Code Assistant",
    link: "/dashboard/code-assistant",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:block
      `}
    >
      <div>
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            ✕ Close
          </button>
        </div>

        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">
          IntelliCourse AI
        </h2>
        <nav className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              onClick={onClose}
              className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {feature.icon}
              {feature.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-6 md:hidden">
        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-center text-gray-600 dark:text-gray-300 hover:text-red-500 border-t border-gray-200 dark:border-gray-700"
        >
          ✕ Close Sidebar
        </button>
      </div>
    </aside>
  );
}
