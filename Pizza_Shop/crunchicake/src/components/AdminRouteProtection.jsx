// src/components/AdminRouteProtection.jsx
"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth"; // Keep this import as is

export function AdminRouteProtection({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Update to check for the new admin route
      const isAdminRoute = pathname.startsWith("/ad/m/in/admin");
      const isLoginRoute = pathname === "/ad/m/in/admin/login";

      if (isAdminRoute && !isLoginRoute) {
        if (!isAuthenticated()) {
          router.push(
            `/ad/m/in/admin/login?redirected=true&returnUrl=${encodeURIComponent(
              pathname
            )}`
          );
          return false;
        }
      } else if (isLoginRoute && isAuthenticated()) {
        router.push("/ad/m/in/admin");
        return false;
      }

      return true;
    };

    const authCheck = checkAuth();
    setIsAuthorized(authCheck);
    setIsLoading(false);
  }, [pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E8]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B3F00]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized or not an admin route
  return isAuthorized ? children : null;
}

export default AdminRouteProtection;
