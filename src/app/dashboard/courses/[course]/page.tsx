'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, Rocket, Zap, BookOpenCheck, Users, Timer, ListChecks } from 'lucide-react';

interface CourseData {
  overview: string;
  objectives: string[];
  skills: string[];
  curriculum: {
    moduleTitle: string;
    lessons: string[];
  }[];
  duration: string;
  targetAudience: string[];
  assessment: string[];
}

export default function CoursePage() {
  const params = useParams();
  const course = params?.course as string;

  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/course-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: course }),
        });

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching course content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (course) fetchContent();
  }, [course]);

  if (!course || loading) return <div className="p-10 text-center">Loading course details...</div>;
  if (!data) return <div className="p-10 text-center text-red-500">Failed to load course data.</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold capitalize text-indigo-700 dark:text-indigo-400">
        {course.replace(/-/g, ' ')}
      </h1>

      {/* Overview */}
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {data.overview}
      </p>

      {/* Learning Objectives */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Rocket className="w-5 h-5" /> Learning Objectives
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.objectives.map((obj, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex items-start gap-3"
            >
              <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
              <p className="text-sm text-gray-800 dark:text-gray-200">{obj}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Zap className="w-5 h-5" /> Skills You’ll Gain
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      {data.curriculum && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpenCheck className="w-5 h-5" /> Course Curriculum
          </h2>
          <div className="mt-6 space-y-6">
            {data.curriculum.map((module, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                  {module.moduleTitle}
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {module.lessons.map((lesson, idx) => (
                    <li key={idx}>{lesson}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Duration */}
      {data.duration && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Timer className="w-5 h-5" /> Course Duration
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{data.duration}</p>
        </section>
      )}

      {/* Target Audience */}
      {data.targetAudience && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Users className="w-5 h-5" /> Who Should Take This Course?
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {data.targetAudience.map((audience, i) => (
              <li key={i}>{audience}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Assessments */}
      {data.assessment && (
        <section className="mt-10 mb-16">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ListChecks className="w-5 h-5" /> Assessments
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {data.assessment.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}