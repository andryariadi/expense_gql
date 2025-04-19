// components/AuthHandler.tsx
"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const isProcessing = useRef(false);

  useEffect(() => {
    const checkAuth = () => {
      // Skip jika sedang memproses atau path tidak berubah
      if (isProcessing.current || pathname === previousPath.current) {
        return;
      }

      isProcessing.current = true;
      const isLoggedIn = document.cookie.includes("connect.sid");

      // Log untuk debugging
      console.log(`Auth Check - Path: ${pathname}, LoggedIn: ${isLoggedIn}`);

      // Redirect ke home jika sudah login dan di auth page
      if (isLoggedIn && ["/login", "/signup"].includes(pathname)) {
        if (pathname !== "/") {
          router.replace("/");
        }
      }
      // Redirect ke login jika tidak login dan di protected page
      else if (!isLoggedIn && !["/login", "/signup", "/"].includes(pathname) && !pathname.startsWith("/transaction")) {
        if (pathname !== "/login") {
          router.replace("/login");
        }
      }

      previousPath.current = pathname;
      isProcessing.current = false;

      console.log({ router, pathname, isLoggedIn }, "<---authHandler");
    };

    checkAuth();

    // Hapus interval untuk solusi yang lebih clean
    // Gunakan event listener untuk perubahan cookie jika diperlukan
  }, [pathname, router]);

  return null;
}
