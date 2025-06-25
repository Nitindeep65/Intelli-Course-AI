'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardNavbar from '@/components/DashboardNavbar';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  type DashboardData = {
    progress: Record<string, number>;
    recentActivity: { type: string; title: string; date: string }[];
  };
  
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      setDashboardData(data);
    };

    fetchData();
  }, [session]);

  if (!session) return <div className="p-10">Loading...</div>;

  if (!dashboardData) return <div className="p-10">Fetching dashboard...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />

      <div className="md:hidden px-6 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold underline"
        >
          View AI Tools
        </button>
      </div>

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 px-6 py-8">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-indigo-700 dark:text-white">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ''} 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Heres a snapshot of your learning journey.
            </p>
          </header>

          {/* Progress Cards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Current Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.progress &&
                Object.entries(dashboardData.progress).map(([course, percent]) => (
                  <div key={course} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 capitalize">{course.replace('-', ' ')}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {percent as number}% completed
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${percent as number}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              {dashboardData?.recentActivity?.map((item: { type: string; title: string; date: string }, idx: number) => (
                <li
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {item.type === 'quiz' ? `Quiz: ${item.title}` : `Watched: ${item.title}`}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
