// components/AuthHandler.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Hanya untuk navigasi, bukan untuk proteksi
    const handleAuthChange = () => {
      const isLoggedIn = document.cookie.includes("connect.sid");

      if (isLoggedIn && ["/login", "/signup"].includes(pathname)) {
        router.push("/");
      }

      if (!isLoggedIn && !["/login", "/signup"].includes(pathname)) {
        router.push("/login");
      }
    };

    // Panggil sekali saat mount
    handleAuthChange();

    // Optional: Listen untuk perubahan cookie
    const interval = setInterval(handleAuthChange, 1000);
    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
