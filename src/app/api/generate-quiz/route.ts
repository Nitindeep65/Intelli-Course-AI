import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import genAI from '@/lib/gemini';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { topic } = await req.json();

  const prompt = `
Generate 10 multiple-choice quiz questions about "${topic}".
Each question should have 4 options and one correct answer.
Respond in **pure JSON** format (no markdown):

[
  {
    "question": "What is React?",
    "options": ["Library", "Framework", "Tool", "Database"],
    "answer": "Library"
  },
  ...
]
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

    const result = await model.generateContent([prompt]);
    const response = await result.response.text();

    const cleaned = response.replace(/```json|```/g, '').trim();

    const quiz = JSON.parse(cleaned);
    if (!Array.isArray(quiz)) throw new Error("Gemini did not return an array");

    return NextResponse.json({ quiz });
  } catch (err) {
    console.error("🔥 Gemini parsing failed:", err);
    return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
  }
}
