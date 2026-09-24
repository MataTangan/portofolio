"use client";

import { useRef } from "react";
import VectorShapeCard from "./VectorShapeCard";

// Vector Path Definitions
const SHAPES = {
  // 1. Organic Blob
  blob: {
    viewBox: "0 0 320 220",
    width: 320,
    height: 220,
    centerX: 160,
    centerY: 110,
    path: "M 50,110 C 45,55 105,35 165,45 C 235,55 280,80 270,130 C 260,185 200,195 140,185 C 80,175 55,155 50,110 Z",
    fill: "#ffffff",
    stroke: "#0f172a",
  },
  // 2. Rounded Pill / Capsule
  pill: {
    viewBox: "0 0 280 140",
    width: 280,
    height: 140,
    centerX: 140,
    centerY: 70,
    path: "M 70,25 L 210,25 C 245,25 265,45 265,70 C 265,95 245,115 210,115 L 70,115 C 35,115 15,95 15,70 C 15,45 35,25 70,25 Z",
    fill: "#ffffff",
    stroke: "#0f172a",
  },
  // 3. 12-point Starburst Badge
  starburst: {
    viewBox: "0 0 260 260",
    width: 260,
    height: 260,
    centerX: 130,
    centerY: 130,
    path: "M 130.0 30.0 L 150.2 54.7 L 180.0 43.4 L 185.2 74.8 L 216.6 80.0 L 205.3 109.8 L 230.0 130.0 L 205.3 150.2 L 216.6 180.0 L 185.2 185.2 L 180.0 216.6 L 150.2 205.3 L 130.0 230.0 L 109.8 205.3 L 80.0 216.6 L 74.8 185.2 L 43.4 180.0 L 54.7 150.2 L 30.0 130.0 L 54.7 109.8 L 43.4 80.0 L 74.8 74.8 L 80.0 43.4 L 109.8 54.7 Z",
    fill: "#ffffff",
    stroke: "#0f172a",
  },
};

export default function ProjectCanvas() {
  // Reference for the boundary constraints used by Framer Motion drag
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={canvasRef}
      id="canvas-container"
      className="w-full h-screen relative overflow-hidden bg-slate-50 select-none border-y border-slate-200/60"
      style={{
        backgroundImage: "radial-gradient(circle, #cbd5e1 1.25px, transparent 1.25px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Subtle Canvas Legend / Graphic Header */}
      <div className="absolute top-8 left-8 sm:left-12 pointer-events-none select-none z-10 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
          Project Canvas
        </span>
        <span className="text-xs text-slate-400">
          (drag shapes to interact · click to navigate)
        </span>
      </div>

      {/* Node 1: Dicoding IDCamp (Blob Shape) */}
      <VectorShapeCard
        id="card-dicoding"
        title="Dicoding IDCamp"
        path={SHAPES.blob.path}
        viewBox={SHAPES.blob.viewBox}
        width={SHAPES.blob.width}
        height={SHAPES.blob.height}
        centerX={SHAPES.blob.centerX}
        centerY={SHAPES.blob.centerY}
        initialPosition={{ left: "14%", top: "20%" }}
        constraintsRef={canvasRef}
        fill={SHAPES.blob.fill}
        stroke={SHAPES.blob.stroke}
      />

      {/* Node 2: GemasTIK XVIII (Pill Shape) */}
      <VectorShapeCard
        id="card-gemastik"
        title="GemasTIK XVIII"
        path={SHAPES.pill.path}
        viewBox={SHAPES.pill.viewBox}
        width={SHAPES.pill.width}
        height={SHAPES.pill.height}
        centerX={SHAPES.pill.centerX}
        centerY={SHAPES.pill.centerY}
        initialPosition={{ left: "56%", top: "28%" }}
        constraintsRef={canvasRef}
        fill={SHAPES.pill.fill}
        stroke={SHAPES.pill.stroke}
      />

      {/* Node 3: UI/UX Playground (Starburst Shape) */}
      <VectorShapeCard
        id="card-playground"
        title="UI/UX Playground"
        path={SHAPES.starburst.path}
        viewBox={SHAPES.starburst.viewBox}
        width={SHAPES.starburst.width}
        height={SHAPES.starburst.height}
        centerX={SHAPES.starburst.centerX}
        centerY={SHAPES.starburst.centerY}
        initialPosition={{ left: "32%", top: "54%" }}
        constraintsRef={canvasRef}
        fill={SHAPES.starburst.fill}
        stroke={SHAPES.starburst.stroke}
      />
    </div>
  );
}
