"use client";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Define routes for quick links
  const quickLinks = [
    { name: "Pizzas", path: "/all-pizzas-creation" },
    { name: "Shawarmas", path: "/all-shawarmas-creation" },
    { name: "Burgers", path: "/all-burgers-creation" },
    { name: "All Fast Food", path: "/all-fastfood-products" },
    { name: "Custom Pizza", path: "/custom-pizza" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-red-50 to-orange-50 text-red-800 overflow-hidden pt-16 pb-8">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pizza Slice 1 */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-6 h-6 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 10 L70 40 L60 80 L40 80 L30 40 Z" fill="#dc2626" />
          </svg>
        </motion.div>

        {/* Burger 2 */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-5 h-5 opacity-15"
          animate={{
            y: [0, 12, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="30" width="60" height="10" fill="#ea580c" />
            <rect x="20" y="45" width="60" height="15" fill="#fbbf24" />
            <rect x="20" y="65" width="60" height="10" fill="#ea580c" />
          </svg>
        </motion.div>

        {/* Shawarma 3 */}
        <motion.div
          className="absolute top-1/5 right-1/6 w-4 h-4 opacity-25"
          animate={{
            x: [0, 10, 0, -8, 0],
            y: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="15" ry="25" fill="#ea580c" />
          </svg>
        </motion.div>

        {/* Fast Food Icon 4 */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-5 h-5 opacity-20"
          animate={{
            x: [0, 8, 0, -6, 0],
            y: [0, -10, 0, 8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="25" fill="#fbbf24" />
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div
              className="flex md:justify-start justify-center items-center mb-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="flex items-center justify-center text-red-800 font-bold text-xl font-serif cursor-pointer"
                whileHover={{
                  filter: "drop-shadow(0 5px 10px rgba(220, 38, 38, 0.3))",
                  scale: 1.05
                }}
              >
                <span className="text-2xl mr-2">🍕</span>
                Fast Food Lahore
              </motion.div>
            </motion.div>
            <motion.p
              className="text-red-700 mb-8 max-w-xs mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Serving delicious fast food with our premium pizzas, shawarmas, and burgers. Made with
              passion and the finest ingredients.
            </motion.p>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                {
                  icon: <FaInstagram className="text-lg" />,
                  href: "https://instagram.com/crunchicakelahore",
                },
                {
                  icon: <FaFacebook className="text-lg" />,
                  href: "https://www.facebook.com/share/16eUWLw6TA/",
                },
                {
                  icon: <FaTiktok className="text-lg" />,
                  href: "https://www.tiktok.com/@crunchicakelahore?_t=ZS-8zOXtCPpHOx&_r=1",
                },
                {
                  icon: <FaWhatsapp className="text-lg" />,
                  href: "https://wa.me/923434189464",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#490835] hover:bg-[#ffc8d6] transition-colors shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-8 text-[#490835] relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contact Info
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ffc8d6] to-[#ffcdd7] rounded-full w-0 group-hover:w-full"
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.h3>
            <ul className="space-y-5">
              {[
                {
                  icon: <FaPhone className="text-lg cursor-pointer" />,
                  title: "WhatsApp",
                  content: "+92 343 418 9464",
                  href: "https://wa.me/923434189464",
                },
                {
                  icon: <FaEnvelope className="text-lg cursor-pointer" />,
                  title: "Email Address",
                  content: "info@crunchicake.com",
                  href: "mailto:info@crunchicake.com",
                },
                {
                  icon: <FaMapMarkerAlt className="text-lg cursor-pointer" />,
                  title: "Shop Address",
                  content: "Homebase (Near Dunya News Head Office, Lahore)",
                },
                {
                  icon: <FaClock className="text-lg cursor-pointer" />,
                  title: "Timings",
                  content: "9:00 AM – 8:00 PM",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex md:justify-start justify-center items-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transitions={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="mt-0.5 mr-4 text-[#490835] bg-[#ffc8d6] p-2 rounded-full">
                    {item.icon}
                  </span>
                  <div className="text-center md:text-left">
                    <p className="font-medium text-[#490835]">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#d4587a] hover:text-[#db1356] transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-[#d4587a]">{item.content}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-8 text-[#490835] relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Quick Links
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ffc8d极] to-[#ffcdd7] rounded-full w-0 group-hover:w-full"
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transitiosn={{ delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.path}
                    className="text-red-700 hover:text-red-600 transition-colors block py-2 font-medium group text-center md:text-left"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
              {/* Privacy Policy Link */}
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transitions={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/privacy-policy"
                  className="text-red-700 hover:text-red-600 transition-colors block py-2 font-medium group text-center md:text-left"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <motion.div
          className="border-t border-red-200 mt-16 pt-8 flex flex-col md:flex-row justify-center items-center text-center space-y-2 md:space-y-0 md:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-red-600 text-sm">
            © {currentYear} Fast Food Lahore. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-orange-600 hover:text-red-600 text-sm transition-colors"
          >
            Privacy Policy
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
