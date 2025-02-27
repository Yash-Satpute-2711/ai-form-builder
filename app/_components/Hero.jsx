"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";

// Animated background lines component
function AnimatedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.15]">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-[#000000] w-full"
          style={{ top: `${i * 5}%` }}
          animate={{
            x: [-100, 100],
            opacity: [1, 1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`vertical-${i}`}
          className="absolute w-px bg-[#262626] h-full"
          style={{ left: `${i * 5}%` }}
          animate={{
            y: [-100, 100],
            opacity: [1, 1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <AnimatedLines />
      </div>

      <div className="relative z-10">
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-extrabold text-[#262626] sm:text-6xl"
              >
                Revolutionize Your Forms
                <span className="sm:block"> with AI-Powered Intelligence </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto mt-4 max-w-xl sm:text-xl text-[#262626]/80"
              >
                Harness the power of AI to create dynamic, adaptive forms that
                evolve with user input. Boost engagement, streamline data
                collection, and skyrocket your conversion rates.
              </motion.p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/dashboard"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#262626] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#262626] focus:ring-offset-2"
                  >
                    <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#363636] text-white duration-300 group-hover:translate-x-0">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                    <span className="absolute flex h-full w-full transform items-center justify-center transition-all duration-300 group-hover:translate-x-full">
                      Start Your Free Trial
                    </span>
                    <span className="invisible relative">
                      Start Your Free Trial
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
