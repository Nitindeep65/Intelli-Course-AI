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

      {/* Full-page background with soft gradient */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <div className="w-full max-w-md bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-300">
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-8">
            Welcome to IntelliCourse
          </h2>

          {/* Google Button */}
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 mb-4"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}
