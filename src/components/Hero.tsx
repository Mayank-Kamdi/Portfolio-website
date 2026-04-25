import { motion } from "framer-motion";
import { LiquidPortrait } from "./LiquidPortrait";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black selection:bg-white selection:text-black font-sans">
      {/* 
        High-Fidelity WebGL Liquid Portrait 
        Replaces the previous SVG filter for the "exact" waterfall effect and parallax.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <LiquidPortrait imageSrc="/assets/hero-person.png" />
        
        {/* Architectural Overlays */}
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* CENTRAL / LOWER THIRD TEXT */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center w-full max-w-6xl"
        >
          <motion.h1 
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="text-[10vw] md:text-[6vw] font-medium tracking-tighter text-white leading-[0.85]"
          >
            Mayank Kamdi. <br />
            <span className="text-white/20 italic font-serif">A versatile portfolio</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold"
          >
            <div className="w-12 h-[1px] bg-white/10" />
            <span>2026 — Future</span>
            <div className="w-12 h-[1px] bg-white/10" />
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="absolute bottom-0 w-full p-8 flex justify-between items-end z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col gap-4 pointer-events-auto"
        >
          <button className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Get in touch</span>
            <span className="text-2xl transform group-hover:translate-x-2 transition-transform duration-500">→</span>
          </button>
        </motion.div>
        
        {/* Simple Visualizer Icon */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.8 }}
           className="flex items-end gap-[3px] h-6 px-4"
        >
          {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4].map((h, i) => (
            <motion.div 
              key={i}
              animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              className="w-[2px] bg-white/20"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
