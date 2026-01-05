// Teaching Agent System - Multi-Agent Orchestration
// Implements 6 specialized agents for adaptive lesson generation

import OpenAI from 'openai';
import { searchWeb } from './tavily-search';
import { generateEducationalImage } from './image-generator';
import { ContextPack, GradeLevelContent } from './context-packs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StudentProfile {
  grade: string;
  learningStyle: string;
  interests: string[];
  name?: string;
}

export interface LessonSection {
  title: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface VideoResult {
  title: string;
  url: string;
  source: string;
  thumbnail?: string;
}

export interface RealWorldConnection {
  title: string;
  summary: string;
  url?: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: 'main' | 'concept' | 'detail';
}

export interface MindMapEdge {
  from: string;
  to: string;
  label?: string;
}

export interface GeneratedLesson {
  topic: string;
  gradeLevel: string;
  sections: LessonSection[];
  videos: VideoResult[];
  realWorld: RealWorldConnection[];
  quiz: QuizQuestion[];
  mindMap: {
    nodes: MindMapNode[];
    edges: MindMapEdge[];
  };
  nextTopics: string[];
  estimatedTime: number;
}

// Agent 1: Context Analyzer
export async function analyzeContext(
  contextPack: ContextPack,
  student: StudentProfile
): Promise<{
  gradeContent: GradeLevelContent;
  adaptations: string[];
  missingPrereqs: string[];
}> {
  const grade = parseInt(student.grade);
  let rangeKey = '8-9';
  
  if (grade <= 7) rangeKey = '6-7';
  else if (grade <= 9) rangeKey = '8-9';
  else rangeKey = '10-12';
  
  const gradeContent = contextPack.gradeLevels[rangeKey];
  
  // Analyze learning style adaptations
  const adaptations: string[] = [];
  if (student.learningStyle === 'visual') {
    adaptations.push('Include more diagrams and visual representations');
    adaptations.push('Use color-coded concepts');
  } else if (student.learningStyle === 'auditory') {
    adaptations.push('Provide video content with narration');
    adaptations.push('Include verbal explanations and analogies');
  } else if (student.learningStyle === 'kinesthetic') {
    adaptations.push('Suggest hands-on activities');
    adaptations.push('Include interactive demonstrations');
  }
  
  return {
    gradeContent,
    adaptations,
    missingPrereqs: [], // Could check student's learning history
  };
}

// Agent 2: Content Generator
export async function generateLessonContent(
  contextPack: ContextPack,
  gradeContent: GradeLevelContent,
  student: StudentProfile,
  adaptations: string[]
): Promise<LessonSection[]> {
  const prompt = `You are an expert biology teacher creating a lesson on "${contextPack.topic}" for a grade ${student.grade} student.

Grade-appropriate explanation: ${gradeContent.explanation}

Key concepts to cover: ${gradeContent.concepts.join(', ')}

Teaching strategies: ${gradeContent.teachingStrategies.join(', ')}

Adaptations for ${student.learningStyle} learner: ${adaptations.join(', ')}

Create a comprehensive lesson with 4-5 sections. Each section should:
1. Have a clear title
2. Include engaging, grade-appropriate content (2-3 paragraphs)
3. Use analogies and real-world examples
4. Build on previous sections
5. Suggest what visual would help (will be generated separately)

Format as JSON array:
[
  {
    "title": "Section Title",
    "content": "Detailed content...",
    "visualDescription": "What image would help explain this"
  }
]

Make it engaging, clear, and memorable!`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '[]';
    const sections = JSON.parse(content);
    
    return sections.map((s: any) => ({
      title: s.title,
      content: s.content,
      imageUrl: undefined, // Will be filled by Visual Designer
      imageCaption: s.visualDescription,
    }));
  } catch (error) {
    console.error('Content generation error:', error);
    // Fallback content
    return [{
      title: contextPack.topic,
      content: gradeContent.explanation,
      imageCaption: `Diagram showing ${contextPack.topic}`,
    }];
  }
}

// Agent 3: Visual Designer
export async function generateVisuals(
  sections: LessonSection[],
  contextPack: ContextPack
): Promise<LessonSection[]> {
  const updatedSections = [...sections];
  
  // Generate images for first 3 sections (to stay within limits)
  for (let i = 0; i < Math.min(3, sections.length); i++) {
    const section = sections[i];
    if (section.imageCaption) {
      try {
        const imageUrl = await generateEducationalImage(
          section.imageCaption,
          contextPack.subject,
          'illustration'
        );
        if (imageUrl) {
          updatedSections[i] = {
            ...section,
            imageUrl,
          };
        }
      } catch (error) {
        console.error(`Failed to generate image for section ${i}:`, error);
      }
    }
  }
  
  return updatedSections;
}

// Agent 4: Video Curator
export async function curateVideos(
  topic: string,
  gradeLevel: string
): Promise<VideoResult[]> {
  try {
    const searchQuery = `${topic} educational video for grade ${gradeLevel} site:youtube.com`;
    const results = await searchWeb(searchQuery);
    
    const videos: VideoResult[] = results
      .filter(r => r.url.includes('youtube.com') || r.url.includes('youtu.be'))
      .slice(0, 3)
      .map(r => ({
        title: r.title,
        url: r.url,
        source: 'YouTube',
        thumbnail: r.url, // Could extract thumbnail
      }));
    
    return videos;
  } catch (error) {
    console.error('Video curation error:', error);
    return [];
  }
}

// Agent 5: Real-World Connector
export async function connectRealWorld(
  topic: string,
  realWorldLinks: string[]
): Promise<RealWorldConnection[]> {
  const connections: RealWorldConnection[] = [];
  
  // Search for recent news/applications
  for (const link of realWorldLinks.slice(0, 3)) {
    try {
      const results = await searchWeb(`${link} recent news`);
      if (results.length > 0) {
        connections.push({
          title: link,
          summary: results[0].content,
          url: results[0].url,
        });
      }
    } catch (error) {
      console.error('Real-world connection error:', error);
    }
  }
  
  return connections;
}

// Agent 6: Assessment Builder
export async function buildAssessment(
  contextPack: ContextPack,
  gradeContent: GradeLevelContent
): Promise<{
  quiz: QuizQuestion[];
  mindMap: { nodes: MindMapNode[]; edges: MindMapEdge[] };
}> {
  // Generate quiz questions
  const quizPrompt = `Create 5 multiple-choice quiz questions for grade ${gradeContent.difficulty} students about "${contextPack.topic}".

Concepts to test: ${gradeContent.concepts.join(', ')}

Format as JSON:
[
  {
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correct": 0,
    "explanation": "Why this is correct"
  }
]

Make questions engaging and test real understanding!`;

  let quiz: QuizQuestion[] = [];
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: quizPrompt }],
      temperature: 0.7,
    });
    
    const content = response.choices[0]?.message?.content || '[]';
    quiz = JSON.parse(content);
  } catch (error) {
    console.error('Quiz generation error:', error);
  }
  
  // Generate mind map
  const nodes: MindMapNode[] = [
    { id: 'main', label: contextPack.topic, type: 'main' },
  ];
  
  gradeContent.concepts.forEach((concept, i) => {
    nodes.push({
      id: `concept-${i}`,
      label: concept,
      type: 'concept',
    });
  });
  
  const edges: MindMapEdge[] = gradeContent.concepts.map((_, i) => ({
    from: 'main',
    to: `concept-${i}`,
  }));
  
  return { quiz, mindMap: { nodes, edges } };
}

// Main Teaching Orchestrator
export async function generateAdaptiveLesson(
  contextPack: ContextPack,
  student: StudentProfile
): Promise<GeneratedLesson> {
  console.log(`🎓 Teaching Orchestrator: Generating lesson on "${contextPack.topic}" for Grade ${student.grade}`);
  
  // Agent 1: Analyze Context
  console.log('📊 Agent 1: Analyzing context...');
  const { gradeContent, adaptations } = await analyzeContext(contextPack, student);
  
  // Agent 2: Generate Content
  console.log('✍️ Agent 2: Generating lesson content...');
  const sections = await generateLessonContent(contextPack, gradeContent, student, adaptations);
  
  // Agent 3: Generate Visuals
  console.log('🎨 Agent 3: Creating visual materials...');
  const sectionsWithImages = await generateVisuals(sections, contextPack);
  
  // Agent 4: Curate Videos
  console.log('🎥 Agent 4: Curating educational videos...');
  const videos = await curateVideos(contextPack.topic, student.grade);
  
  // Agent 5: Connect Real World
  console.log('🌍 Agent 5: Finding real-world connections...');
  const realWorld = await connectRealWorld(contextPack.topic, contextPack.realWorldLinks);
  
  // Agent 6: Build Assessment
  console.log('📝 Agent 6: Building assessment...');
  const { quiz, mindMap } = await buildAssessment(contextPack, gradeContent);
  
  console.log('✅ Lesson generation complete!');
  
  return {
    topic: contextPack.topic,
    gradeLevel: student.grade,
    sections: sectionsWithImages,
    videos,
    realWorld,
    quiz,
    mindMap,
    nextTopics: contextPack.relatedTopics,
    estimatedTime: sections.length * 8, // ~8 min per section
  };
}
