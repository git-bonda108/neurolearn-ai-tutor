'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Home, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { MessageBubble } from '@/components/message-bubble';
import { AgentIndicator } from '@/components/agent-indicator';
import { ModelToggle } from '@/components/model-toggle';
import { MODEL_TYPES, type ModelType, type AgentType } from '@/lib/agent-types';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentType?: AgentType;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<{ type: AgentType; name: string } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [modelType, setModelType] = useState<ModelType>(MODEL_TYPES.OPENAI);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentAgent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    if (!input?.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...(prev ?? []), userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...(messages ?? []), userMessage].map(m => ({
            role: m?.role,
            content: m?.content,
          })),
          sessionId,
          modelType,
        }),
      });

      if (!response?.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response?.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let assistantId = Date.now().toString();
      let agentType: AgentType | undefined;

      while (true) {
        const { done, value } = await reader?.read() ?? { done: true, value: undefined };
        if (done) break;

        const chunk = decoder?.decode(value ?? new Uint8Array(), { stream: true });
        const lines = chunk?.split('\n') ?? [];

        for (const line of lines) {
          const trimmedLine = line?.trim() ?? '';
          if (trimmedLine?.startsWith('data: ')) {
            const data = trimmedLine.slice(6);
            try {
              const parsed = JSON.parse(data);

              if (parsed?.type === 'start') {
                if (!sessionId) {
                  setSessionId(parsed?.sessionId ?? null);
                }
                agentType = parsed?.agentType;
                setCurrentAgent({
                  type: parsed?.agentType,
                  name: parsed?.agentName ?? '',
                });
              } else if (parsed?.type === 'content') {
                assistantMessage += parsed?.content ?? '';
                setMessages((prev) => {
                  const existing = prev?.find(m => m?.id === assistantId);
                  if (existing) {
                    return prev?.map(m =>
                      m?.id === assistantId
                        ? { ...m, content: assistantMessage }
                        : m
                    ) ?? [];
                  }
                  return [
                    ...(prev ?? []),
                    {
                      id: assistantId,
                      role: 'assistant' as const,
                      content: assistantMessage,
                      agentType,
                    },
                  ];
                });
              } else if (parsed?.type === 'end') {
                setCurrentAgent(null);
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...(prev ?? []),
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Home className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NeuroLearn
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModelToggle currentModel={modelType} onModelChange={setModelType} />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-gray-300"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages?.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="text-6xl">🧠</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-100 mb-4">
                  Welcome to NeuroLearn AI Tutor!
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Ask any question about math, science, history, or programming. Our AI tutors are ready to help!
                </p>
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() => setInput('Explain the Pythagorean theorem')}
                    className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 hover:border-blue-500 transition text-left"
                  >
                    <p className="text-sm text-gray-300">Explain the Pythagorean theorem</p>
                  </button>
                  <button
                    onClick={() => setInput('What is photosynthesis?')}
                    className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 hover:border-green-500 transition text-left"
                  >
                    <p className="text-sm text-gray-300">What is photosynthesis?</p>
                  </button>
                  <button
                    onClick={() => setInput('Tell me about the American Revolution')}
                    className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 hover:border-amber-500 transition text-left"
                  >
                    <p className="text-sm text-gray-300">Tell me about the American Revolution</p>
                  </button>
                  <button
                    onClick={() => setInput('How do I write a function in Python?')}
                    className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 hover:border-purple-500 transition text-left"
                  >
                    <p className="text-sm text-gray-300">How do I write a function in Python?</p>
                  </button>
                </div>
              </motion.div>
            )}

            {messages?.map((message, index) => (
              <MessageBubble
                key={message?.id}
                content={message?.content ?? ''}
                role={message?.role}
                agentType={message?.agentType}
                index={index}
              />
            ))}

            {currentAgent && (
              <div className="mb-4">
                <AgentIndicator
                  agentType={currentAgent?.type}
                  agentName={currentAgent?.name}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e?.target?.value ?? '')}
                placeholder="Ask your question..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}