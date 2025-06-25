import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { dbConnect } from '@/lib/db';
import QuizResult from '@/models/QuizHistory';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const body = await req.json();

    const saved = await QuizResult.create({
      userEmail: session.user?.email,
      topic: body.topic,
      score: body.score,
      total: body.total,
      responses: body.responses,
    });

    return NextResponse.json({ success: true, result: saved });
  } catch (err) {
    console.error('[Save Quiz Error]', err);
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}
