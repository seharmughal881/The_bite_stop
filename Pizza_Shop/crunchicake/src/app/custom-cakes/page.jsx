"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to fast food equivalent
    router.replace("/custom-pizza");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#fff5f8] to-[#ffeef3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#db1356] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Custom Pizza Builder...</p>
      </div>
    </div>
  );
}
