'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-16 text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl animate-fade-in-up">
         <h1
  className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 
  animate-fade-in-up motion-safe:animate-fade-in-up duration-1000"
>
  Welcome to IntelliCourse
</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Your personalized AI-powered platform to master software development
            through intelligent guidance, quizzes, and real-time mentorship.
          </p>
          <div className="mt-8">
            <a
              href="/features"
              className="inline-block px-6 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute bottom-12 left-6 w-24 h-24 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-25 animate-pulse" />
      </main>

      <Footer />
    </>
  );
}