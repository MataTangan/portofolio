"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const WORDS = [
  "Hi there.",
  "I am a graphic designer,",
  "currently studying",
  "computer science.",
  "Hoping to build some",
  "wondrous things",
];

export default function Hero() {
  return (
    <section className="flex flex-col justify-center px-6 sm:px-12 md:px-20 pt-36 sm:pt-44 pb-16">
      {/* Editorial headline typography */}
      <motion.div
        className="max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.12]">
          {WORDS.map((line, index) => (
            <span key={index} className="inline-block mr-3 sm:mr-4 last:mr-0">
              <motion.span
                variants={wordVariants}
                className="inline-block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>
    </section>
  );
}
