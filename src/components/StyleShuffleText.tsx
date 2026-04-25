import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StyleShuffleTextProps {
  text: string;
  className?: string;
  isAnimating?: boolean;
}

export const StyleShuffleText = ({ text, className = "", isAnimating = true }: StyleShuffleTextProps) => {
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;

    // Rapidly cycle through styles (approx 100ms interval for 'vibrating' effect)
    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % 4);
    }, 120);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Variations: Normal, Outlined, Slightly offset (sketchy), and Bold
  const styles = [
    { 
      WebkitTextStroke: "0px transparent", 
      textShadow: "none",
      opacity: 1 
    },
    { 
      WebkitTextStroke: "1px currentColor", 
      color: "transparent",
      textShadow: "none",
      opacity: 0.8
    },
    { 
      WebkitTextStroke: "0px transparent", 
      textShadow: "2px 2px 0px rgba(255,255,255,0.1)",
      opacity: 0.9,
      transform: "translate(1px, -1px)"
    },
    { 
      WebkitTextStroke: "1px currentColor", 
      color: "transparent",
      opacity: 0.5,
      filter: "blur(1px)"
    }
  ];

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        style={styles[styleIndex]}
        className="inline-block transition-all duration-75 ease-linear"
      >
        {text}
      </motion.span>
    </div>
  );
};
