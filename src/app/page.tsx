'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/bg1.jpg')",
        }}
      >

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-300">
            Welcome to <span className="text-white">IntelliCourse</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Your personalized AI-powered learning platform for mastering software development.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
