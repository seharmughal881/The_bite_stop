"use client";

import { usePathname } from "next/navigation";
import Footer from "../components/footer/Footer";
import NavbarWrapper from "../components/NavbarWrapper";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navbar/footer on ALL admin routes
  const isAdminRoute = pathname?.startsWith("/ad/m/in/admin");

  return (
    <>
      {!isAdminRoute && <NavbarWrapper />}
      <main className={isAdminRoute ? "" : "min-h-screen"}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
