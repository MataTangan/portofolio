"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 md:px-20 py-6 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50"
    >
      {/* Minimal Logo / Name */}
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-slate-900 hover:text-slate-600 transition-colors duration-200 select-none"
      >
        portfolio.
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-6 sm:gap-8">
        <a
          href="mailto:contact@example.com"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 font-normal"
        >
          Email
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 font-normal"
        >
          GitHub
        </a>
      </nav>
    </motion.header>
  );
}
