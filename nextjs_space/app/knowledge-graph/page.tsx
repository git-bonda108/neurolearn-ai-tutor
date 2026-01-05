'use client';

import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Brain, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Concept {
  id: string;
  name: string;
  description: string | null;
  subject: string | null;
}

const SUBJECT_COLORS: Record<string, string> = {
  Math: '#3b82f6',
  Science: '#10b981',
  History: '#f59e0b',
  Programming: '#8b5cf6',
};

export default function KnowledgeGraphPage() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConcepts();
  }, []);

  const fetchConcepts = async () => {
    try {
      const response = await fetch('/api/notes');
      const notes = await response.json();

      // Extract all concepts
      const allConcepts: Concept[] = [];
      notes.forEach((note: any) => {
        allConcepts.push(...note.concepts);
      });

      setConcepts(allConcepts);
      buildGraph(allConcepts);
    } catch (error) {
      console.error('Failed to fetch concepts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildGraph = (concepts: Concept[]) => {
    // Create nodes
    const newNodes: Node[] = concepts.map((concept, index) => {
      const angle = (index / concepts.length) * 2 * Math.PI;
      const radius = 300;
      const x = Math.cos(angle) * radius + 500;
      const y = Math.sin(angle) * radius + 300;

      return {
        id: concept.id,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div className="text-center p-2">
              <div className="font-semibold text-sm">{concept.name}</div>
              {concept.subject && (
                <div className="text-xs text-gray-500 mt-1">{concept.subject}</div>
              )}
            </div>
          ),
        },
        style: {
          background: concept.subject
            ? SUBJECT_COLORS[concept.subject] || '#6b7280'
            : '#6b7280',
          color: '#fff',
          border: '2px solid #fff',
          borderRadius: '12px',
          padding: '10px',
          minWidth: '150px',
        },
      };
    });

    // Create edges based on subject similarity
    const newEdges: Edge[] = [];
    for (let i = 0; i < concepts.length; i++) {
      for (let j = i + 1; j < concepts.length; j++) {
        if (concepts[i].subject === concepts[j].subject) {
          newEdges.push({
            id: `${concepts[i].id}-${concepts[j].id}`,
            source: concepts[i].id,
            target: concepts[j].id,
            animated: true,
            style: { stroke: '#888', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#888',
            },
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Knowledge Graph
              </h1>
              <p className="text-gray-400">
                Visualize connections between concepts in your second brain
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-indigo-500/50 text-indigo-400">
                <Brain className="w-4 h-4 mr-2" />
                {concepts.length} Concepts
              </Badge>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.entries(SUBJECT_COLORS).map(([subject, color]) => (
            <Badge key={subject} variant="outline" style={{ borderColor: color }}>
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              {subject}
            </Badge>
          ))}
        </div>

        {/* Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50"
          style={{ height: '70vh' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Sparkles className="w-8 h-8 animate-spin text-indigo-400" />
              <span className="ml-2 text-gray-400">Building your knowledge graph...</span>
            </div>
          ) : concepts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Brain className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-4">
                No concepts yet. Create notes to build your knowledge graph!
              </p>
              <Link href="/notes">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  Create Notes
                </Button>
              </Link>
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              attributionPosition="bottom-left"
            >
              <Background />
              <Controls />
              <MiniMap
                nodeColor={(node) => node.style?.background as string || '#6b7280'}
                className="bg-gray-800/50 border-gray-700"
              />
            </ReactFlow>
          )}
        </motion.div>

        {/* Instructions */}
        <div className="mt-6 bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">How to use:</h3>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li>Drag nodes to rearrange them</li>
            <li>Scroll to zoom in/out</li>
            <li>Connected concepts share the same subject</li>
            <li>Create more notes to expand your knowledge graph!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
