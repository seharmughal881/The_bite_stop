import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const Links = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF size={20} />,
      href: "https://www.facebook.com/sweetdelights",
      color: "hover:text-[#1877F2]",
      label: "Facebook",
    },
    {
      icon: <FaInstagram size={20} />,
      href: "https://www.instagram.com/sweetdelights",
      color: "hover:text-[#E4405F]",
      label: "Instagram",
    },
    {
      icon: <FaPinterestP size={20} />,
      href: "https://pinterest.com/sweetdelights",
      color: "hover:text-[#BD081C]",
      label: "Pinterest",
    },
    {
      icon: <FaTiktok size={20} />,
      href: "https://www.tiktok.com/@sweetdelights",
      color: "hover:text-[#000000]",
      label: "TikTok",
    },
  ];

  return (
    <div className="w-full mt-12">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-5 flex-wrap justify-center lg:justify-start"
        >
          {socialLinks.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`text-amber-100/70 ${item.color} hover:scale-110 transition-all duration-300 p-3 rounded-full bg-amber-900/30 backdrop-blur-sm hover:bg-amber-800/40`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-sm text-amber-100/70 mb-2">
            Get the sweetest updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 bg-amber-50/10 border border-amber-800/30 rounded-full text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-sm"
            />
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors duration-300 text-sm">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Links;
