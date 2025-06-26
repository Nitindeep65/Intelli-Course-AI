'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: { sender: 'user' | 'ai'; text: string; timestamp: string } = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMsg: { sender: 'user' | 'ai'; text: string; timestamp: string } = {
        sender: 'ai',
        text: data.response || 'No response from AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom on message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Greeting message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: { sender: 'user' | 'ai'; text: string; timestamp: string } = {
        sender: 'ai',
        text: "👋 Hi there! I'm your AI Tutor. Ask me anything about coding, AI, or tech!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([greeting]);
    }

    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-xl overflow-hidden animate-fade-in-up transition-all">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-indigo-600 text-white">
            <h3 className="font-semibold">AI Tutor</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat body */}
          <div
            ref={chatRef}
            className="h-72 overflow-y-auto p-3 space-y-3 text-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-indigo-300'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] mt-1 text-gray-400 dark:text-gray-500">{msg.timestamp}</span>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400 animate-pulse">AI is thinking...</div>}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask something..."
              className="flex-grow px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
