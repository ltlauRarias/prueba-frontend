"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Para redirigir paginas

export default function RootPage() {
  const router = useRouter();

  // Redirige al login
  useEffect(() => {
    router.push("/login");
  }, [router]);
  
  return null;
}
