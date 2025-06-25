'use client';

import { useState } from 'react';

type QuizQuestion = {
  question: string;
  options: string[];
  answer?: string;
};

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [topic, setTopic] = useState('JavaScript basics');
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const generateQuiz = async () => {
    setLoading(true);
    setSubmitted(false);
    setScore(null);
    setSelectedAnswers({});
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server Error:', errorText);
        throw new Error('Failed to generate quiz');
      }

      const data = await res.json();
      setQuiz(data.quiz);
    } catch (err) {
      alert('Error generating quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (qIndex: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < quiz.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setSubmitted(true);

    const responses = quiz.map((q, i) => {
      const selected = selectedAnswers[i];
      return {
        question: q.question,
        selected,
        correct: q.answer,
        isCorrect: selected === q.answer,
      };
    });

    const scoreValue = responses.filter((r) => r.isCorrect).length;
    setScore(scoreValue);

    try {
      await fetch('/api/save-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          score: scoreValue,
          total: quiz.length,
          responses,
        }),
      });
    } catch (err) {
      console.error('Failed to save quiz result', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">AI Quiz Generator</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., JavaScript)"
        />
        <button
          onClick={generateQuiz}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>

      {quiz.length > 0 && (
        <div className="space-y-6">
          {quiz.map((q, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow p-4 rounded">
              <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
              <ul className="space-y-1">
                {q.options.map((opt, j) => {
                  const isSelected = selectedAnswers[i] === opt;
                  const isCorrect = q.answer === opt;
                  const isWrong = submitted && isSelected && !isCorrect;
                  const isRight = submitted && isSelected && isCorrect;

                  return (
                    <li key={j}>
                      <label
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition
                          ${isRight ? 'bg-green-100 text-green-800' : ''}
                          ${isWrong ? 'bg-red-100 text-red-800' : ''}
                          ${!isRight && !isWrong && isSelected ? 'bg-indigo-100' : ''}
                        `}
                      >
                        <input
                          type="radio"
                          name={`q${i}`}
                          value={opt}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() => handleAnswerChange(i, opt)}
                        />
                        {opt}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="mt-6 block w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-6 text-center text-green-600 font-medium">
              ✅ You scored {score}/{quiz.length}! Review your answers above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
