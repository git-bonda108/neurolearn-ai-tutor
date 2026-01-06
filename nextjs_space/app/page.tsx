"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Sparkles, BookOpen, CreditCard, GraduationCap, Cpu, Network, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { PERSONAS } from "@/lib/personas";
import { useState } from "react";

export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section with Persona Showcase */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/10 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="relative">
                  <Brain className="w-12 h-12 text-purple-400" />
                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    NeuroLearn
                  </h1>
                  <p className="text-sm text-gray-400">Second Brain · Adaptive Tutor</p>
                </div>
              </div>

              <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Context-Driven
                </span>
                <br />
                Personalized Education
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30">
                  <Network className="w-4 h-4" /> Multi-Agent Orchestration
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30">
                  <Cpu className="w-4 h-4" /> MCP Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-sm border border-pink-500/30">
                  <Zap className="w-4 h-4" /> Adaptive Learning
                </span>
              </div>

              <p className="mb-8 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Chat with legendary minds like Einstein, Newton, and Marie Curie. 
                Powered by 6-agent orchestration system with intelligent routing, 
                real-time web search, and personalized content generation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/chat"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-purple-500/50"
                >
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/teach"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-gray-800"
                >
                  <GraduationCap className="w-5 h-5" />
                  Try AI Lessons
                </Link>
              </div>
            </motion.div>

            {/* Right: Featured Persona */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Persona Avatar */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50 backdrop-blur-xl border border-white/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${PERSONAS[selectedPersona].color} flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-2xl overflow-hidden`}>
                    <Image
                      src={PERSONAS[selectedPersona].image}
                      alt={PERSONAS[selectedPersona].name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{PERSONAS[selectedPersona].name}</h3>
                  <p className="text-purple-300 mb-2 text-center">{PERSONAS[selectedPersona].title}</p>
                  <p className="text-sm text-gray-400 mb-4 text-center">{PERSONAS[selectedPersona].subject}</p>
                  <p className="text-xs text-gray-500 italic text-center max-w-xs">
                    &ldquo;{PERSONAS[selectedPersona].quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Persona Selector Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {PERSONAS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPersona(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedPersona ? "bg-purple-400 w-8" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Your Teachers */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Legendary Teachers
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Learn from history&apos;s greatest minds, brought to life with AI</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {PERSONAS.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group"
              >
                <Link href="/chat" className="block">
                  <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-purple-500 transition-all overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${persona.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${persona.color} flex items-center justify-center text-xl font-bold text-white mb-2 shadow-lg group-hover:scale-110 transition-transform overflow-hidden`}>
                        <Image
                          src={persona.image}
                          alt={persona.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-semibold text-center text-white">{persona.name.split(" ")[0]}</p>
                      <p className="text-[10px] text-gray-400 text-center">{persona.subject.split("&")[0].trim()}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Chat with any teacher now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Faster</h2>
            <p className="text-gray-400 text-lg">A complete learning system powered by AI</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="💬"
              title="Chat with Legends"
              description="Have conversations with Einstein, Newton, Curie, and more historical geniuses"
              link="/chat"
              gradient="from-blue-500 to-cyan-400"
            />
            <FeatureCard
              icon="🎓"
              title="AI-Generated Lessons"
              description="Personalized lessons with images, videos, quizzes, and real-world connections"
              link="/teach"
              gradient="from-purple-500 to-pink-400"
            />
            <FeatureCard
              icon="🧠"
              title="Second Brain Notes"
              description="Smart notes with AI-extracted concepts and automatic knowledge graphs"
              link="/notes"
              gradient="from-green-500 to-emerald-400"
            />
            <FeatureCard
              icon="🃏"
              title="Smart Flashcards"
              description="Spaced repetition system that adapts to your learning pace and memory"
              link="/flashcards"
              gradient="from-orange-500 to-amber-400"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Learn Like You Scroll</h2>
            <p className="text-gray-400 text-lg">Engaging, fast, and personalized learning experience</p>
          </motion.div>

          <div className="space-y-8">
            <StepCard
              number="1"
              title="Choose Your Teacher or Topic"
              description="Select a legendary persona or ask any question. Our AI automatically routes you to the best expert."
              gradient="from-purple-500 to-pink-500"
            />
            <StepCard
              number="2"
              title="Get Personalized Content"
              description="Receive AI-generated lessons with images, videos, mind maps, and real-world connections tailored to your level."
              gradient="from-blue-500 to-cyan-500"
            />
            <StepCard
              number="3"
              title="Build Your Second Brain"
              description="Save notes, generate flashcards, and review with spaced repetition. Your knowledge compounds over time."
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl sm:text-5xl font-bold">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Transform Your Learning?
              </span>
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Join thousands of students learning smarter with AI-powered tutors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 text-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-purple-500/50"
              >
                Start Learning Free
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-10 py-5 text-xl font-semibold text-white backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-gray-800"
              >
                <Brain className="w-6 h-6" />
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, link, gradient }: FeatureCardProps) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="group h-full relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all hover:border-purple-500/50"
      >
        <div className={`mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} text-3xl shadow-lg`}>
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-purple-400 text-sm group-hover:gap-3 transition-all">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  gradient: string;
}

function StepCard({ number, title, description, gradient }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start"
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-xl font-bold shadow-lg`}>
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}
