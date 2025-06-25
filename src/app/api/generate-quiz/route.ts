// app/api/generate-quiz/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import genAI from '@/lib/gemini';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { topic } = await req.json();

  const prompt = `
Generate 5 multiple-choice quiz questions about "${topic}".
Each question should have 4 options and one correct answer.
Return only the JSON array with no explanation or formatting:
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
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro-latest' });
    const chat = model.startChat();

    const result = await chat.sendMessage(prompt);
    const raw = result.response.text();

    console.log('🧠 Gemini 1.5 raw response:', raw);

    const match = raw.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (!match) throw new Error('No valid JSON array found in response');

    const quiz = JSON.parse(match[0]);
    if (!Array.isArray(quiz)) throw new Error('Invalid quiz format');

    return NextResponse.json({ quiz });
  } catch (err) {
    console.error('❌ Gemini 1.5 Quiz Error:', err);
    return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
  }
}
