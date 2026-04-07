import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Updated with baking and quality assurance logos
const logos = [
  { src: "organic.png", alt: "Organic Ingredients" },
  { src: "gluten-free.png", alt: "Gluten Free Options" },
  { src: "home-baked.png", alt: "Home Baked" },
  { src: "award.png", alt: "Award Winning" },
  { src: "delivery.png", alt: "Free Delivery" },
  { src: "custom.png", alt: "Custom Orders" },
];

const Logos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-8 flex flex-wrap justify-center gap-4"
    >
      {logos.map((logo, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-3 bg-amber-900/20 backdrop-blur-sm rounded-lg border border-amber-800/30 hover:border-amber-600/50 transition-all duration-300"
        >
          <div className="h-8 w-8 relative">
            {/* In a real implementation, you would use actual image files */}
            <div className="w-full h-full bg-amber-700/30 rounded-full flex items-center justify-center text-amber-200 text-xs font-bold">
              {logo.alt.split(" ")[0][0]}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Logos;
