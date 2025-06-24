'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-24 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400">
          Welcome to <span className="text-black dark:text-white">IntelliCourse</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg text-center max-w-xl">
          Your personalized AI-powered learning platform for mastering software development.
        </p>
      </main>
    </>
  );
}
