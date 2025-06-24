'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardNavbar from '@/components/DashboardNavbar';
import Image from 'next/image';
import {
  Code,
  Cpu,
  Book,
  GraduationCap,
  Users,
  Database,
  ShieldCheck,
  Globe,
  Smartphone,
  FlaskConical,
  Star,
  Sparkles,
} from 'lucide-react';

interface Course {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  tags: string[];
  thumbnail: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const courses: Course[] = [
  {
    icon: <Code className="w-6 h-6 text-indigo-600" />,
    title: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript, React, and more.',
    link: '/dashboard/courses/frontend',
    tags: ['React', 'HTML', 'CSS'],
    thumbnail: '/courses/frontend.jpg',
    isPopular: true,
  },
  {
    icon: <Cpu className="w-6 h-6 text-green-600" />,
    title: 'Backend Development',
    description: 'Node.js, Express, MongoDB, PostgreSQL & APIs.',
    link: '/dashboard/courses/backend',
    tags: ['Node.js', 'APIs', 'Databases'],
    thumbnail: '/courses/backend.jpg',
  },
  {
    icon: <Book className="w-6 h-6 text-blue-500" />,
    title: 'Data Structures & Algorithms',
    description: 'Crack coding interviews with core problem-solving.',
    link: '/dashboard/courses/dsa',
    tags: ['DSA', 'Leetcode', 'Logic'],
    thumbnail: '/courses/dsa.jpg',
    isPopular: true,
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-pink-600" />,
    title: 'Fullstack Projects',
    description: 'Build full apps using React, Node, MongoDB.',
    link: '/dashboard/courses/fullstack',
    tags: ['MERN', 'Projects'],
    thumbnail: '/courses/fullstack.jpg',
    isNew: true,
  },
  {
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    title: 'Soft Skills & Interview Prep',
    description: 'Communication, HR rounds, resume prep.',
    link: '/dashboard/courses/softskills',
    tags: ['HR Prep', 'Communication'],
    thumbnail: '/courses/softskills.jpg',
  },
  {
    icon: <Database className="w-6 h-6 text-red-600" />,
    title: 'Data Engineering',
    description: 'Pipelines, Big Data, SQL, Airflow, ETL.',
    link: '/dashboard/courses/data-engineering',
    tags: ['ETL', 'Pipelines', 'Big Data'],
    thumbnail: '/courses/dataeng.jpg',
    isNew: true,
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
    title: 'Cybersecurity Basics',
    description: 'Learn fundamentals of online security.',
    link: '/dashboard/courses/cybersecurity',
    tags: ['Security', 'Encryption'],
    thumbnail: '/courses/cyber.jpg',
  },
  {
    icon: <Globe className="w-6 h-6 text-teal-600" />,
    title: 'Web3 & Blockchain',
    description: 'Ethereum, Smart Contracts, Wallets.',
    link: '/dashboard/courses/web3',
    tags: ['Solidity', 'Crypto'],
    thumbnail: '/courses/web3.jpg',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-orange-500" />,
    title: 'Mobile App Development',
    description: 'React Native and Flutter basics.',
    link: '/dashboard/courses/mobile',
    tags: ['Flutter', 'React Native'],
    thumbnail: '/courses/mobile.jpg',
  },
  {
    icon: <FlaskConical className="w-6 h-6 text-lime-500" />,
    title: 'Machine Learning Starter',
    description: 'Python, pandas, Scikit-Learn, basics of AI.',
    link: '/dashboard/courses/ml',
    tags: ['ML', 'AI', 'Python'],
    thumbnail: '/courses/ml.jpg',
  },
];

export default function CoursesPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = Array.from(new Set(courses.flatMap((c) => c.tags)));

  const filteredCourses = selectedTag
    ? courses.filter((course) => course.tags.includes(selectedTag))
    : courses;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />

      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-white mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Learn from industry-vetted content and build real-world skills across different domains.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedTag === null
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Link
              key={index}
              href={course.link}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="relative">
                <Image
  src={course.thumbnail}
  alt={course.title}
  width={400} // You can adjust this to your layout
  height={176} // Approx height for h-44 = 11rem * 16px = 176px
  className="w-full h-44 object-cover rounded-t-xl"
  style={{ objectFit: 'cover' }}
/>
                {course.isNew && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    <Sparkles className="inline w-3 h-3 mr-1" /> New
                  </span>
                )}
                {course.isPopular && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    <Star className="inline w-3 h-3 mr-1" /> Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                  {course.icon}
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{course.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {course.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs font-medium px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
