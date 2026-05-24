"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Image from "next/image";

// URL del backend desplegado en Render
const API_URL = "https://prueba-backend-3lgp.onrender.com";

export default function LoginPage() {
  // Estados para guardar lo que escribe el usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Funcion para iniciar sesión
  const { login } = useAuth();

  const handleLogin = async () => {
    // Valida que los campos no estén vacíos
    if (!username || !password) {
      setError("Ingresa usuario y contraseña por favor");
      return;
    }
    try {
      setLoading(true);
      setError("");
      // Peticion al backend
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { access_token, role } = response.data;
      login(access_token, role, username);
    } catch (err: any) {
      // Si las credenciales son incorrectas muestra error
      if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Contenedor principal con imagen de fondo
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/Assets/Consecionario2.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa de color azul encima de la imagen de fondo */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,36,156,0.3) 0%, rgba(64,206,228,0.4) 100%)",
        }}
      />

      {/* Logo pequeño arriba a la izquierda */}
      <div className="absolute top-6 left-6 z-10">
        <Image
          src="/Assets/Imagologo_motion.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>

      {/* Tarjeta de login */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md z-10">

        {/* Logo y titulo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image
            src="/Assets/Imagologo_motion.svg"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="text-3xl font-bold" style={{ color: "#00249C" }}>
            Manager
          </span>
        </div>

        {/* Campo usuario */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-1 tracking-widest" style={{ color: "#C6007E" }}>
            USUARIO
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="design@monitoringinnovation.com"
            className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 text-sm text-gray-600"
          />
        </div>

        {/* Campo contraseña */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-1 tracking-widest" style={{ color: "#C6007E" }}>
            CONTRASEÑA
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••••"
            className="w-full border-b border-gray-300 focus:border-pink-500 outline-none py-2 text-sm text-gray-600"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Login al presionar Enter
          />
        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Boton de login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: loading ? "#C5C5C5" : "linear-gradient(90deg, #C6007E, #40CEE4)",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        {/* Links de recuperar contraseña y registrarse */}
        <div className="flex justify-between mt-4 text-xs">
          <span style={{ color: "#C6007E" }} className="cursor-pointer hover:underline">
            Olvidé Mi contraseña
          </span>
          <span style={{ color: "#C6007E" }} className="cursor-pointer hover:underline">
            Registrarse
          </span>
        </div>

        {/* Iconos de abajo */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <Image src="/Assets/Icon_puntoubicacion1.svg" alt="info" width={20} height={20} />
          </div>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
            <Image src="/Assets/Icon_persona1.svg" alt="user" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}