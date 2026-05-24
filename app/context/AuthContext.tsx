"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Aspecto de la nformación del usuario guardada
interface User {
  username: string;
  role: string; // "admin" o "viewer"
}

// Funciones y datos con contexto de autenticación
interface AuthContextType {
  user: User | null;        // El usuario actual
  token: string | null;     // El token JWT
  login: (token: string, role: string, username: string) => void; // Iniciar sesion
  logout: () => void;       // Cerrar sesión
  isAdmin: boolean;         // true si el usuario es admin
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Revisa tokens al iniciar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");

    if (savedToken && savedRole && savedUsername) {
      setToken(savedToken);
      setUser({ username: savedUsername, role: savedRole });
    }
  }, []);

  // Guarda el token y los datos del usuario al iniciar sesion
  const login = (token: string, role: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    setToken(token);
    setUser({ username, role });
    router.push("/home");
  };

  // Limpia todo al cerrar sesion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth debe usarse dentro de AuthProvider");
  }
  return context;
}