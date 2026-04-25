import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16 mix-blend-difference"
    >
      <div className="text-sm font-bold tracking-widest text-white uppercase">
        MK STUDIO<span className="opacity-50">/26</span>
      </div>
      
      <div className="hidden space-x-12 text-[10px] font-bold tracking-[0.2em] uppercase text-white md:flex">
        {["Work", "About", "Contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="transition-opacity hover:opacity-50"
          >
            {item}
          </a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border border-white text-white hover:bg-white hover:text-black"
      >
        Inquire
      </motion.button>
    </motion.nav>
  );
};
