"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface CanvasNode {
  id: string;
  label: string;
  type: "image" | "vector";
  content: string;
  x: number;
  y: number;
}

// Preset templates for quick testing
const QUICK_PRESETS = [
  {
    name: "Blob Vector",
    type: "vector" as const,
    label: "Brand Identity Concept",
    content:
      "M 50,100 C 45,50 100,30 155,40 C 220,50 265,75 255,120 C 245,170 190,180 135,170 C 80,160 55,140 50,100 Z",
  },
  {
    name: "Pill Vector",
    type: "vector" as const,
    label: "PKKMB 2026 Manual",
    content:
      "M 65,20 L 215,20 C 245,20 265,40 265,65 C 265,90 245,110 215,110 L 65,110 C 35,110 15,90 15,65 C 15,40 35,20 65,20 Z",
  },
  {
    name: "Starburst Vector",
    type: "vector" as const,
    label: "GemasTIK XVIII Finalist",
    content:
      "M 120.0 25.0 L 138.8 48.0 L 166.5 37.5 L 171.3 66.8 L 200.5 71.6 L 190.0 99.3 L 213.0 118.1 L 190.0 136.9 L 200.5 164.6 L 171.3 169.4 L 166.5 198.7 L 138.8 188.2 L 120.0 211.2 L 101.2 188.2 L 73.5 198.7 L 68.7 169.4 L 39.5 164.6 L 50.0 136.9 L 27.0 118.1 L 50.0 99.3 L 39.5 71.6 L 68.7 66.8 L 73.5 37.5 L 101.2 48.0 Z",
  },
  {
    name: "Sample Image",
    type: "image" as const,
    label: "Editorial Cover Art",
    content:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  },
];

export default function VisualEditorPage() {
  // Start with an empty array as specified
  const [nodes, setNodes] = useState<CanvasNode[]>([]);

  // Form State
  const [formLabel, setFormLabel] = useState("");
  const [formType, setFormType] = useState<"image" | "vector">("vector");
  const [formContent, setFormContent] = useState("");

  // Editor Interaction State
  const [copied, setCopied] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add new Node to Canvas
  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim() || !formContent.trim()) return;

    const newNode: CanvasNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      label: formLabel.trim(),
      type: formType,
      content: formContent.trim(),
      // Initial default coordinates as specified
      x: 100 + (nodes.length % 5) * 30,
      y: 100 + (nodes.length % 5) * 30,
    };

    setNodes((prev) => [...prev, newNode]);
    setActiveNodeId(newNode.id);

    // Clear form
    setFormLabel("");
    setFormContent("");
  };

  // Remove a node
  const handleDeleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((prev) => prev.filter((node) => node.id !== id));
    if (activeNodeId === id) setActiveNodeId(null);
  };

  // Populate form with preset
  const handleApplyPreset = (preset: (typeof QUICK_PRESETS)[0]) => {
    setFormType(preset.type);
    setFormLabel(preset.label);
    setFormContent(preset.content);
  };

  // Copy JSON to clipboard
  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(nodes, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON to clipboard", err);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden select-none font-sans bg-[#FAF9F6]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* THE CODE EXPORTER & NODE CREATOR PANEL (Sidebar)              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <aside className="w-96 min-w-[24rem] h-full bg-slate-950 text-slate-200 border-r border-slate-800 flex flex-col z-30 shadow-2xl">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-sm font-semibold tracking-wider text-slate-100 uppercase">
              Canvas Authoring Tool
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 transition-colors"
          >
            Public Site →
          </Link>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/70">
          {/* Copy Button & Summary Bar */}
          <div className="p-5 flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className={`flex-1 py-2.5 px-4 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-500/20 shadow-md"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 shadow-md active:scale-[0.98]"
              }`}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>JSON Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>Copy JSON ({nodes.length} nodes)</span>
                </>
              )}
            </button>

            {nodes.length > 0 && (
              <button
                onClick={() => setNodes([])}
                title="Clear all nodes"
                className="py-2.5 px-3 rounded-md bg-slate-900 hover:bg-rose-950/80 hover:text-rose-400 text-slate-400 text-xs transition-colors border border-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Node Creator Form */}
          <div className="p-5">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Create Node</span>
              <span className="text-[10px] text-slate-500 font-normal lowercase">
                dynamic asset
              </span>
            </h2>

            {/* Quick Preset Buttons */}
            <div className="mb-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1.5 font-medium">
                Quick Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="px-2 py-1 text-[11px] rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800/80 text-left truncate transition-colors"
                  >
                    + {p.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddNode} className="space-y-3.5">
              {/* Asset Type Select */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Asset Type
                </label>
                <select
                  value={formType}
                  onChange={(e) =>
                    setFormType(e.target.value as "image" | "vector")
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="vector">Vector (SVG Path)</option>
                  <option value="image">Image (URL)</option>
                </select>
              </div>

              {/* Label Input */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GemasTIK XVIII Finalist"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Content Input (URL or SVG Path) */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Content ({formType === "image" ? "Image URL" : "Raw SVG Path 'd'"})
                </label>
                <textarea
                  required
                  rows={formType === "vector" ? 3 : 2}
                  placeholder={
                    formType === "image"
                      ? "https://example.com/cover.jpg"
                      : "M 50,100 C 45,50 100,30 155,40..."
                  }
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-slate-100 hover:bg-white text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <span>Add to Canvas</span>
                <span className="text-slate-400 font-normal">→</span>
              </button>
            </form>
          </div>

          {/* Active Nodes List */}
          {nodes.length > 0 && (
            <div className="p-5">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Canvas Items</span>
                <span className="text-[11px] font-mono text-slate-500">
                  {nodes.length}
                </span>
              </h2>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded cursor-pointer transition-colors group ${
                      activeNodeId === node.id
                        ? "bg-indigo-950/80 text-indigo-300 border border-indigo-700/60"
                        : "bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-medium ${
                          node.type === "image"
                            ? "bg-amber-950 text-amber-300 border border-amber-800/60"
                            : "bg-cyan-950 text-cyan-300 border border-cyan-800/60"
                        }`}
                      >
                        {node.type}
                      </span>
                      <span className="truncate max-w-[130px] font-medium">
                        {node.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500">
                        {node.x}, {node.y}
                      </span>
                      <button
                        onClick={(e) => handleDeleteNode(node.id, e)}
                        title="Remove node"
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Code Exporter Panel */}
          <div className="p-5 bg-[#090d16] font-mono text-xs">
            <div className="flex items-center justify-between pb-2 text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800/80 mb-3">
              <span>Live JSON Exporter</span>
              <span>{nodes.length} objects</span>
            </div>
            <pre className="text-emerald-400 leading-relaxed whitespace-pre font-mono text-[11px] overflow-x-auto max-h-64">
              {JSON.stringify(nodes, null, 2)}
            </pre>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-900 bg-slate-950 text-[11px] text-slate-500 flex justify-between items-center">
          <span>dragElastic: false</span>
          <span>bg-[#FAF9F6] Desk</span>
        </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* THE EDITOR CANVAS (Dotted Desk Background bg-[#FAF9F6])       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <main
        ref={canvasRef}
        className="flex-1 h-screen relative overflow-hidden bg-[#FAF9F6]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cbd5e1 1.25px, transparent 1.25px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* Canvas Corner Watermark */}
        <div className="absolute top-6 right-8 text-xs font-mono text-slate-400 pointer-events-none select-none flex items-center gap-3">
          <span>CANVAS DESK</span>
          <span>•</span>
          <span>bg-[#FAF9F6]</span>
        </div>

        {/* Empty State Prompt */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center px-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 mb-4 bg-white/50 backdrop-blur-sm">
              <svg
                className="w-8 h-8 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-slate-700 tracking-tight">
              Your canvas is currently empty
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Use the sidebar on the left to add your first Image or Vector node,
              or click one of the quick presets to test immediately.
            </p>
          </div>
        )}

        {/* Dynamic Nodes Mapping */}
        {nodes.map((node) => {
          const isActive = activeNodeId === node.id;

          return (
            <motion.div
              // Dynamic key resets the internal drag transform cleanly upon drop
              key={`${node.id}-${node.x}-${node.y}`}
              drag
              dragConstraints={canvasRef}
              // Unified Drag Logic: disabled bouncy dragElastic & dragMomentum
              dragElastic={false}
              dragMomentum={false}
              onDragStart={() => setActiveNodeId(node.id)}
              onDragEnd={(_, info) => {
                // Accurately compute new x, y coordinates
                const newX = Math.round(node.x + info.offset.x);
                const newY = Math.round(node.y + info.offset.y);

                setNodes((prevNodes) =>
                  prevNodes.map((item) =>
                    item.id === node.id ? { ...item, x: newX, y: newY } : item
                  )
                );
              }}
              // Pointer-events-none on wrapper so invisible bounding box doesn't block other elements
              className="pointer-events-none absolute select-none"
              style={{
                left: node.x,
                top: node.y,
              }}
            >
              <div className="relative group">
                {/* ──────────────────────────────────────────────────────── */}
                {/* CONDITIONAL RENDERING: IMAGE NODE                       */}
                {/* ──────────────────────────────────────────────────────── */}
                {node.type === "image" && (
                  <div
                    className={`pointer-events-auto cursor-grab active:cursor-grabbing p-1.5 bg-white rounded-2xl border transition-all duration-200 ${
                      isActive
                        ? "border-indigo-600 shadow-[0_20px_35px_rgba(79,70,229,0.25)] ring-2 ring-indigo-400"
                        : "border-slate-200/90 shadow-[0_12px_24px_rgba(15,23,42,0.08)] hover:shadow-xl hover:border-slate-300"
                    }`}
                  >
                    <div className="w-56 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden bg-slate-100 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={node.content}
                        alt={node.label}
                        draggable={false}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        onError={(e) => {
                          // Fallback styling for broken/invalid image URLs
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    {/* Caption / Label beneath image */}
                    <div className="px-2 py-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-800 tracking-tight truncate max-w-[180px]">
                        {node.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        img
                      </span>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────── */}
                {/* CONDITIONAL RENDERING: VECTOR NODE                      */}
                {/* ──────────────────────────────────────────────────────── */}
                {node.type === "vector" && (
                  <svg
                    viewBox="0 0 300 200"
                    width={280}
                    height={180}
                    className={`overflow-visible filter transition-all duration-200 ${
                      isActive
                        ? "drop-shadow-[0_20px_35px_rgba(79,70,229,0.25)]"
                        : "drop-shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                    }`}
                  >
                    {/* SVG Path: only visible shape registers mouse events */}
                    <path
                      d={node.content}
                      fill="#ffffff"
                      stroke={isActive ? "#4f46e5" : "#0f172a"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className="pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none transition-colors"
                    />

                    {/* Centered Vector Label */}
                    <text
                      x="150"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none font-medium fill-slate-900 text-xs sm:text-sm tracking-tight"
                    >
                      {node.label}
                    </text>
                  </svg>
                )}

                {/* Coordinate HUD Badge on Hover / Active */}
                <div
                  className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap transition-opacity pointer-events-none shadow-sm ${
                    isActive
                      ? "bg-indigo-600 text-white opacity-100 ring-2 ring-indigo-300"
                      : "bg-slate-900/80 text-slate-200 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  x: {node.x}px · y: {node.y}px
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
