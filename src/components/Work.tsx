import { motion } from "framer-motion";

const projects = [
  { title: "Visual Narrative", category: "Motion", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { title: "Spatial Design", category: "Architecture", image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop" },
  { title: "Dynamic Flow", category: "Development", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
];

export const Work = () => {
  return (
    <section id="work" className="py-40 px-6 md:px-16 bg-[#F7F2E8]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center"
        >
          <h2 className="text-[10vw] md:text-[6vw] font-bold text-[#2C1E18] leading-none mb-8">Selected<br />Works</h2>
          <div className="flex justify-center">
             <div className="w-12 h-[1px] bg-[#2C1E18]/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-[#2C1E18]/5 group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
                />
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                    <h3 className="text-3xl font-bold text-[#2C1E18]">{project.title}</h3>
                    <p className="text-sm font-medium text-[#2C1E18]/40 mt-1 italic">({project.category})</p>
                </div>
                <motion.div 
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="w-12 h-12 rounded-full border border-[#2C1E18]/10 flex items-center justify-center text-[#2C1E18]"
                >
                    ↗
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
