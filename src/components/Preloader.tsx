import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypewriterText } from "./TypewriterText";

const WORDS = ["(hello)", "(welcome)", "(welcome in)"];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const [showBranding, setShowBranding] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Step 1: Greeting Cycle (Whole words or quick typing)
    if (index < WORDS.length - 1) {
      const timer = setTimeout(() => setIndex(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    } else {
      // Step 2: Show Branding
      const timer = setTimeout(() => setShowBranding(true), 600);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    if (showBranding) {
      // Hold for the typewriter animation to finish (approx 12 chars * 60ms = 720ms)
      const timer = setTimeout(() => setIsExiting(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [showBranding]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(onComplete, 1100);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2C1E18] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!showBranding ? (
          <motion.span
            key="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white font-mono text-lg font-medium"
          >
            {WORDS[index]}
          </motion.span>
        ) : (
          <motion.div
            key="branding"
            className="flex flex-col items-center text-center px-6 w-full"
          >
            {/* 
              The signature "Character Reveal" animation 
              instead of the previous style-shuffle/flash.
            */}
            <TypewriterText 
              text="Mayank Kamdi" 
              speed={70}
              className="text-[10vw] md:text-[18vh] font-black tracking-tighter text-[#F7F2E8] leading-[0.8] mb-8"
            />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl font-medium text-[#F7F2E8]/60 italic font-mono"
            >
              (a versatile portfolio)
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
