import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { dbConnect } from '@/lib/db';
import QuizResult from '@/models/QuizHistory';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const email = session.user.email;

    // Fetch quiz results
    const quizResults = await QuizResult.find({ userEmail: email }).sort({ createdAt: -1 });

    // Simulate course progress (you can fetch from a real CourseProgress model)
    const progress = {
      'javascript-basics': 70,
      'react-hooks': 50,
      'node-fundamentals': 90,
    };

    // Format recent activity (quizzes only for now)
    const recentActivity = quizResults.slice(0, 5).map((q) => ({
      type: 'quiz',
      title: q.topic,
      date: new Date(q.createdAt).toLocaleDateString(),
    }));

    return NextResponse.json({ progress, recentActivity });
  } catch (err) {
    console.error('Dashboard Error:', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
