import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Hotspot = ({ 
  top, left, width, height, label, description, onClick 
}: { 
  top: string; left: string; width: string; height: string; 
  label: string; description: string; onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute cursor-pointer pointer-events-auto"
      style={{ top, left, width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Visual Indicator (Subtle pulse or highlight) */}
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.2 : 0 }}
        className="absolute inset-0 bg-white rounded-lg"
      />
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded text-[10px] uppercase tracking-widest whitespace-nowrap z-50 pointer-events-none border border-white/10"
      >
        <span className="font-bold text-[#E3CAA5]">{label}</span> — {description}
      </motion.div>
    </div>
  );
};

export const Workspace = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // The horizontal slide: Slide the desk from right to left
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FFFBE9]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* BACKGROUND GRID / NOISE */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="grid-overlay" />
        </div>

        <motion.div style={{ x, opacity }} className="relative flex items-center justify-center min-w-[140vw] h-full px-[10vw]">
          
          {/* THE DESK ILLUSTRATION */}
          <div className="relative w-full max-w-[1800px] aspect-[1.27/1]">
            <img 
              src="/assets/workspace-desk.jpg" 
              alt="Workspace Illustration" 
              className="w-full h-full object-contain mix-blend-multiply opacity-80"
            />

            {/* INTERACTIVE HOTSPOTS */}
            {/* These are positioned relative to the image container */}
            
            {/* LAPTOP: Project Gallery */}
            <Hotspot 
              top="46.5%" left="37.5%" width="30%" height="28%" 
              label="Laptop" description="View Recent Projects"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            />

            {/* CAT: Playful Interaction */}
            <Hotspot 
              top="26%" left="29%" width="19%" height="16%" 
              label="Billi" description="Just taking a nap..."
            />

            {/* MUG: Personal Info */}
            <Hotspot 
              top="60%" left="24.5%" width="8.5%" height="11%" 
              label="Fuel" description="But first, coffee."
            />

            {/* NOTES: About Me */}
            <Hotspot 
              top="77%" left="58%" width="15%" height="14%" 
              label="Notes" description="Read the Narrative"
            />

            {/* CAKE: Rewards/Contact */}
            <Hotspot 
              top="76%" left="37.5%" width="12.5%" height="12%" 
              label="Treat" description="Work is sweet."
            />

            {/* LAMP: Theme toggle idea (optional visual) */}
            <Hotspot 
              top="45%" left="72%" width="12%" height="25%" 
              label="Focus" description="Stay Bright"
            />
          </div>
        </motion.div>

        {/* SECTION CAPTION */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-12 flex flex-col gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#AD8B73] font-bold">Workspace — 02</span>
          <h2 className="text-2xl font-serif italic text-[#8C6A52]">The Creative Sanctuary</h2>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute bottom-12 right-12 w-[1px] h-12 bg-[#AD8B73]/30"
        >
           <div className="w-full h-1/2 bg-[#AD8B73]" />
        </motion.div>
      </div>
    </section>
  );
};
