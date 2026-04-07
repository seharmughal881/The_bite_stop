// src/app/privacy-policy/page.jsx
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

export default function PrivacyPolicy() {
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
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-red-800 mb-6">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="text-red-700 mt-4 text-lg">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-red-700 mb-4">
              At Fast Food Lahore, we respect your privacy and are committed
              to protecting any personal information you share with us. We
              operate as a fast food business specializing in pizzas,
              shawarmas, burgers, and custom fast food items.
            </p>
            <p className="text-red-700">
              Our website is designed as a showcase of our products. We do not
              collect any personal information through our website. All orders
              are handled exclusively through WhatsApp communication.
            </p>
          </motion.div>

          {/* Information Collection */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Information We Collect
            </h2>
            <p className="text-[#490835cc] mb-4">
              Our website does not collect any personal information from
              visitors. We do not have:
            </p>
            <ul className="list-disc pl-6 text-[#490835cc] space-y-2">
              <li>Registration forms or user accounts</li>
              <li>Checkout systems or shopping carts</li>
              <li>Payment processing on our website</li>
              <li>Newsletter sign-ups or contact forms</li>
            </ul>
            <p className="text-[#490835cc] mt-4">
              The only information we receive is what you voluntarily provide
              when contacting us via WhatsApp to place an order.
            </p>
          </motion.div>

          {/* WhatsApp Communication */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              WhatsApp Communication
            </h2>
            <p className="text-[#490835cc] mb-4">
              When you contact us via WhatsApp to place an order:
            </p>
            <ul className="list-disc pl-6 text-[#490835cc] space-y-2">
              <li>We can see your WhatsApp phone number</li>
              <li>
                We receive any messages, photos, or information you send us
                about your order
              </li>
              <li>
                We use this information solely to process your bakery order
              </li>
            </ul>
            <p className="text-[#490835cc] mt-4">
              We recommend reviewing WhatsApp's own privacy policy to understand
              how they handle your information.
            </p>
          </motion.div>

          {/* Information Usage */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              How We Use Your Information
            </h2>
            <p className="text-[#490835cc] mb-4">
              Any information provided through WhatsApp is used exclusively for:
            </p>
            <ul className="list-disc pl-6 text-[#490835cc] space-y-2">
              <li>Communicating with you about your order</li>
              <li>
                Understanding your customization requests for cakes and desserts
              </li>
              <li>Coordinating delivery or pickup of your order</li>
              <li>Providing customer service for your bakery order</li>
            </ul>
          </motion.div>

          {/* Information Sharing */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Information Sharing
            </h2>
            <p className="text-[#490835cc]">
              We do not share your personal information with any third parties,
              except when required to complete your order (such as providing
              your delivery address to a delivery service if needed). We never
              sell, rent, or trade your information.
            </p>
          </motion.div>

          {/* Data Security */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Data Security
            </h2>
            <p className="text-[#490835cc]">
              Since we don't collect or store your information on our website,
              the only security considerations are through the WhatsApp
              platform. We encourage you to review WhatsApp's security measures
              and privacy policy.
            </p>
          </motion.div>

          {/* Your Rights */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Your Rights
            </h2>
            <p className="text-[#490835cc] mb-4">
              Since we don't collect personal data through our website, your
              privacy is inherently protected. For any information shared via
              WhatsApp, you can:
            </p>
            <ul className="list-disc pl-6 text-[#490835cc] space-y-2">
              <li>
                Control what information you share with us through WhatsApp
              </li>
              <li>Request deletion of our conversation history at any time</li>
              <li>
                Choose not to share additional information beyond what's
                necessary for your order
              </li>
            </ul>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-[#490835cc]">
              We may update this Privacy Policy if our practices change. We will
              notify you of any changes by updating the "Last Updated" date at
              the top of this Privacy Policy.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-2xl font-semibold text-[#490835] mb-4">
              Contact Us
            </h2>
            <p className="text-[#490835cc]">
              If you have any questions about this Privacy Policy, please
              contact us via WhatsApp. Thank you for choosing Crunchi Cake
              Lahore for your bakery needs.
            </p>
          </motion.div>

          {/* Back to home */}
          <motion.div variants={fadeIn} className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center bg-[#db1356] text-white px-6 py-3 rounded-full font-medium hover:bg-[#c5104d] transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
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
