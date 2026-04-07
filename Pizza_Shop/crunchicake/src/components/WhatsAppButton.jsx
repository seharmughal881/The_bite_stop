"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+923434189464";
  const message = "Hello! I'd like to inquire about your fast food items.";
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isHovered, setIsHovered] = useState(false);

  // Floating animation
  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  // Bounce-in animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      });
    }
  }, [isInView, controls]);

  return (
    <>
      {/* Pink/Rose Overlay */}
      <motion.div
        initial={{ clipPath: "circle(0% at 95% 95%)" }}
        animate={{
          clipPath: isHovered
            ? "circle(150% at 95% 95%)"
            : "circle(0% at 95% 95%)",
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="fixed inset-0 bg-pink-500 pointer-events-none z-40"
      />

      {/* Secondary Ripple Effect */}
      {isHovered && (
        <motion.div
          initial={{
            clipPath: "circle(0% at 95% 95%)",
            opacity: 0,
          }}
          animate={{
            clipPath: "circle(100% at 95% 95%)",
            opacity: 0.15,
          }}
          transition={{
            duration: 1.2,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.3,
          }}
          className="fixed inset-0 bg-pink-400 pointer-events-none z-40"
        />
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          {/* Main button */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              message
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{
                boxShadow: isHovered
                  ? [
                      "0 0 0 rgba(219, 50, 80, 0.5)",
                      "0 0 20px rgba(219, 50, 80, 0.8)",
                      "0 0 15px rgba(219, 50, 80, 0.5)",
                    ]
                  : "0 0 8px rgba(219, 50, 80, 0.3)",
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
              }}
              className="bg-[#db3250] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Shine effect */}
              <motion.div
                animate={{
                  x: isHovered ? 40 : -40,
                  opacity: isHovered ? 0.4 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white opacity-0"
                style={{
                  transform: "skewX(-20deg)",
                  filter: "blur(8px)",
                }}
              />

              <FaWhatsapp className="text-2xl sm:text-3xl" />
            </motion.div>
          </a>

          {/* Pulsing ring effect - changed to pink */}
          {isHovered && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-[#db3250] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 border-2 border-pink-400 rounded-full pointer-events-none"
              />
            </>
          )}

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 15,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2"
          >
            <div className="bg-pink-100 text-pink-900 px-2 py-1 rounded-lg shadow-md whitespace-nowrap text-xs sm:text-sm font-medium border border-pink-200">
              Ask about our cakes!
              <div className="absolute left-full top-1/2 w-1.5 h-1.5 bg-pink-100 transform -translate-y-1/2 rotate-45" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating emojis that appear on hover - dessert themed */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -50 - Math.random() * 30,
                  x: (Math.random() - 0.5) * 40,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: i * 0.15,
                }}
                className="absolute text-xl sm:text-2xl pointer-events-none"
                style={{
                  left: "50%",
                  bottom: "100%",
                  marginBottom: "8px",
                }}
              >
                {["🍰", "🧁", "🎂", "🍪", "🍩"][i]}
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </>
  );
};

export default WhatsAppButton;
