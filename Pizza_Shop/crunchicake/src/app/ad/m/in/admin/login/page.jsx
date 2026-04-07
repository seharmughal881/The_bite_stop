"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Cake } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, isAuthenticated } from "@/utils/auth";
import Image from "next/image";
const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if user is already logged in
  // Update the authentication check useEffect:
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/ad/m/in/admin");
    }
  }, [router]);

  // Check for redirect message
  useEffect(() => {
    if (searchParams.get("redirected") === "true") {
      setError("Please log in to access the admin panel");
    }
  }, [searchParams]);

  // Pink-themed color palette
  const colors = {
    primary: "#ffc8d1", // Primary pink
    secondary: "#d4587a", // Light pink
    light: "#fff5f8", // Very light pink
    accent: "#ffc8d6", // Light pink accent
    textDark: "#490835", // Dark purple text
    textLight: "#db1356", // Medium pink text
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const loginResult = login(email, password);

      if (loginResult.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/ad/m/in/admin/");
        }, 1000);
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1500);
  };

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

  const cardHover = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300,
      },
    },
  };

  const shake = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff5f8] to-[#ffeef3] p-4 relative overflow-hidden">
      {/* Pink-themed background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Particle 1 */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-8 h-8 opacity-15"
          animate={{
            y: [0, -25, 0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="40" ry="20" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 2 */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 opacity-10"
          animate={{
            y: [0, 20, 0, 10, 0],
            scale: [1, 1.2, 1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="20" ry="40" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 3 */}
        <motion.div
          className="absolute top-3/4 left-2/3 w-10 h-10 opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30 Z"
              fill="#db1356"
            />
          </svg>
        </motion.div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variantss={cardHover}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-[#ffc8d6]"
        style={{ boxShadow: "0 20px 50px -20px rgba(73, 8, 53, 0.3)" }}
      >
        {/* Header */}
        <div
          className="p-6 text-center relative overflow-hidden"
          style={{ backgroundColor: colors.primary }}
        >
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r "></div>
          {/* Logo */}

          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-26 w-48 relative"
              whileHover={{
                filter: "drop-shadow(0 5px 10px rgba(219, 19, 86, 0.3))",
              }}
            >
              <Image
                src="/CrunchiCakeLahore Logo Design.png"
                alt="CrunchiCakeLahore Logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white font-serif"
            whileHover={{ scale: 1.03 }}
          >
            CrunchiCake Lahore Admin
          </motion.h1>
          <motion.p
            className="text-[#ffc8d6] mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3 }}
          >
            Sign in to your admin dashboard
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              variants={error ? shake : {}}
              animatee={error ? "shake" : ""}
              className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: colors.textDark }}
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  className="h-5 w-5"
                  style={{ color: `${colors.primary}70` }} // or use opacity instead
                />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg border focus:ring-2 focus:border-transparent placeholder-opacity-50 transition-colors duration-200"
                style={{
                  borderColor: error ? "#EF4444" : `${colors.primary}/20`,
                  color: colors.textDark,
                  backgroundColor: colors.light,
                  focusRing: colors.primary,
                }}
                placeholder="admin@crunchicakelahore.com"
                required
                disabled={isLoading}
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
              style={{ color: colors.textDark }}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  className="h-5 w-5"
                  style={{ color: `${colors.primary}/70` }}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 focus:border-transparent placeholder-opacity-50 transition-colors duration-200"
                style={{
                  borderColor: error ? "#EF4444" : `${colors.primary}/20`,
                  color: colors.textDark,
                  backgroundColor: colors.light,
                  focusRing: colors.primary,
                }}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center opacity-50 hover:opacity-100 transition-opacity duration-200"
                style={{ color: colors.primary }}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Demo Credentials Hint */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-3 bg-[#ffc8d6] rounded-lg border border-[#ffcdd7]"
          >
            <p className="text-xs text-[#490835] text-center">
              <strong>Demo Credentials:</strong>
              <br />
              Email: admin@crunchicakelahore.com
              <br />
              Password: admin123
            </p>
          </motion.div> */}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex cursor-pointer justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isLoading
                  ? `${colors.primary}/70`
                  : colors.primary,
              }}
            >
              {/* Button background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#d4587a] to-[#e6759a] opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              />

              {isLoading ? (
                <span className="flex items-center relative z-10">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="-ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </motion.svg>
                  Signing in...
                </span>
              ) : (
                <span className="relative z-10">Sign in</span>
              )}
            </button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#ffc8d6] text-center">
          <p className="text-xs text-[#490835]">
            © {new Date().getFullYear()} CrunchiCake Lahore. Admin access only.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
