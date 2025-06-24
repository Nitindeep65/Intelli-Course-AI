'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  CircleUserRound,
  BookOpenCheck,
  MessagesSquare,
  LayoutDashboard,
  Bot,
  Video,
  Trophy
} from 'lucide-react';
import DashboardNavbar from '@/components/DashboardNavbar';

export default function Dashboard() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const features = [
    {
      icon: <LayoutDashboard className="w-6 h-6 text-indigo-600" />,
      title: "Continue Learning",
      desc: "Pick up where you left off in your courses.",
      link: "/dashboard/courses",
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-green-600" />,
      title: "AI Quiz Generator",
      desc: "Auto-generate quizzes based on lessons you've watched.",
      link: "/dashboard/quiz",
    },
    {
      icon: <MessagesSquare className="w-6 h-6 text-yellow-500" />,
      title: "AI Tutor Chat",
      desc: "Ask questions and get real-time answers from your AI tutor.",
      link: "/dashboard/tutor",
    },
    {
      icon: <CircleUserRound className="w-6 h-6 text-pink-600" />,
      title: "Personalized Summary",
      desc: "View smart summaries of your completed lessons.",
      link: "/dashboard/summary",
    },
    {
      icon: <Video className="w-6 h-6 text-red-500" />,
      title: "Live Coding Sessions",
      desc: "Attend or review expert-led coding sessions.",
      link: "/dashboard/live-sessions",
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      title: "Achievements",
      desc: "Track your learning achievements and progress badges.",
      link: "/dashboard/achievements",
    },
    {
      icon: <Bot className="w-6 h-6 text-blue-500" />,
      title: "Code Assistant",
      desc: "AI that helps you understand or debug your code.",
      link: "/dashboard/code-assistant",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />

      {/* Mobile toggle button */}
      <div className="md:hidden px-6 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold underline"
        >
          View AI Tools
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 transition-transform duration-300 ease-in-out flex flex-col justify-between
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:block
          `}
        >
          <div>
            {/* Mobile Close Button (top) */}
            <div className="flex justify-end mb-4 md:hidden">
              <button
                onClick={() => setSidebarOpen(false)}
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
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {feature.icon}
                  {feature.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Close Button (bottom) */}
          <div className="mt-6 md:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full py-2 text-sm text-center text-gray-600 dark:text-gray-300 hover:text-red-500 border-t border-gray-200 dark:border-gray-700"
            >
              ✕ Close Sidebar
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-8">
          <header className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 dark:text-white">
                Welcome back{session?.user?.name ? `, ${session.user.name}` : ''} 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Explore your personalized learning tools powered by AI.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition flex items-start gap-4"
              >
                {feature.icon}
                <div>
                  <h2 className="text-lg font-semibold dark:text-white">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
