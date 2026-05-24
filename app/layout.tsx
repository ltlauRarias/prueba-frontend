import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// Fuente Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Metadatos de la app que aparecen en la pestaña del navegador
export const metadata: Metadata = {
  title: "Monitoring Innovation",
  description: "Sistema de gestión de vehículos",
};

// Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

