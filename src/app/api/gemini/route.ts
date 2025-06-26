import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is missing' }, { status: 400 });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await geminiRes.json();

    console.log('Gemini API response:', JSON.stringify(data, null, 2));

    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      response: aiResponse ?? 'No response from AI',
    });

  } catch (err) {
    console.error('Gemini API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
