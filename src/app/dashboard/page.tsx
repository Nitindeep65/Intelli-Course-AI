'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  Flame,
  Zap,
  Award,
  PlayCircle,
  Activity,
  BarChart3,
  Plus,
  ArrowRight,
  ChevronRight,
  Timer,
  Brain,
  Sparkles
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardNavbar from '@/components/DashboardNavbar';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('');

  type DashboardData = {
    progress: Record<string, number>;
    recentActivity: { type: string; title: string; date: string; duration?: string }[];
    stats: {
      totalCourses: number;
      completedCourses: number;
      totalQuizzes: number;
      averageScore: number;
      studyTime: number;
      streak: number;
      level: number;
      xp: number;
      nextLevelXP: number;
    };
    upcomingTasks: { title: string; dueDate: string; priority: 'high' | 'medium' | 'low'; type: string }[];
    achievements: { id: string; title: string; description: string; icon: string; earnedDate: string; rarity: 'common' | 'rare' | 'epic' | 'legendary' }[];
    weeklyProgress: { day: string; hours: number; completed: number }[];
  };

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get time of day greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good morning');
    else if (hour < 17) setTimeOfDay('Good afternoon');
    else setTimeOfDay('Good evening');
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: DashboardData = {
          progress: {
            'react-fundamentals': 85,
            'javascript-advanced': 62,
            'nodejs-backend': 45,
            'python-basics': 78,
            'web-design': 92
          },
          recentActivity: [
            { type: 'quiz', title: 'React Hooks Quiz', date: '2 hours ago', duration: '15 min' },
            { type: 'video', title: 'Understanding useEffect', date: '1 day ago', duration: '12 min' },
            { type: 'quiz', title: 'JavaScript ES6 Features', date: '2 days ago', duration: '20 min' },
            { type: 'video', title: 'Node.js Authentication', date: '3 days ago', duration: '25 min' },
            { type: 'assignment', title: 'Build a Todo App', date: '4 days ago', duration: '2 hours' }
          ],
          stats: {
            totalCourses: 12,
            completedCourses: 5,
            totalQuizzes: 48,
            averageScore: 87,
            studyTime: 145,
            streak: 7,
            level: 12,
            xp: 2450,
            nextLevelXP: 3000
          },
          upcomingTasks: [
            { title: 'Complete React Quiz', dueDate: 'Jun 28', priority: 'high', type: 'quiz' },
            { title: 'Watch: Node.js Auth Video', dueDate: 'Jun 29', priority: 'medium', type: 'video' },
            { title: 'Submit Portfolio Project', dueDate: 'Jul 02', priority: 'high', type: 'project' },
            { title: 'Review JavaScript Concepts', dueDate: 'Jul 05', priority: 'low', type: 'review' }
          ],
          achievements: [
            { id: '1', title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', earnedDate: '2 weeks ago', rarity: 'common' },
            { id: '2', title: 'Streak Master', description: 'Maintained a 7-day learning streak', icon: '🔥', earnedDate: '1 week ago', rarity: 'rare' },
            { id: '3', title: 'Quiz Champion', description: 'Scored 100% on 5 quizzes', icon: '🏆', earnedDate: '3 days ago', rarity: 'epic' },
            { id: '4', title: 'Knowledge Seeker', description: 'Completed 50 lessons', icon: '📚', earnedDate: '1 day ago', rarity: 'rare' },
            { id: '5', title: 'Code Warrior', description: 'Completed 10 coding challenges', icon: '⚔️', earnedDate: 'Today', rarity: 'legendary' }
          ],
          weeklyProgress: [
            { day: 'Mon', hours: 2.5, completed: 3 },
            { day: 'Tue', hours: 1.8, completed: 2 },
            { day: 'Wed', hours: 3.2, completed: 4 },
            { day: 'Thu', hours: 2.1, completed: 2 },
            { day: 'Fri', hours: 4.0, completed: 5 },
            { day: 'Sat', hours: 1.5, completed: 1 },
            { day: 'Sun', hours: 2.8, completed: 3 }
          ]
        };
        
        setDashboardData(mockData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-pulse">
            <Sparkles className="h-12 w-12 text-indigo-600 mx-auto animate-bounce" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Preparing your dashboard...</p>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="w-4 h-4 text-green-500" />;
      case 'video': return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case 'assignment': return <BookOpen className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600';
      case 'rare': return 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600';
      case 'epic': return 'bg-purple-50 border-purple-300 dark:bg-purple-900/20 dark:border-purple-600';
      case 'legendary': return 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-500';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const xpProgress = dashboardData ? (dashboardData.stats.xp / dashboardData.stats.nextLevelXP) * 100 : 0;
  const completionRate = dashboardData ? (dashboardData.stats.completedCourses / dashboardData.stats.totalCourses) * 100 : 0;

  return (
   <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
  <DashboardNavbar />

  {/* Mobile Sidebar Toggle */}
  <div className="md:hidden px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <button
      onClick={() => setSidebarOpen(true)}
      className="flex bg-gradient-to-r from-indigo-600 via-purple-60 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 items-center gap-2 text-black dark:text-black text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-2 rounded-lg transition-all duration-200"
    >
      <Sparkles className="w-4 h-4" />
      View AI Tools
    </button>
  </div>

  <div className="flex flex-1">
    <Sidebar 
      isOpen={sidebarOpen} 
      onClose={() => setSidebarOpen(false)}
      isCollapsed={sidebarCollapsed}
      onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
    />

    {/* Main Dashboard Section */}
    <main className={`min-h-screen flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-1'} bg-white dark:bg-gray-900`}>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto lg:pl-6 lg:pr-6">
        {/* Welcome Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {timeOfDay}{session?.user?.name ? `, ${session.user.name}` : ''} 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Ready to continue your learning journey? Let&apos;s make today count!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Level</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{dashboardData?.stats.level}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </header>
            {/* Stats Overview */}
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                
                {/* XP Progress */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      Level {dashboardData?.stats.level}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Experience Points</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData?.stats.xp.toLocaleString()}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress to Level {(dashboardData?.stats.level || 0) + 1}</span>
                      <span>{Math.round(xpProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${xpProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Study Streak */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                      Hot Streak!
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Streak</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData?.stats.streak} Days</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep it up to reach 10 days!</p>
                </div>

                {/* Course Progress */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      {Math.round(completionRate)}%
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Completed</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {dashboardData?.stats.completedCourses}/{dashboardData?.stats.totalCourses}
                  </p>
                  <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Average Score */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                      Excellent
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData?.stats.averageScore}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">From {dashboardData?.stats.totalQuizzes} quizzes</p>
                </div>

              </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Course Progress */}
                <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Course Progress
                    </h2>
                    <Link 
                      href="/dashboard/courses"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="grid gap-4">
                    {dashboardData?.progress && Object.entries(dashboardData.progress).slice(0, 4).map(([course, percent]) => (
                      <div key={course} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white capitalize group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {course.replace('-', ' ')}
                          </h3>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {percent}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 group-hover:from-indigo-600 group-hover:to-purple-600"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Weekly Progress Chart */}
                <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      This Weeks Activity
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {dashboardData?.weeklyProgress.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                          {day.day}
                        </div>
                        <div className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <div 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ height: `${(day.hours / 4) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {day.hours}h
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Recent Activity */}
                <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Recent Activity
                    </h2>
                    <Link 
                      href="/dashboard/activity"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {dashboardData?.recentActivity?.slice(0, 5).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                      >
                        <div className="flex-shrink-0">
                          {getActivityIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.type === 'quiz' ? `Quiz: ${item.title}` : 
                             item.type === 'video' ? `Watched: ${item.title}` : 
                             `Completed: ${item.title}`}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                            {item.duration && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  {item.duration}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Upcoming Tasks */}
                <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Upcoming Tasks
                    </h2>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {dashboardData?.upcomingTasks?.map((task, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {task.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {task.dueDate}</span>
                          <span className="ml-auto capitalize">{task.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Achievements */}
                <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Recent Achievements
                    </h2>
                    <Link 
                      href="/dashboard/achievements"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {dashboardData?.achievements?.slice(0, 4).map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${getRarityColor(achievement.rarity)}`}
                      >
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}