'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, MessageSquare, TrendingUp, Clock, BookOpen, Zap, Brain, Sparkles } from 'lucide-react';
import { AgentAvatar } from '@/components/agent-avatar';
import { AGENT_TYPES, type AgentType } from '@/lib/agent-types';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  role: string;
  agentType?: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  createdAt: string;
  messages: Message[];
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      if (!response?.ok) throw new Error('Failed to fetch sessions');
      const data = await response?.json();
      setSessions(data?.sessions ?? []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const agentStats = () => {
    const stats: Record<string, number> = {};
    sessions?.forEach(session => {
      session?.messages?.forEach(message => {
        if (message?.role === 'assistant' && message?.agentType) {
          stats[message.agentType] = (stats[message.agentType] ?? 0) + 1;
        }
      });
    });
    return stats;
  };

  const stats = agentStats();
  const totalQuestions = sessions?.reduce((acc, s) => acc + (s?.messages?.filter(m => m?.role === 'user')?.length ?? 0), 0) ?? 0;
  const totalResponses = sessions?.reduce((acc, s) => acc + (s?.messages?.filter(m => m?.role === 'assistant')?.length ?? 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Home className="w-5 h-5 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NeuroLearn
            </span>
          </Link>
          <Link
            href="/chat"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            New Chat
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your learning journey and agent performance</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-200">Total Sessions</h3>
            </div>
            <p className="text-3xl font-bold text-gray-100">{sessions?.length ?? 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-200">Questions Asked</h3>
            </div>
            <p className="text-3xl font-bold text-gray-100">{totalQuestions}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-200">Responses</h3>
            </div>
            <p className="text-3xl font-bold text-gray-100">{totalResponses}</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/teach">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/50 hover:border-purple-400 p-6 rounded-2xl transition-all cursor-pointer group">
                <Sparkles className="w-10 h-10 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-100 mb-1">AI Teacher</h3>
                <p className="text-sm text-gray-400">Adaptive lessons with visuals</p>
              </div>
            </Link>
            <Link href="/chat">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/50 hover:border-blue-400 p-6 rounded-2xl transition-all cursor-pointer group">
                <MessageSquare className="w-10 h-10 mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-100 mb-1">AI Chat</h3>
                <p className="text-sm text-gray-400">Talk to specialized tutors</p>
              </div>
            </Link>
            <Link href="/notes">
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/50 hover:border-green-400 p-6 rounded-2xl transition-all cursor-pointer group">
                <BookOpen className="w-10 h-10 mb-3 text-green-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Second Brain</h3>
                <p className="text-sm text-gray-400">Knowledge repository</p>
              </div>
            </Link>
            <Link href="/flashcards">
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/50 hover:border-amber-400 p-6 rounded-2xl transition-all cursor-pointer group">
                <Zap className="w-10 h-10 mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-100 mb-1">Flashcards</h3>
                <p className="text-sm text-gray-400">Spaced repetition</p>
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Agent Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[AGENT_TYPES.MATH, AGENT_TYPES.SCIENCE, AGENT_TYPES.HISTORY, AGENT_TYPES.PROGRAMMING].map((agentType) => (
              <div
                key={agentType}
                className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <AgentAvatar agentType={agentType as AgentType} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-200">
                      {agentType.charAt(0).toUpperCase() + agentType.slice(1)} Tutor
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-100">{stats[agentType] ?? 0}</p>
                <p className="text-xs text-gray-400">questions handled</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Recent Sessions</h2>
          {isLoading ? (
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 text-center">
              <p className="text-gray-400">Loading sessions...</p>
            </div>
          ) : sessions?.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 text-center">
              <p className="text-gray-400 mb-4">No sessions yet. Start chatting to see your history!</p>
              <Link
                href="/chat"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Start Your First Chat
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions?.slice(0, 10)?.map((session, index) => {
                const firstUserMessage = session?.messages?.find(m => m?.role === 'user');
                const messageCount = session?.messages?.length ?? 0;
                const date = new Date(session?.createdAt ?? Date.now());

                return (
                  <motion.div
                    key={session?.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium mb-1">
                          {firstUserMessage?.content?.slice(0, 100) ?? 'New conversation'}
                          {(firstUserMessage?.content?.length ?? 0) > 100 ? '...' : ''}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{date?.toLocaleDateString() ?? ''}</span>
                          <span>{messageCount} messages</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}