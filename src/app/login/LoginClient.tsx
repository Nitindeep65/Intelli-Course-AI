'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <div className="w-full max-w-md bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6">
            Welcome to IntelliCourse
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm">
            Sign in to personalize your learning journey
          </p>

          {/* Google Button */}
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 mb-6"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Email Input */}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-200 shadow-md"
            >
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
