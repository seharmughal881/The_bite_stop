// components/NavbarWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// ✅ Define props
type NavbarProps = {
  onHoverChange?: (hovered: boolean) => void;
};

// ✅ Correct way: use .then() to extract the default export
const Navbar = dynamic<NavbarProps>(
  () => import("./Navbar").then((m) => m.default),
  { ssr: false }
);

export default function NavbarWrapper() {
  return <Navbar onHoverChange={() => {}} />;
}
