import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
      {/* Tooltip (Alt style: Speech bubble look) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8, y: isHovered ? 0 : 10 }}
        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#2C1E18] text-[#F7F2E8] px-4 py-2 rounded-lg text-[9px] uppercase tracking-widest whitespace-nowrap z-50 pointer-events-none"
      >
        <span className="font-bold">{label}</span> — {description}
        {/* Little triangle for speech bubble effect */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2C1E18] rotate-45" />
      </motion.div>
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (t: Date) => {
    return t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="text-[12px] font-mono text-[#2C1E18] opacity-80 tracking-tighter">
      {format(time)}
    </div>
  );
};

export const CoffeeSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Exactly like Alt portfolio: Smooth horizontal scroll track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FFFBE9] overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center">
        
        {/* Caption (Alt style: top left) */}
        <motion.div 
          style={{ opacity }}
          className="absolute top-12 left-12 flex flex-col gap-1 z-30"
        >
          <span className="text-[10px] lowercase tracking-tighter text-[#2C1E18]/60 font-mono">(a café-shaped portfolio)</span>
        </motion.div>

        {/* Branding (Alt style: center top) */}
        <motion.div 
           style={{ opacity }}
           className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        >
          <div className="text-3xl font-serif italic text-[#2C1E18] leading-none tracking-tighter">Mayank</div>
          <div className="w-12 h-[1px] bg-[#2C1E18]/20 mt-2" />
        </motion.div>

        {/* Content Wrapper */}
        <motion.div style={{ x, opacity }} className="relative flex items-center min-w-[160vw] h-full px-[5vw]">
          
          {/* THE COFFEE BAR ILLUSTRATION */}
          <div className="relative w-full max-w-[1600px] flex items-center justify-center">
            
            {/* Primary Illustration Layer */}
            <div className="relative">
              <img 
                src="/assets/coffee-bar.png" 
                alt="Coffee Bar Illustration" 
                className="w-full h-auto object-contain mix-blend-multiply"
              />

              {/* LIVE DIGITAL CLOCK OVERLAY */}
              <div className="absolute top-[68.5%] left-[47.2%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFBE9] px-2 py-0.5 rounded-sm">
                <DigitalClock />
              </div>

              {/* INTERACTIVE HOTSPOTS (Mapped to Coffee Bar) */}
              
              {/* MUGS (PROJECTS) */}
              <Hotspot top="33%" left="29%" width="7%" height="10%" label="Mug 01" description="E-Commerce Redesign" />
              <Hotspot top="34%" left="39%" width="7%" height="9%" label="Mug 02" description="SaaS Dashboard" />
              
              <Hotspot top="49%" left="30%" width="6%" height="10%" label="Mug 03" description="Fintech App" />
              <Hotspot top="51%" left="39.5%" width="7%" height="8%" label="Mug 04" description="Creative Agency" />
              <Hotspot top="49%" left="49.5%" width="6%" height="10%" label="Mug 05" description="AI Interface" />

              {/* ESPRESSO MACHINE (INTERACTIVE) */}
              <Hotspot 
                top="35%" left="62%" width="22%" height="40%" 
                label="Espresso" description="Ready to Brew" 
              />

              {/* RADIO */}
              <Hotspot top="64%" left="32.5%" width="7%" height="8%" label="Radio" description="Lo-fi Beats" />

              {/* CLOCK */}
              <Hotspot top="64%" left="43.5%" width="8%" height="8%" label="Clock" description="IT'S COFFEE O'CLOCK" />
            </div>

            {/* SECONDARY "CAFE" TEXT */}
            <div className="absolute top-[20%] left-[10%] max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF4D4D]" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2C1E18]">
                  Each mug is a project. get a taste.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM NAV BAR (Alt Style) */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center bg-[#2C1E18] text-[#F7F2E8] px-6 py-3 rounded-full gap-8 shadow-2xl border border-white/10"
        >
          <button className="text-sm font-bold opacity-80 hover:opacity-100 transition-opacity">i</button>
          <div className="w-[1px] h-4 bg-white/20" />
          <button className="flex flex-col gap-1">
            <div className="w-6 h-[2px] bg-white" />
            <div className="w-6 h-[2px] bg-white" />
          </button>
          <div className="w-[1px] h-4 bg-white/20" />
          <div className="flex gap-6">
            <button className="hover:translate-x-[-2px] transition-transform font-bold">{"<"}</button>
            <button className="hover:translate-x-[2px] transition-transform font-bold">{">"}</button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
