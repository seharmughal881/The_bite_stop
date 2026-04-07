"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiBox, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { GiPizzaSlice } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { GiDonerKebab } from "react-icons/gi";
import { logout } from "@/utils/auth";
import Image from "next/image";

const AdminSidebar = ({
  activeSection,
  setActiveSection,
  activeCategory,
  setActiveCategory,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileLogoutPosition, setMobileLogoutPosition] = useState({
    top: 0,
    left: 0,
  });
  const router = useRouter();
  const sidebarRef = useRef(null);
  const logoutButtonRef = useRef(null);
  const mobileLogoutButtonRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("[data-logout-confirm]")
      ) {
        setIsMobileOpen(false);
      }

      // Close logout dialog when clicking outside
      if (
        showLogoutConfirm &&
        logoutButtonRef.current &&
        !logoutButtonRef.current.contains(event.target) &&
        !event.target.closest("[data-logout-button]")
      ) {
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileOpen, showLogoutConfirm]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setShowLogoutConfirm(false);
    setIsMobileOpen(false);
    router.push("/");
  };

  const handleLogoutClick = (e) => {
    // Prevent the sidebar from closing
    e.stopPropagation();

    // For mobile, calculate position for the dropdown
    if (window.innerWidth < 768) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMobileLogoutPosition({
        top: rect.top - 120, // Position above the button
        left: rect.left + rect.width / 2,
      });
    }
    setShowLogoutConfirm(true);
  };

  const cancelLogout = (e) => {
    if (e) e.stopPropagation();
    setShowLogoutConfirm(false);
  };

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FiHome,
      color: "text-[#db1356]",
    },
    {
      id: "products",
      label: "Products",
      icon: FiBox,
      color: "text-[#d4587a]",
      subItems: [
        {
          id: "pizzas",
          label: "Pizzas",
          icon: GiPizzaSlice,
          color: "text-[#db1356]",
        },
        {
          id: "shawarmas",
          label: "Shawarmas",
          icon: GiDonerKebab,
          color: "text-[#d4587a]",
        },
        {
          id: "burgers",
          label: "Burgers",
          icon: FaHamburger,
          color: "text-[#e6759a]",
        },
        {
          id: "fastfood",
          label: "All Fast Food",
          icon: FiBox,
          color: "text-[#490835]",
        },
      ],
    },
  ];

  const bottomMenuItems = [
    {
      id: "logout",
      label: "Logout",
      icon: FiLogOut,
      color: "text-[#db1356]",
      action: handleLogoutClick,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
    // Close logout confirmation when sidebar is toggled
    if (showLogoutConfirm) {
      setShowLogoutConfirm(false);
    }
  };

  const handleNavigation = (item, e) => {
    if (e) e.stopPropagation();

    if (item.action) {
      item.action(e);
      return;
    }

    if (item.id === "products" && activeSection !== "products") {
      setActiveSection("products");
      setActiveCategory("pizzas");
    } else {
      setActiveSection(item.id);
    }

    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const handleSubNavigation = (subItem, e) => {
    if (e) e.stopPropagation();

    setActiveCategory(subItem.id);
    setActiveSection("products");

    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  // Mobile Logout Confirmation Component
  const MobileLogoutConfirm = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed md:hidden bg-white rounded-lg shadow-xl p-4 z-50 border border-[#d4587a]"
      style={{
        top: `${mobileLogoutPosition.top}px`,
        left: `${mobileLogoutPosition.left}px`,
        width: "200px",
        transform: "translateX(-50%)",
      }}
      ref={logoutButtonRef}
      data-logout-confirm
    >
      <h3 className="text-sm font-semibold text-[#490835] mb-2">
        Confirm Logout
      </h3>
      <p className="text-xs text-gray-600 mb-4">
        Are you sure you want to log out?
      </p>
      <div className="flex justify-between space-x-2">
        <button
          onClick={cancelLogout}
          disabled={isLoggingOut}
          className="px-3 py-1 text-xs cursor-pointer text-[#490835] border border-[#d4587a] rounded-md hover:bg-[#ffcdd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-3 py-1 text-xs bg-[#db1356] cursor-pointer text-white rounded-md hover:bg-[#c5104a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoggingOut ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-1"
              />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </motion.div>
  );

  const sidebarContent = (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="h-full bg-gradient-to-b from-[#ffc8d6] to-[#ffcdd7] text-[#490835] flex flex-col w-64 shadow-lg"
      ref={sidebarRef}
      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
    >
      {/* Header */}
      <div className="p-4 border-b border-[#d4587a]/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">🍕</span>
            </div>
            <span className="font-bold text-lg">Fast Food Lahore</span>
          </motion.div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-[#d4587a]/20 transition-colors text-[#490835] cursor-pointer"
          >
            <FiMenu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {mainMenuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={(e) => handleNavigation(item, e)}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group cursor-pointer ${
                  activeSection === item.id
                    ? "bg-[#db1356] text-white shadow-lg"
                    : "text-[#490835] hover:bg-[#ffcdd7]"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-3 text-sm font-medium"
                >
                  {item.label}
                </motion.span>
                {item.subItems && (
                  <motion.div
                    animate={{
                      rotate: activeSection === item.id ? 180 : 0,
                    }}
                    className="ml-auto"
                  >
                    <FiMenu className="w-4 h-4" />
                  </motion.div>
                )}
              </button>

              {/* Sub Items */}
              {item.subItems && activeSection === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-8 mt-1 space-y-1 pl-2 border-l-2 border-[#d4587a]/30"
                >
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={(e) => handleSubNavigation(subItem, e)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${
                        activeCategory === subItem.id
                          ? "bg-[#ffa8ba] text-[#490835] font-medium"
                          : "text-[#490835] hover:bg-[#ffa8ba]"
                      }`}
                    >
                      <subItem.icon
                        className={`w-4 h-4 ${subItem.color} flex-shrink-0`}
                      />
                      <span className="ml-3 text-sm">{subItem.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-[#d4587a]/30 flex-shrink-0">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              data-logout-button
              ref={mobileLogoutButtonRef}
              onClick={(e) =>
                handleNavigation({ ...item, action: () => item.action(e) }, e)
              }
              className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group cursor-pointer ${
                activeSection === item.id
                  ? "bg-[#db1356] text-white shadow-lg"
                  : "text-[#490835] hover:bg-[#ffcdd7]"
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 text-sm font-medium"
              >
                {item.label}
              </motion.span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Logout Confirmation Modal for Desktop */}
      <AnimatePresence>
        {showLogoutConfirm && window.innerWidth >= 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={cancelLogout} // Close when clicking on backdrop
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              ref={logoutButtonRef}
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl mx-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <h3 className="text-lg font-semibold text-[#490835] mb-4">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 cursor-pointer text-[#490835] border border-[#d4587a] rounded-md hover:bg-[#ffcdd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-[#db1356] cursor-pointer text-white rounded-md hover:bg-[#c5104a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoggingOut ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Logging out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Logout Confirmation Dropdown */}
      <AnimatePresence>
        {showLogoutConfirm && window.innerWidth < 768 && (
          <MobileLogoutConfirm />
        )}
      </AnimatePresence>

      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#db1356] border-t-transparent rounded-full mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#490835] font-medium"
            >
              Logging out...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => {
              setIsMobileOpen(false);
              setShowLogoutConfirm(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle button - Always visible on mobile */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#db1356] text-white rounded-lg md:hidden shadow-md cursor-pointer"
      >
        {isMobileOpen ? (
          <FiX className="w-5 h-5" />
        ) : (
          <FiMenu className="w-5 h-5" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 md:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
