import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CoffeeSection } from "./components/CoffeeSection";
import { Work } from "./components/Work";
import { CustomCursor } from "./components/CustomCursor";
import { Preloader } from "./components/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <main className="bg-[#F7F2E8] min-h-screen selection:bg-[#2C1E18] selection:text-[#F7F2E8] overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      
      {/* 
          Render content immediately but let internal animations handle the 'reveal'.
          This ensures the 'pop-in' happens WHILE the loader is sliding up.
      */}
      <Navbar />
      <Hero />
      <CoffeeSection />
      <Work />
      
      <footer className="py-20 text-center border-t border-[#2C1E18]/10 bg-[#F7F2E8]">
        <p className="text-[#2C1E18]/40 text-sm font-medium">
          © 2026 Mayank Kamdi. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default App;
