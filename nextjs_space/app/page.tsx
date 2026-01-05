import Link from 'next/link';
import { ArrowRight, Brain, Users, Zap, BookOpen, Code, FlaskConical, Clock } from 'lucide-react';
import { AGENT_CONFIGS, AGENT_TYPES } from '@/lib/agent-types';

export default function HomePage() {
  const agents = [
    AGENT_CONFIGS[AGENT_TYPES.MATH],
    AGENT_CONFIGS[AGENT_TYPES.SCIENCE],
    AGENT_CONFIGS[AGENT_TYPES.HISTORY],
    AGENT_CONFIGS[AGENT_TYPES.PROGRAMMING],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Brain className="w-12 h-12 text-purple-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              NeuroLearn
            </h1>
          </div>
          <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Experience the future of learning with our multi-agent AI tutoring system
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Get personalized help from specialized AI tutors in math, science, history, and programming
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            Try AI Tutor
            <ArrowRight className="w-5 h-5" />
          </Link>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Ask Your Question</h3>
              <p className="text-gray-400">
                Type your question in any subject. Our Manager Agent analyzes it to understand what you need.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Smart Routing</h3>
              <p className="text-gray-400">
                Your question is instantly routed to the most qualified specialist tutor for your topic.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Get Expert Help</h3>
              <p className="text-gray-400">
                Receive detailed, step-by-step explanations from AI tutors trained specifically in their subjects.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Meet Your AI Tutors
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents?.map((agent) => (
              <div
                key={agent?.type}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-opacity-50 transition-all hover:shadow-lg hover:scale-105"
                style={{
                  borderColor: agent?.color?.includes('purple') ? '#a855f7' :
                              agent?.color?.includes('blue') ? '#3b82f6' :
                              agent?.color?.includes('green') ? '#10b981' :
                              '#f59e0b',
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${agent?.color ?? 'from-gray-400 to-gray-600'} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {agent?.icon ?? '🤖'}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-100">
                  {agent?.name ?? 'Tutor'}
                </h3>
                <p className="text-gray-400 text-center text-sm">
                  {agent?.description ?? 'AI Tutor'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <BookOpen className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Multi-Agent System</h3>
              <p className="text-gray-400">
                Four specialized AI tutors work together, each expert in their domain, to provide the best possible help.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <Code className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Dual-Model Support</h3>
              <p className="text-gray-400">
                Choose between GPT-4 and Claude 3.5 Sonnet for responses, or compare both side-by-side.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <FlaskConical className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Web Search Integration</h3>
              <p className="text-gray-400">
                Agents automatically search the web for current information, ensuring up-to-date answers with sources.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <Clock className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Real-Time Streaming</h3>
              <p className="text-gray-400">
                See responses appear in real-time with smooth streaming, just like chatting with a human tutor.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/50">
            <h2 className="text-3xl font-bold mb-4 text-gray-100">
              Ready to Learn Smarter?
            </h2>
            <p className="text-gray-300 mb-6">
              Join students who are already experiencing the power of multi-agent AI tutoring
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}