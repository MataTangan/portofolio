"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="w-full px-6 sm:px-12 md:px-20 py-6 border-t border-slate-200/50 bg-slate-50 flex items-center justify-between"
    >
      <p className="text-xs text-slate-400 tracking-normal">
        © {new Date().getFullYear()} — Graphic Design &amp; Computer Science
      </p>
      <p className="text-xs text-slate-400">
        All rights reserved.
      </p>
    </motion.footer>
  );
}
