'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CircleUserRound, BookOpenCheck, MessagesSquare, LayoutDashboard,
  Bot, Video, Trophy, Sparkles, X, ChevronLeft, ChevronRight,
  Settings, LogOut, User, Bell,
} from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    title: "Dashboard",
    description: "Overview of your progress",
    link: "/dashboard/courses",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    category: "main"
  },
  {
    icon: <BookOpenCheck className="w-5 h-5" />,
    title: "AI Quiz Generator",
    description: "Test your knowledge",
    link: "/dashboard/Quiz",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    category: "learning"
  },
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    title: "AI Tutor Chat",
    description: "Get instant help",
    link: "/features/tutor",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    category: "learning"
  },
  {
    icon: <CircleUserRound className="w-5 h-5" />,
    title: "Personalized Summary",
    description: "Your learning insights",
    link: "/dashboard/summary",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    category: "progress"
  },
  {
    icon: <Video className="w-5 h-5" />,
    title: "Live Sessions",
    description: "Interactive coding",
    link: "/dashboard/live-sessions",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    category: "learning"
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Achievements",
    description: "Your accomplishments",
    link: "/dashboard/achievements",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    category: "progress"
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Code Assistant",
    description: "AI-powered coding help",
    link: "/dashboard/code-assistant",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    category: "tools"
  }
];

const bottomActions = [
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Settings",
    link: "/dashboard/settings",
    color: "text-gray-500"
  },
  {
    icon: <LogOut className="w-5 h-5" />,
    title: "Logout",
    link: "/logout",
    color: "text-red-500"
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname();
  const [notifications] = useState(3);
  const [userStats] = useState({ level: 12, xp: 2450, streak: 7 });

  useEffect(() => {
    onClose(); // Close sidebar on route change (mobile)
  }, [onClose, pathname]);

  const isActiveRoute = (link: string) =>
    pathname === link || pathname.startsWith(link);

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  const categoryTitles = {
    main: "Overview",
    learning: "Learning Tools",
    progress: "Progress",
    tools: "AI Tools"
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 transform shadow-lg
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-200/50 dark:border-gray-700/50
          transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-20' : 'w-72'}
          md:relative md:translate-x-0 md:block
        `}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <Sparkles className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            {!isCollapsed && (
              <div className="truncate max-w-[150px]">
                <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  IntelliCourse
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Learning Platform</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Stats */}
        {!isCollapsed && (
          <div className="p-3 m-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Level {userStats.level}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{userStats.xp} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
            <div key={category} className="mb-6">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h3>
              )}

              <div className="space-y-1">
                {categoryFeatures.map((feature, index) => {
                  const isActive = isActiveRoute(feature.link);
                  return (
                    <Link
                      key={index}
                      href={feature.link}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                        ${isActive ? `${feature.bgColor} ${feature.color} border border-current/20` : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'}
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? feature.title : ''}
                    >
                      <span className={`${isActive ? feature.color : 'text-gray-600 dark:text-gray-400'}`}>
                        {feature.icon}
                      </span>
                      {!isCollapsed && (
                        <div>
                          <p className="text-sm font-medium">{feature.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {bottomActions.map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800/50 ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? action.title : ''}
            >
              <span className={`${action.color}`}>{action.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.title}
                </span>
              )}
            </Link>
          ))}

          {!isCollapsed && notifications > 0 && (
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {notifications} new notifications
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
