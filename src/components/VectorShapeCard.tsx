"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface VectorShapeCardProps {
  id: string;
  title: string;
  path: string;
  viewBox: string;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  initialPosition?: { x: number; y: number } | { left: string; top: string };
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  fill?: string;
  stroke?: string;
}

export default function VectorShapeCard({
  title,
  path,
  viewBox,
  width,
  height,
  centerX,
  centerY,
  initialPosition = { x: 0, y: 0 },
  constraintsRef,
  fill = "#ffffff",
  stroke = "#0f172a",
}: VectorShapeCardProps) {
  // Smart Click Logic: prevents accidental navigation clicks during or right after dragging
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    // 150ms buffer to allow the drag gesture to settle without triggering onClick
    setTimeout(() => {
      setIsDragging(false);
    }, 150);
  };

  const handleClick = () => {
    if (!isDragging) {
      console.log(`Navigating to project: ${title}`);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="pointer-events-none absolute select-none"
      style={
        "left" in initialPosition
          ? { left: initialPosition.left, top: initialPosition.top }
          : { x: initialPosition.x, y: initialPosition.y }
      }
    >
      <svg
        viewBox={viewBox}
        width={width}
        height={height}
        className="overflow-visible drop-shadow-[0_16px_28px_rgba(15,23,42,0.08)] filter"
      >
        {/* SVG Interaction Layer: only the visible shape path registers mouse events */}
        <motion.path
          d={path}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
          className="pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            transformOrigin: `${centerX}px ${centerY}px`,
            transformBox: "fill-box",
          }}
          onClick={handleClick}
        />

        {/* Centered label inside the vector shape (pointer-events-none so mouse passes directly to shape) */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          className="pointer-events-none select-none font-medium fill-slate-800 text-sm sm:text-base tracking-tight"
        >
          {title}
        </text>
      </svg>
    </motion.div>
  );
}
