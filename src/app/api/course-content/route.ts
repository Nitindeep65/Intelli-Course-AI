import { NextResponse } from 'next/server';
import genAI from '@/lib/gemini';

export async function POST(req: Request) {
  const { title } = await req.json();

  const prompt = `
Generate a detailed course content structure for a course titled "${title}".

Respond ONLY with a raw JSON object in this format (no explanation, no markdown):

{
  "overview": "Brief overview of the course...",
  "objectives": [
    "Learning objective 1",
    "Learning objective 2",
    "Learning objective 3"
  ],
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],
  "curriculum": [
    {
      "moduleTitle": "Module 1 Title",
      "lessons": [
        "Lesson 1.1 Title",
        "Lesson 1.2 Title",
        "Lesson 1.3 Title"
      ]
    },
    {
      "moduleTitle": "Module 2 Title",
      "lessons": [
        "Lesson 2.1 Title",
        "Lesson 2.2 Title"
      ]
    }
  ],
  "duration": "Estimated total time to complete (e.g., '4 weeks', '10 hours')",
  "targetAudience": [
    "Audience type 1",
    "Audience type 2"
  ],
  "assessment": [
    "Quiz after each module",
    "Capstone project",
    "Final exam"
  ]
}

`;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  try {
    const result = await model.generateContent(prompt);
    const raw = await result.response.text();

    console.log('🧠 Gemini Raw Output:', raw); // Helpful for debugging

    // Remove markdown formatting if present
    const cleaned = raw.replace(/```json|```/g, '').trim();

    // Extract JSON string boundaries safely
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('JSON block not found in Gemini response');
    }

    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // Parse and validate the JSON
    const content = JSON.parse(jsonString);

    if (
      !content.overview ||
      !Array.isArray(content.objectives) ||
      !Array.isArray(content.skills)
    ) {
      throw new Error('Invalid course structure received');
    }

    return NextResponse.json(content);
  } catch (err) {
    console.error('❌ AI Course Content Error:', err);
    return NextResponse.json({ error: 'Failed to generate course content' }, { status: 500 });
  }
}
