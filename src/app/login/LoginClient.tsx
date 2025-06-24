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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-xl p-10 max-w-md w-full border border-indigo-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 text-center mb-6">
            Login to IntelliCourse
          </h2>

          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full mb-4 flex items-center justify-center gap-3 py-2 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Image
    src="/google.svg"
    alt="Google"
    width={20} 
    height={20} 
    className="w-5 h-5"
  />
            Continue with Google
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 transition"
          >
            <Image src="/github.svg" width={20}
                      height={20}
                      className="w-5 h-5" alt={''} />
            Continue with GitHub
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
