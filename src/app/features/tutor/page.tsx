'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles } from 'lucide-react';

export default function TutorPage() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: { sender: 'user'; text: string } = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiMessage: { sender: 'ai'; text: string } = {
        sender: 'ai',
        text: data.response || 'Sorry, I couldn’t understand that.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] dark:from-[#121212] dark:via-[#1e1e2f] dark:to-[#000000] text-white px-4 py-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-fade-in">
              👩‍🏫 Meet Your AI Tutor
            </h1>
            <p className="mt-2 text-gray-300 text-lg max-w-xl mx-auto">
              Get instant help with coding, concepts, and career advice from your personal AI mentor.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-300 dark:border-gray-700 p-6 h-[500px] overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-xl text-sm shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-indigo-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-indigo-400 animate-pulse">AI is thinking...</div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your question about code, logic, career..."
              className="flex-grow px-4 py-3 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3 rounded-full font-semibold shadow-md transition duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
