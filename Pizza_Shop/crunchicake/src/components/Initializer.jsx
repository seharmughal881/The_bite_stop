"use client";

import { useEffect } from "react";
import { initializeLocalStorage } from "@/utils/localStorage";

export default function Initializer() {
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return null;
}
