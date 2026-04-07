// src/app/about-us/page.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen md:mt-5 mt-0 bg-gradient-to-b from-red-50 to-orange-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 py-6 px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center text-red-800 font-serif font-bold text-xl"
        >
          <div className="relative w-15 h-15 mr-2 flex items-center justify-center">
            <span className="text-3xl">🍕</span>
          </div>
          Fast Food Lahore
        </Link>
      </nav>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-red-800 mb-6">
              Our Fast Food Journey
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          {/* Timeline section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div variants={fadeIn} className="relative">
              {/* Timeline */}
              <div className="absolute left-0 top-0 h-full w-1 bg-orange-300 ml-6 transform -translate-x-1/2"></div>

              <div className="relative pl-16 pb-12">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                  2012
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  The Beginning
                </h3>
                <p className="text-red-700">
                  Discovered the passion for creating delicious fast food and began my
                  culinary journey.
                </p>
              </div>

              <div className="relative pl-16 pb-12">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  2018
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Official Start
                </h3>
                <p className="text-red-700">
                  Officially stepped into the world of fast food with dedication
                  and hard work.
                </p>
              </div>

              <div className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold text-lg">
                  2020
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Launch
                </h3>
                <p className="text-red-700">
                  Proudly launched Fast Food Lahore to share our creations
                  with the world.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission section */}
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16"
          >
            <h2 className="text-3xl font-serif font-bold text-red-800 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-red-700 text-center leading-relaxed">
              At Fast Food Lahore, every pizza, shawarma, and burger is crafted
              with passion, care, and attention to detail. We believe that every
              bite should tell a story of flavor, creativity, and
              quality. From custom pizzas to everyday favorites,
              our mission is simple: to spread happiness through fresh,
              delicious fast food.
            </p>
          </motion.div>

          {/* Thank you section */}
          <motion.div variants={fadeIn} className="text-center">
            <h2 className="text-3xl font-serif font-bold text-red-800 mb-6">
              Thank You
            </h2>
            <p className="text-lg text-red-700 mb-8 max-w-2xl mx-auto">
              Thank you for being a part of our journey — we can&apos;t wait to
              serve you something unforgettable.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
            >
              Explore Our Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-[#490835cc] mt-16">
        <p>
          © {new Date().getFullYear()} Crunchi Cake Lahore. All rights reserved.
        </p>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
