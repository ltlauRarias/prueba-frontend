"use client"; // Para ejecutar en el navegador con Next.js (Importante recordar)

import { useEffect, useState } from "react"; // Ejecutar codigo cuando el componente carga
import { useRouter } from "next/navigation"; // Redirigir a otras páginas
import { useAuth } from "../context/AuthContext"; // Contexto de autenticacion
import Image from "next/image"; // Componente optimizado de Next.js para imagenes
import { motion, AnimatePresence} from "framer-motion"; // Libreria para animaciones


// Animacion fondo
const animImages = [
  "/Assets/Anim1.png",
  "/Assets/Anim2.png",
  "/Assets/Anim3.png",
  "/Assets/Anim4.png",
  "/Assets/Anim5.png",
  "/Assets/Anim6.png",
  "/Assets/Anim7.png",
  "/Assets/Anim8.png",
  "/Assets/Anim9.png",
  "/Assets/Anim10.png",
  "/Assets/Anim11.png",
  "/Assets/Anim12.png",
];

export default function HomePage() {
  const { token } = useAuth(); // Token del contexto global
  const router = useRouter(); // Inicializa el router para poder navegar
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Cambia la imagen de fondo
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % animImages.length);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  if (!token) return null;
  return (
     
    // Contenedor principal
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">

      {/* Logo arriba a la izquierda */}
      <div className="absolute top-6 left-6 z-10">
        <Image
          src="/Assets/Imagologo_motion.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>

      {/* Contenido central*/}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        
        {/* Animacion fondo home */}
        
        <motion.img
        key={currentIndex}
        src={animImages[currentIndex]}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            objectFit: "cover",
            opacity: 0.5,
        }}
        />


        {/* Texto detras del telefono */}
        
        <motion.div
        className="absolute text-center z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        >
            <h1
            className="font-black tracking-tight leading-none"
            style={{ color: "#00249C", fontSize: "6vw" }}
            >
                BIENVENIDO A
            </h1>
        </motion.div>

        {/* Imagen del teléfono */}
        
        <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        >
            
            <Image
            src="/Assets/Telefono-01.png"
            alt="App illustration"
            width={400}
            height={400}
        />
        </motion.div>
        
        {/* Texto encima del telefono */}
        
        <motion.div
        className="absolute text-center z-20"
        style={{ marginTop: "8vw" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        >
            <h2
            className="font-black tracking-tight leading-none"
            style={{
                color: "#00249C",
                fontSize: "4vw",
                WebkitTextStroke: "2px white",
                paintOrder: "stroke fill",
            }}
            >
                MONITORING INNOVATION
            </h2>
        </motion.div>

      </div>

      {/* Links en la parte inferior */}
      <motion.div
        className="flex justify-center gap-12 py-6 text-sm font-medium"
        style={{ position: "relative", zIndex: 10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <a href="https://monitoringinnovation.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
          MONITORING/INNOVATION
        </a>
        <a href="https://gpscontrol.co/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
          GPS CONTROL
        </a>
        <a href="https://github.com/ltlauRarias/prueba-frontend" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
          Link repositorio front
        </a>
        <a href="https://github.com/ltlauRarias/prueba-backend2" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
          Link repositorio back
        </a>
      </motion.div>

      {/* Boton para ir al dashboard */}
      <div className="flex justify-center pb-8" style={{ position: "relative", zIndex: 10 }}>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-3 rounded-full text-white font-semibold bg-pink-600 hover:opacity-90"
        >
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
}