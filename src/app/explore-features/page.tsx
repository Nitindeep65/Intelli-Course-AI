'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {BookOpen, Trophy, Zap, Bot } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
    title: 'AI Quiz Generator',
    description: 'Create personalized quizzes tailored to your learning style and pace.',
  },
  {
    icon: <Bot className="w-8 h-8 text-purple-500" />,
    title: 'AI Tutor Chat',
    description: 'Ask questions and get real-time assistance from our AI Tutor.',
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: 'Live Sessions',
    description: 'Join expert-led live sessions and workshops to boost your skills.',
  },
  {
    icon: <Trophy className="w-8 h-8 text-pink-500" />,
    title: 'Achievements',
    description: 'Track your learning milestones and earn badges as you progress.',
  },
];

export default function ExploreFeaturesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 md:px-12 py-20 text-white">
        {/* Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 animate-fade-in-up">
            Explore Our Features
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            Designed to accelerate your software development learning experience with intelligence and creativity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/10 hover:shadow-xl transition-all duration-300 group hover:bg-white/20"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-100 mb-2 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
